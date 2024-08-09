import { createContext, useEffect, useState, useContext } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";

const FoodContext = createContext()

export const FoodProvider = ({ children}) => {
    const [menu, setMenu] = useState([])
    const [menuItem, setMenuItem] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [loading, SetLoading] = useState(true)
    const [cartCount, setCartCount] = useState()
    const [order, setOrder] = useState([null])
    const { showAndHide, alertInfo } = useAlert();
    const [state, dispatch] = useContext(AuthContext);

    const isAuthenticated = state.accessToken !== null;


    useEffect(() => {
        fetchMenu()
        fetchRestaurant()
        fetchMenuItem()
        fetchAllMenuItem()
        fetchCart()
    }, []) 

    useEffect(() => {
        const count = cartItems.menuItems?.reduce((total, item) => total + item.quantity,0)
    
        setCartCount(count)
    }, [cartItems])

    useEffect(()=> {
        const filtered = restaurant.filter((restaurant)=>{
            const menuItemNames = menuItem
                .filter((item)=> item.restaurantId === restaurant._id)
                .map((item) => item.name.toLowerCase())
            const restaurantName = restaurant.name.toLowerCase()
            return(
                restaurantName.includes(searchQuery.toLowerCase()) || 
                menuItemNames.some((name) => name.includes(searchQuery.toLowerCase()))
            )
        })
        setFilteredRestaurants(filtered)
    }, [searchQuery, restaurant, menuItem])


    const africanDelight = menu.filter((item => item.africanDelight === true));
    const westernCuisine = menu.filter((item => item.westernCuisine === true));


    const fetchMenu = async () => {
        const response = await fetch("https://habby-api.onrender.com/api/menu")
        const data = await response.json()
        setMenu(data) 
      }  

    const fetchRestaurant = async () => {
        const response = await fetch("https://habby-api.onrender.com/api/restaurant")
        const data = await response.json()
        setRestaurant(data)
        SetLoading(false)
    }

    const fetchMenuItem = async (restaurantId) => {
        try {
            const response = await fetch(`https://habby-api.onrender.com/api/menuItem/${restaurantId}`)
        const data = await response.json()
        setMenuItem(data)
        if (Array.isArray(data)){
            setMenuItem(data)
        } else {
            setMenuItem([])
        }
        } catch (error) {
            console.error(`error fetching menu items for restaurant ${restaurantId}:`, error)
            setMenuItem([])
        }
    }

    const fetchAllMenuItem = async () => {
        try {
            const response = await fetch('https://habby-api.onrender.com/api/menuItem')
            const data = await response.json()
            // setMenuItem(Array.isArray(data) ? data : [])
            if (Array.isArray(data)){
                setMenuItem(data)
            } else {
                setMenuItem([])
            }
        } catch (error) {
            console.error('error fetching all menu items:', error)
            setMenuItem([])
        }
    }


    const addToCart = async (menuItemId) =>{
        try {
          const res = await fetch("https://habby-api.onrender.com/addToCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({menuItemId, quantity: 1}),
          });
    
          if (!res.ok) {
            throw new Error("Something Went Wrong")
          }
    
          const data = await res.json()
          setCartItems(data);
          showAndHide("success", "item added!")
        } catch (error) {
          console.log(error.message);
          showAndHide("error", "Failed to add item!")
        }
      }

      const fetchCart = async () => {
        try {
          const res = await fetch("https://habby-api.onrender.com/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
          });
    
          if (!res.ok) {
            throw new Error("Something went wrong")
          }
            
          const data = await res.json();
          setCartItems(data)
        } catch (error) {
          console.error("Error getting cart", error);
        }
      } 



      const updateQuantity = async (menuItemId, quantity) => {
        if (!quantity > 0) {
          showAndHide("error", "quantity cannot be less than 1")
          return;
        }
        try {
          const res = await fetch("https://habby-api.onrender.com/update-quantity", {
            method: "POST",
            headers: {
            "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ menuItemId, quantity}),
        });
    
        const data = await res.json();
        if (res.ok) {
          const existingItemIndex = cartItems.menuItems?.findIndex((item) => item.menuItem._id === menuItemId);
          const updatedCartItem = [...cartItems.menuItems ];
          const itemToUpdate = updatedCartItem[existingItemIndex];
          itemToUpdate.quantity = quantity;
          itemToUpdate.amount = itemToUpdate.menuItem.price * itemToUpdate.quantity;
          setCartItems({...cartItems, menuItems: updatedCartItem});
          console.log(data);
        } else {
        console.error(data.msg || "Failed to update quantity")
        }
        } catch (error) {
          console.error(error);
        }
        
      };

      const deleteItems = async (menuItemId) => {
        try {
          const res = await fetch("https://habby-api.onrender.com/delete-item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({menuItemId})
          })
    
          const data = await res.json()
          if (res.ok) {
            showAndHide("success", "item removed from cart")
            setCartItems(data)
          }else {
            console.error(data.msg || "Failed to remove item")
          }
        } catch (error) {
          console.error(error);
        }
      }

      const calculateDeliveryFee = (amount) => {
        if (amount <= 5000) return 500;
        if (amount <= 10000) return 1000;
        return 1500; 
      };

      const totalAmount = () => {
        const itemsTotal = cartItems.menuItems?.reduce((total, item) => total + item.amount, 0) || 0;
        const deliveryFee = calculateDeliveryFee(itemsTotal);
        return itemsTotal + deliveryFee;
      };

      const createOrder = async(transaction_id, orderId)=>{
        try {
          const response = await fetch("https://habby-api.onrender.com/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({transaction_id, orderId}),
            credentials: "include"
        })
    
        const data = await response.json()
        console.log(data);
        if (res.ok) {
         setOrder(data.order)
         setCartItems([])
        } else {
          console.error(data.msg);
        }
        } catch (error) {
          console.error(error)
        }
      }
    
    


    return (
        <FoodContext.Provider value={{africanDelight, westernCuisine, menu, restaurant, menuItem, loading, alertInfo, showAndHide, fetchMenuItem, fetchAllMenuItem, addToCart, cartItems, cartCount, updateQuantity, deleteItems, totalAmount, createOrder, searchQuery, setSearchQuery, filteredRestaurants, calculateDeliveryFee, isAuthenticated}}>
                 {children}
        </FoodContext.Provider>  
    )

}

export default FoodContext

