import { useContext, useEffect } from "react";
import Card from "../shared/Card";
import { Link, useParams } from "react-router-dom";
import FoodContext from "../../context/FoodContext"
import RestaurantMap from "../shared/RestaurantMap";
import AuthContext from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io";

const MenuItem = () => {
    const { id } = useParams();
    const { menuItem, fetchMenuItem, restaurant, addToCart } = useContext(FoodContext);
    const [state] = useContext(AuthContext);
    const isAuthenticated = state.accessToken !== null;
    const redirect = useNavigate();

    const login = () => {
        if (!isAuthenticated) {
            redirect("/login");
        }
    };

    useEffect(() => {
        if (id) {
            fetchMenuItem(id);
        }
    }, [id]);

    const restaurants = restaurant.find(rest => rest._id === id);

    // Filter menu items for the current restaurant
    const filteredMenuItems = menuItem.filter(item => item.restaurant === id);

    return (
        <div>
            {restaurants && (
                <div>
                    <h2 className="text-orange-600 text-2xl font-serif ml-10 my-10">
                        {restaurants.name} Menu Items
                    </h2>
                </div>
            )}
            <div className="my-[40px] mx-[95px]">
                <h1 className="mb-[10px] text-orange-600 font-bold font-serif text-2xl text-center">
                    Explore our Menu
                </h1>
                <div className="flex gap-12 flex-wrap">
                    {Array.isArray(filteredMenuItems) && filteredMenuItems.length > 0 ? (
                        filteredMenuItems.map((item) => (
                            <Card key={item._id}>
                                <Link to="">
                                    <img
                                        src={`https://habby-api.onrender.com/${item.img}`}
                                        alt={item.name}
                                        className="h-[200px] w-[200px] mx-auto my-5"
                                    />
                                </Link>
                                <p className="font-bold pt-2 font-serif">{item.name}</p>
                                <p className="font-medium">{item.price}</p>
                                <p className="font-light text-gray-200">{item.description}</p>
                                <button
                                    onClick={isAuthenticated ? () => addToCart(item._id) : login}
                                    className="text-orange-600 text-2xl p-[10px] rounded mt-[10px]"
                                >
                                    <IoIosAddCircleOutline />
                                </button>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No menu items available</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default MenuItem