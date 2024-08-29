import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import FoodContext from "../../context/FoodContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import {Navigate} from "react-router-dom"
import { Link } from "react-router-dom";

function Login() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const { showAndHide } = useContext(FoodContext);
  const { setItem } = useLocalStorage("auth-token");

  const isAuthenticated = state.accessToken !== null;
  const redirect = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await fetch("https://habby-api.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.status === 400) {
            // Handle specific messages
            showAndHide("error", data.message || "Invalid Email/Password");
        } else if (res.status === 200) {
            // Success: token received
            dispatch({ type: "setToken", payload: data.token });
            setItem(data.token); // Assuming setItem stores the token in local storage
            redirect("/"); // Assuming redirect navigates to the home page
            showAndHide("success", "Login Successful!!!");
        } else {
            // Handle unexpected errors
            showAndHide("error", "An unexpected error occurred. Please try again.");
        }
    } catch (error) {
        setLoading(false);
        console.error(error);
        showAndHide("error", "An error occurred. Please try again.");
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
              className={`bg-orange-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login