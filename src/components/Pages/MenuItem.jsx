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
    const { menuItem, fetchMenuItem , restaurant, addToCart} = useContext(FoodContext)
    const [state, dispatch] = useContext(AuthContext) 
    const isAuthenticated = state.accessToken !== null
    const redirect = useNavigate()

    const login = ()=>{
      if (!isAuthenticated) {
        redirect("/login")
      }
    }


    useEffect(()=> {
        fetchMenuItem(id)
    }, [id, fetchMenuItem])

    const restaurants = restaurant.find(rest => rest._id === id);

  return (
    <div>
            {restaurants && (
                <div>
                    <h2 className="text-orange-600 text-2xl font-serif ml-10 my-10">{restaurants.name} Menu Items</h2>
                    <div className="text-left p-4">
                        <h3 className="text-lg font-bold">Operating Hours</h3>
                        {restaurants.operatingHours.map((oh, index) => (
                            <p key={index} className="text-sm">
                                <span className="font-bold capitalize">{oh.day}:</span> {oh.hours}
                            </p>
                        ))}
                    </div>
                    {restaurants.location && <RestaurantMap location={restaurants.location} name={restaurants.name} />}
                </div>
            )}
            <div className="my-[40px] mx-[95px]">
                <h1 className="mb-[10px] text-orange-600 font-bold font-serif text-2xl text-center">Explore our Menu</h1>
                <div className="flex gap-12 flex-wrap">
                    {Array.isArray(menuItem) ? (
                        menuItem.map((item) => (
                            <Card key={item._id}>
                                <Link to=""><img src={"http://localhost:3000/" + item.img} alt="" className="h-[200px] w-[200px] mx-auto my-5" /></Link>
                                <p className="font-bold pt-2 font-serif">{item.name}</p>
                                <p className="font-medium">{item.price}</p>
                                <button onClick={isAuthenticated ? () => addToCart(item._id) : login} className="text-orange-600 text-2xl p-[10px] rounded mt-[10px]">
                                    <IoIosAddCircleOutline />
                                </button>
                            </Card>
                        ))
                    ) : (
                        <p>No menu items available</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default MenuItem