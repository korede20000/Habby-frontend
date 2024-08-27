import { useState } from "react"
import { useNavigate}  from 'react-router-dom'
import { useContext } from "react"
import FoodContext from "../../context/FoodContext"

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const { showAndHide } = useContext(FoodContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const registerHandler = async (e) => {
        e.preventDefault();

        // Destructure form data for easier access
        const { firstName, lastName, email, phone, street, city, password, confirmPassword } = formData;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !street || !city || !password || !confirmPassword) {
            showAndHide("error", "Please fill in all the fields");
            return;
        }

        // Password and Confirm Password validation
        if (password !== confirmPassword) {
            showAndHide("error", "Passwords do not match");
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
                    lastName,
                    email,
                    phone,
                    addresses: [{ street, city }], // Adjusted to match the backend structure
                    password,
                    confirmPassword,
                }),
            });

            const data = await res.json();

            if (res.status === 400) {
                showAndHide("error", data.message); // Displaying error message received from backend
            } else if (res.status === 200 && data.message === "Registration successful, please check your email for verification link") {
                showAndHide("success", data.message);
                setFormData({ // Reset form data
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    street: "",
                    city: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/login");
            } else {
                showAndHide("error", "An error occurred during registration");
            }
        } catch (error) {
            console.error("Registration error:", error);
            showAndHide("error", "An error occurred during registration");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-full max-w-md my-10 bg-white shadow-md rounded-lg p-8" onSubmit={registerHandler}>
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">REGISTER</h2>
                
                {["firstName", "lastName", "phone", "street", "city", "email", "password", "confirmPassword"].map((field) => (
                    <div key={field} className="flex flex-col gap-4 mb-4">
                        <label htmlFor={field} className="font-medium text-gray-700 capitalize">
                            {field.split(/(?=[A-Z])/).join(" ")} {/* Split camelCase */}
                        </label>
                        <input
                            type={field.includes("password") ? "password" : field.includes("email") ? "email" : "text"}
                            id={field}
                            className="outline outline-1 outline-orange-600 rounded-full px-4 py-2"
                            value={formData[field]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                
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