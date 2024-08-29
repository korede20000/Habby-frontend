import { createContext, useEffect, useState, useContext } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";

const FoodContext = createContext()

export const FoodProvider = ({ children}) => {
  const [menu, setMenu] = useState([]);
  const [menuItem, setMenuItem] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState();
  const [order, setOrder] = useState([null]);
  const { showAndHide, alertInfo } = useAlert();
  const { state } = useContext(AuthContext);

  const isAuthenticated = state.accessToken !== null;

  useEffect(() => {
      fetchMenu();
      fetchRestaurant();
      fetchMenuItem();
      fetchAllMenuItem();
      if (isAuthenticated) {
          fetchCart();
      } else {
          loadCartFromLocalStorage();
      }
  }, [isAuthenticated]);

  useEffect(() => {
      const count = cartItems.menuItems?.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
      if (menuItem.length > 0) {
          const filtered = restaurant.filter((restaurant) => {
              const menuItemNames = menuItem
                  .filter((item) => item.restaurantId === restaurant._id)
                  .map((item) => item.name.toLowerCase());
              const restaurantName = restaurant.name.toLowerCase();
              return (
                  restaurantName.includes(searchQuery.toLowerCase()) ||
                  menuItemNames.some((name) => name.includes(searchQuery.toLowerCase()))
              );
          });
          setFilteredRestaurants(filtered);
      }
  }, [searchQuery, restaurant, menuItem]);

  const africanDelight = menu.filter((item) => item.africanDelight === true);
  const westernCuisine = menu.filter((item) => item.westernCuisine === true);

  const fetchMenu = async () => {
      const response = await fetch("https://habby-api.onrender.com/api/menu");
      const data = await response.json();
      setMenu(data);
  };

  const fetchRestaurant = async () => {
      const response = await fetch("https://habby-api.onrender.com/api/restaurant");
      const data = await response.json();
      setRestaurant(data);
      setLoading(false);
  };

  const fetchMenuItem = async (restaurantId) => {
      try {
          const response = await fetch(`https://habby-api.onrender.com/api/menuItem/${restaurantId}`);
          const data = await response.json();
          setMenuItem(Array.isArray(data) ? data : []);
      } catch (error) {
          console.error(`Error fetching menu items for restaurant ${restaurantId}:`, error);
          setMenuItem([]);
      }
  };

  const fetchAllMenuItem = async () => {
      try {
          const response = await fetch('https://habby-api.onrender.com/api/menuItem');
          const data = await response.json();
          setMenuItem(Array.isArray(data) ? data : []);
      } catch (error) {
          console.error('Error fetching all menu items:', error);
          setMenuItem([]);
      }
  };

  const addToCart = async (menuItemId) => {
      if (isAuthenticated) {
          try {
              const res = await fetch("https://habby-api.onrender.com/addToCart", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
                  },
                  body: JSON.stringify({ menuItemId, quantity: 1 }),
              });

              if (!res.ok) {
                  throw new Error("Something went wrong");
              }

              const data = await res.json();
              setCartItems(data);
              showAndHide("success", "Item added!");
          } catch (error) {
              console.log(error.message);
              showAndHide("error", "Failed to add item!");
          }
      } else {
          addItemToLocalStorage(menuItemId);
      }
  };

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
              throw new Error("Something went wrong");
          }

          const data = await res.json();
          setCartItems(data);
     
  } catch (error) {
      console.error("Error getting cart", error);
  }
};

const updateQuantity = async (menuItemId, quantity) => {
  if (!quantity > 0) {
      showAndHide("error", "Quantity cannot be less than 1");
      return;
  }
  if (isAuthenticated) {
      try {
          const res = await fetch("https://habby-api.onrender.com/update-quantity", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", "auth-token": `${localStorage.getItem("auth-token")}`,
              },
              body: JSON.stringify({ menuItemId, quantity }),
          });

          const data = await res.json();
          if (res.ok) {
              const existingItemIndex = cartItems.menuItems?.findIndex((item) => item.menuItem._id === menuItemId);
              const updatedCartItem = [...cartItems.menuItems];
              const itemToUpdate = updatedCartItem[existingItemIndex];
              itemToUpdate.quantity = quantity;
              itemToUpdate.amount = itemToUpdate.menuItem.price * itemToUpdate.quantity;
              setCartItems({ ...cartItems, menuItems: updatedCartItem });
              console.log(data);
          } else {
              console.error(data.msg || "Failed to update quantity");
          }
      } catch (error) {
          console.error(error);
      }
  } else {
      updateItemQuantityInLocalStorage(menuItemId, quantity);
  }
};

const deleteItems = async (menuItemId) => {
  if (isAuthenticated) {
      try {
          const res = await fetch("https://habby-api.onrender.com/delete-item", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token": `${localStorage.getItem("auth-token")}`,
              },
              body: JSON.stringify({ menuItemId })
          });

          const data = await res.json();
          if (res.ok) {
              showAndHide("success", "Item removed from cart");
              setCartItems(data);
          } else {
              console.error(data.msg || "Failed to remove item");
          }
      } catch (error) {
          console.error(error);
      }
  } else {
      removeItemFromLocalStorage(menuItemId);
  }
};

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

const createOrder = async (transaction_id, orderId) => {
  try {
      const response = await fetch("https://habby-api.onrender.com/api/payment/verify", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ transaction_id, orderId }),
          credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
          setOrder(data.order);
          setCartItems([]);
          localStorage.removeItem("cartItems"); // Clear local storage on order creation
      } else {
          console.error(data.msg);
      }
  } catch (error) {
      console.error(error);
  }
};

const loadCartFromLocalStorage = () => {
  const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  setCartItems({ menuItems: localCart });
};

const addItemToLocalStorage = (menuItemId) => {
  let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = localCart.findIndex((item) => item.menuItem._id === menuItemId);

  if (existingItemIndex > -1) {
      localCart[existingItemIndex].quantity += 1;
  } else {
      const menuItem = menu.find((item) => item._id === menuItemId);
      localCart.push({ menuItem, quantity: 1, amount: menuItem.price });
  }

  localStorage.setItem("cartItems", JSON.stringify(localCart));
  setCartItems({ menuItems: localCart });
};

const updateItemQuantityInLocalStorage = (menuItemId, quantity) => {
  let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItemIndex = localCart.findIndex((item) => item.menuItem._id === menuItemId);

  if (existingItemIndex > -1) {
      localCart[existingItemIndex].quantity = quantity;
      localCart[existingItemIndex].amount = localCart[existingItemIndex].menuItem.price * quantity;
  }

  localStorage.setItem("cartItems", JSON.stringify(localCart));
  setCartItems({ menuItems: localCart });
};

const removeItemFromLocalStorage = (menuItemId) => {
  let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  localCart = localCart.filter((item) => item.menuItem._id !== menuItemId);

  localStorage.setItem("cartItems", JSON.stringify(localCart));
  setCartItems({ menuItems: localCart });
};

return (
  <FoodContext.Provider
      value={{
          africanDelight,
          westernCuisine,
          menu,
          restaurant,
          menuItem,
          loading,
          alertInfo,
          showAndHide,
          fetchMenuItem,
          fetchAllMenuItem,
          addToCart,
          cartItems,
          cartCount,
          updateQuantity,
          deleteItems,
          totalAmount,
          createOrder,
          searchQuery,
          setSearchQuery,
          filteredRestaurants,
          calculateDeliveryFee,
          isAuthenticated
      }}
  >
      {children}
  </FoodContext.Provider>
);
}

export default FoodContext

