
import { useContext } from "react";
import Card from "../shared/Card";
import { Link } from "react-router-dom";
import FoodContext from "../../context/FoodContext";


const WesternCuisine = () => {

    const {westernCuisine} = useContext(FoodContext)
  return (
    <div className="my-[20px] mx-[80px]">
        <h1 className="mb-[20px] text-orange-600 font-serif font-bold text-3xl">Western Cuisine</h1>
        <div className="flex gap-12 flex-wrap ">
            {westernCuisine.map((item)=>(
                <Card key={item._id}>
                    <Link to="" ><img src={"http://localhost:3000/" + item.img}  alt="" className="lg:h-[200px] h-[130px] w-[300px]" /></Link>
                    <p className="font-bold font-serif pt-2">{item.name}</p>
                    {/* <p className="font-medium font-serif">{item.price}</p> */}
                </Card>
            ))}
        </div>
    </div>
  )
}

export default WesternCuisine