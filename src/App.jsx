import AboutUs from "./components/shared/AboutUs"
import Header from "./components/shared/Header"
import HeaderImage from "./components/shared/HeaderImage"
import Footer from "./components/shared/Footer"
import AfricanDelight from "./components/shared/AfricanDelight"
import WesternCuisine from "./components/shared/WesternCuisine"
import { FoodProvider } from "./context/FoodContext"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Menu from "./components/Pages/Menu"
import Restaurant from "./components/Pages/Restaurant"
import MenuItem from "./components/Pages/MenuItem"
import Cart from "./components/Pages/Cart"
import Alert from "./components/shared/Alert"
import Register from "./components/Pages/Register"
import Login from "./components/Pages/Login"
import Profile from "./components/Pages/Profile"
import { AuthProvider } from "./context/AuthContext"
import useLocalStorage from "./hooks/useLocalStorage"
import Checkout from "./components/Pages/Checkout"
import ThankYou from "./components/Pages/thankYou"
import NotFound from "./components/Pages/NotFound"

function App() {
  const {getItem} = useLocalStorage("auth-token")
  const token = getItem()
  let authInitialState = {accessToken: token ?? null}
  return (
    <AuthProvider defaultState={authInitialState}>
        <FoodProvider>
        <Router> 
          <Header/>
          <Alert/>
          <Routes>
            <Route path="/" element={
              <>
                <HeaderImage/>
                <AboutUs/>
                <Restaurant/>
                <AfricanDelight/>
                <WesternCuisine/>
                
              </>
            }/>
            <Route path="/menu" element={<Menu/>}   
            /> 
            <Route path="/restaurant" element={<Restaurant/>} 
            /> 
            <Route path="/restaurant/:id" element={<MenuItem/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            {/* <Route path="/menuItem/:id" element={<MenuItem/>}/> */}
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/thankYou" element={<ThankYou/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<NotFound />} /> {/* 404 Page Route */}
          </Routes>
          <Footer/>       
        </Router>
      </FoodProvider>
    
    </AuthProvider>
    
  )
}


export default App
  