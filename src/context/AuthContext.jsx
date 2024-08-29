import { createContext, useReducer, useEffect } from "react";

const initialState = {
    accessToken: null,
    isAuthenticated: false, // Add this to track authentication status
};

const AuthContext = createContext(initialState);

function reducer(state, action) {
    switch (action.type) {
        case "setToken":
            return { ...state, accessToken: action.payload, isAuthenticated: !!action.payload };
        case "logout":
            return { ...state, accessToken: null, isAuthenticated: false };
        default:
            return state;
    }
}

export const AuthProvider = ({ children, defaultState = initialState }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    // Effect to handle cart synchronization after authentication
    useEffect(() => {
        const synchronizeCart = async () => {
            if (state.isAuthenticated) {
                const localCart = JSON.parse(localStorage.getItem("cartItems"));

                if (localCart && localCart.length > 0) {
                    for (const item of localCart) {
                        try {
                            await fetch("https://habby-api.onrender.com/addToCart", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "auth-token": `${state.accessToken}`,
                                },
                                body: JSON.stringify({ menuItemId: item.menuItemId, quantity: item.quantity }),
                            });
                        } catch (error) {
                            console.error("Error syncing cart item:", error);
                        }
                    }

                    // Clear local storage after sync
                    localStorage.removeItem("cartItems");

                    // Fetch updated cart from the backend
                    fetchCart();
                }
            }
        };

        synchronizeCart();
    }, [state.isAuthenticated]);

    const fetchCart = async () => {
        try {
            const res = await fetch("https://habby-api.onrender.com/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${state.accessToken}`,
                },
            });

            const data = await res.json();
            // Assuming you have a way to update the cart in your context
            // e.g., via a method or function in FoodContext
            // updateCart(data); 
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
