import { useContext, useEffect } from "react";
import Card from "../shared/Card";
import { Link, useParams } from "react-router-dom";
import FoodContext from "../../context/FoodContext"
import RestaurantMap from "../shared/RestaurantMap";
import AuthContext from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io";

const MenuItem = () => {
    const { id } = useParams()
    const { menuItem, fetchMenuItem, restaurant, addToCart} = useContext(FoodContext)
    const [state, dispatch] = useContext(AuthContext)  
    const isAuthenticated = state.accessToken !== null
    const redirect = useNavigate()

    const login = () => {
        if (!isAuthenticated) {
            redirect("/login")
        }
    }

    useEffect(() => {
        fetchMenuItem(id)
    }, [id, fetchMenuItem])

    const restaurants = restaurant.find(rest => rest._id === id);


    const groupedItems = menuItem.reduce((acc, item) => {
        const category = item.category || "Uncategorized";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    return (
        <div>
            {restaurants && (
                <div>
                    <h2 className="text-orange-600 text-2xl font-serif ml-10 my-10">{restaurants.name} Menu Items</h2>
                </div>
            )}
            <div className="my-[40px] mx-[95px]">
                <h1 className="mb-[10px] text-orange-600 font-bold font-serif text-2xl text-center">Explore our Menu</h1>
                {Object.keys(groupedItems).map((category) => (
                    <div key={category}>
                        <h3 className="text-xl font-bold text-orange-600">{category.name}</h3>
                        <div className="flex gap-12 flex-wrap">
                            {groupedItems[category].map((item) => (
                                <Card key={item._id}>
                                    <Link to=""><img src={"https://habby-api.onrender.com/" + item.img} alt="" className="h-[200px] w-[200px] mx-auto my-5" /></Link>
                                    <p className="font-bold pt-2 font-serif">{item.name}</p>
                                    <p className="text-neutral-300 font-light">{item.description}</p>
                                    <p className="font-medium">{item.price}</p>
                                    <button onClick={isAuthenticated ? () => addToCart(item._id) : login} className="text-orange-600 text-2xl p-[10px] rounded mt-[10px]">
                                        <IoIosAddCircleOutline />
                                    </button>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuItem