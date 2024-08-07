import { useState, useEffect, useRef, useContext } from "react";
import FoodContext from "../../context/FoodContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Navigate } from 'react-router-dom';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        addresses: [{ street: "", city: "" }], 
        img: ""
    });
    const { showAndHide } = useContext(FoodContext);
    const [state, isAuthenticated] = useContext(AuthContext);
    const redirect = useNavigate();
    const fileInputRef = useRef(null);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    useEffect(() => {
        // Fetch user profile
        fetch("http://localhost:3000/user", {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                if (data.addresses && data.addresses.length > 0) {
                    setForm(data);
                } else {
                    setForm(prevForm => ({
                        ...prevForm,
                        addresses: [{ street: "", city: "" }]
                    }));
                }
            });

        // Fetch order history
        fetch("http://localhost:3000/api/orders", {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        })
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        setForm(prevForm => {
            const newAddresses = prevForm.addresses.map((address, i) => (
                i === index ? { ...address, [name]: value } : address
            ));
            return { ...prevForm, addresses: newAddresses };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(data => setUser(data));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch("http://localhost:3000/profile/image", {
                method: "PUT",
                headers: {
                    "auth-token": state.accessToken,
                },
                body: formData,
            });

            const data = await res.json();

            if (data.msg === 'Profile image updated successfully') {
                showAndHide("success", "Profile image updated successfully");
                setUser(prevUser => ({ ...prevUser, img: data.img }));
                setForm(prevForm => ({ ...prevForm, img: data.img })); // Update form state with the new image URL
                fileInputRef.current.value = null; // Clear the file input
            } else {
                showAndHide("error", data.msg);
            }
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">PROFILE MANAGEMENT</h1>
            <div className="mb-4">
                <h2 className="block text-gray-700 text-sm font-bold mb-2">Profile Image</h2>
                {form.img && (
                    <div className="mb-4">
                        <img src={`http://localhost:3000/${form.img}`} alt="Profile" className="h-20 w-20 rounded-full" />
                    </div>
                )}
                <input 
                    type="file" 
                    onChange={handleImageUpload} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ref={fileInputRef}
                />
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                
                {form.addresses.map((address, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-xl font-bold text-orange-600 mb-2">Address {index + 1}</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                            <input type="text" name="street" value={address.street} onChange={(e) => handleAddressChange(index, e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                            <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                </div>
            </form>

            <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">ORDER HISTORY</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-orange-600 text-left text-sm font-bold text-orange-600">Order ID</th>
                            <th className="py-2 px-4 border-b-2 border-orange-600 text-left text-sm font-bold text-orange-600">Date</th>
                            <th className="py-2 px-4 border-b-2 border-orange-600 text-left text-sm font-bold text-orange-600">Status</th>
                            <th className="py-2 px-4 border-b-2 border-orange-600 text-left text-sm font-bold text-orange-600">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{order.orderId}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{new Date(order.date).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{order.status}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">₦{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Profile