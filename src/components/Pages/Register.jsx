import { useState } from "react"
import { useNavigate}  from 'react-router-dom'
import { useContext } from "react"
import FoodContext from "../../context/FoodContext"

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showAndHide } = useContext(FoodContext);
    
    const navigate = useNavigate();
    
    const registerHandler = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!firstName || !email || !password || !confirmPassword) {
            showAndHide("error", "Please fill in all required fields: First Name, Email, Password, Confirm Password.");
            return;
        }
    
        // Password and Confirm Password validation
        if (password !== confirmPassword) {
            showAndHide("error", "Passwords do not match.");
            return;
        }
    
        try {
            const res = await fetch("https://habby-api.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName: lastName || "", // Send empty string if not provided
                    email,
                    phone: phone || "", // Send empty string if not provided
                    addresses: [{ street, city }] || [], // Send empty array if not provided
                    password,
                    confirmPassword
                }),
            });
    
            const data = await res.json();
    
            if (res.status >= 400 && res.status < 500) {
                showAndHide("error", data.message || "An error occurred during registration");
            } else if (res.status === 201) { 
                showAndHide("success", data.message);
                
                // Update your global state with the new user (if applicable)
                // dispatch({ type: 'ADD_USER', payload: data.user });
                
                navigate("/login"); // Navigate to login or another page
            } else {
                showAndHide("error", "An unexpected error occurred during registration");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            showAndHide("error", "An error occurred during registration. Please try again later.");
        }
    };

    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="w-full max-w-md my-10 bg-white shadow-md rounded-lg p-8" onSubmit={registerHandler}>
            <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">REGISTER</h2>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="firstName" className="font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id="firstName"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="lastName" className="font-medium text-gray-700">Last Name (Optional)</label>
                <input
                    type="text"
                    id="lastName"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="phone" className="font-medium text-gray-700">Phone Number (Optional)</label>
                <input
                    type="text"
                    id="phone"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="street" className="font-medium text-gray-700">Street (Optional)</label>
                <input
                    type="text"
                    id="street"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="city" className="font-medium text-gray-700">City (Optional)</label>
                <input
                    type="text"
                    id="city"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="email" className="font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                <input
                    type="email"
                    id="email"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="password" className="font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                <input
                    type="password"
                    id="password"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-4 mb-6">
                <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="text-center">
                <button className="bg-orange-600 text-white py-2 px-4 rounded-full font-bold hover:bg-orange-700" type="submit">
                    Sign Up
                </button>
            </div>
            <div className="text-center mt-4">
            <p className="text-gray-700">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                Login here
                </a>.
            </p>
            </div>
        </form>
    </div>
    );
};               
export default Register