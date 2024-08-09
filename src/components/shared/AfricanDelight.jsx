import FoodContext from "../../context/FoodContext";
import { useContext } from "react";
import Card from "../shared/Card";
import { Link } from "react-router-dom";

const AfricanDelight = () => {

    const {africanDelight} = useContext(FoodContext)

  return (
    <div className="py-[100px] px-[80px]">
        <h1 className="mb-[10px] text-black font-serif font-bold text-3xl">African Delight</h1>
        <div className="flex gap-12 flex-wrap mt-10">
            {africanDelight.map((item)=>(
                <Card key={item._id}>
                    <Link to="" ><img src={"https://habby-api.onrender.com/" + item.img}  alt="" className="lg:h-[200px] lg:w-[200px] py-2 h-[130px] w-[130px] rotate rounded-full mx-auto" /></Link>
                    <p className="font-bold font-serif pt-2">{item.name}</p>
                    {/* <p className="font-medium font-serif">{item.price}</p> */}
                </Card>
            ))}
        </div>
    </div>
  )
}

export default AfricanDelight