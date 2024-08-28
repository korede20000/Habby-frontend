import { Link } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useContext, useState } from "react";
import FoodContext from "../../context/FoodContext";
import useAuth from "../../hooks/useAuth";
import { HiMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { deleteItem } = useLocalStorage("auth-token");
  const { showAndHide, cartCount } = useContext(FoodContext);
  const { user } = useAuth();

  const isAuthenticated = state.accessToken !== null;

  function logout() {
    deleteItem();
    dispatch({ type: "setToken", payload: null });
    showAndHide("success", "You are signed out");
  }

  const showHeader = (
    <header className="px-4 bg-white ">
      <nav className="flex bg-white">
      <div className="flex text-black">
        <Link to="/">
          <h6 className="text-4xl text-orange-600 font-serif pt-5">HABBY</h6>
        </Link>
        <Link to="/" className="text-orange-600 text-3xl pt-7">
          <FaShippingFast />
        </Link>
      </div>
        <div className="flex pl-[50%] lg:pl-[72%] lg:py-8 py-5 space-x-5 ">
          <Link to="/register" className="outline outline-1 rounded-md px-2 py-2 text-white bg-black">Sign up</Link>
          <Link to="/login" className="outline outline-1 rounded-md px-2 py-2 text-white bg-black">Login</Link>
        </div>
      </nav>

      <div className="hidden lg:flex px-[10%] py-1 hover:cursor-pointer space-x-11 lg:font-mono font-semibold text-black hover:scale-105 duration-200">
        <Link to="/" className="">Home</Link>
        <Link to="/menu" className="">Menu</Link>
        <Link to="/restaurant">Restaurants</Link>
        <a href="#about">About us</a>
        <a href="#contact">Contact</a>
      </div>

      <button onClick={() => setOpen(!open)} 
        className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
        <HiMenuAlt3 className="text-3xl" />
      </button>

      <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-orange-500 z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`fixed lg:hidden mt-3 left-0 top-0 py-20 w-[300px] h-screen overflow-auto z-[20] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}>
          <div className="flex flex-col items-center gap-5 px-[10%] py-1 space-y-7 lg:font-mono font-semibold text-black cursor-pointer">
            <Link to="/" className="">Home</Link>
            <Link to="/menu" className="">Menu</Link>
            <Link to="/restaurant">Restaurants</Link>
            <a href="#about">About us</a>
            <a href="#contact">Contact</a>
            <Link to="/login" className="">Login</Link> 
          </div>
        </div>
      </div>
    </header>
  );

  const showAuthHeader = (
    <header className="px-4 bg-white ">
      <nav className="flex bg-white">
      <div className="flex text-black">
        <Link to="/">
          <h6 className="text-4xl text-orange-600 font-serif pt-5">HABBY</h6>
        </Link>
        <Link to="/" className="text-orange-600 text-3xl pt-7">
          <FaShippingFast />
        </Link>
      </div>
        <div className="flex lg:flex lg:pl-[65%] pl-[18%] md:pl-[50%] py-8">
          <Link className="relative text-orange-600 text-4xl" to="/cart">
              <IoFastFoodOutline />
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-center text-sm text-black font-semibold h-5 w-5 rounded-full outline outline-2 outline-orange-600 bg-white">
                  {cartCount}
              </div>
          </Link>
        </div>
        <div className="text-[15px] font-medium flex items-center gap-2 overflow-auto">
        {user && user.img && (
            <Link to="/profile"><img src={`https://habby-api.onrender.com/${user?.img}`} alt="" className="h-7 outline-1 w-7 rounded-full ml-5"/></Link>
        )}
          
          <p className="pl-3 lg:pl-0">Hi, {user?.firstName}!</p>
        </div>
        <Link className="outline outline-1 bg-black rounded  text-white px-2 py-2 font-medium ml-3 mt-7" onClick={logout}>Logout</Link>
      </nav>

      <div className="hidden lg:flex px-[10%] py-1 hover:cursor-pointer space-x-11 lg:font-mono font-semibold text-black hover:scale-105 duration-200">
        <Link to="/" className="">Home</Link>
        <Link to="/menu" className="">Menu</Link>
        <Link to="/restaurant">Restaurants</Link>
        <a href="#about">About us</a>
        <a href="#contact">Contact</a>
      </div>

      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
        <HiMenuAlt3 className="text-3xl" />
      </button>

      <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-orange-500 z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`fixed lg:hidden left-0 top-0 py-10 w-[300px] h-screen overflow-auto z-[20] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}>
          <div className="flex flex-col items-center gap-5 px-[10%] py-1 space-y-7 lg:font-mono font-semibold text-black cursor-pointer">
            <Link to="/" className="">Home</Link>
            <Link to="/menu" className="">Menu</Link>
            <Link to="/restaurant">Restaurants</Link>
            <a href="#about">About us</a>
            <a href="#contact">Contact</a>
            <Link onClick={logout}>Logout</Link>
          </div>
        </div>
      </div>
    </header>
  );

  return <div>{isAuthenticated ? showAuthHeader : showHeader}</div>;
};

export default Header