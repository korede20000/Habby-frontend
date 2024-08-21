import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import FoodContext from "../../context/FoodContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import {Navigate} from "react-router-dom"

function Login() {
    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, dispatch] = useContext(AuthContext)
  const {showAndHide} = useContext(FoodContext)
  const {setItem} = useLocalStorage("auth-token")

  const isAuthenticated = state.accessToken !== null;

  // if(isAuthenticated) {
  //   return <Navigate to="/"/>
  // }

  const redirect = useNavigate()

  const loginHandler = async(e)=> {
    e.preventDefault();
    try {
      const res = await fetch("https://habby-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await res.json()

      if (data === "Invalid Email/Password") {
        showAndHide("error", "Invalid Email/Password")
      }else {
        dispatch({type: "setToken", payload: data.token})
        setItem(data.token)
        redirect("/")
        showAndHide("success", "Login Successful!!!")
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">LOGIN</h2>
      <form onSubmit={loginHandler} className="space-y-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="outline outline-1 outline-orange-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="outline outline-1 outline-orange-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-700 transition"
          >
            Submit
          </button>
        </div>
        <div>
            <Link to="/register"><p>Dont have an account? <span >register</span></p></Link>
        </div>
      </form>
    </div>
  </div>
);
}
export default Login