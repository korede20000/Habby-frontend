import { useContext } from "react";
import Card from "../shared/Card";
import { Link } from "react-router-dom";
import FoodContext from "../../context/FoodContext"
import back from "../../assets/res cover.jpg"
import { BsBackpack4Fill } from "react-icons/bs";

const Menu = () => {
    const {menu} = useContext(FoodContext)
    

  return (
    <div className="my-[20px] lg:mx-[80px] mx-7">
        <div className="relative">
        <img className="lg:w-[1150px] lg:h-[200px] h-[150px] w-[550px] object-cover" src={back} alt="" />
        <h1 className="text-orange-600 font-serif lg:text-4xl text-sm absolute inset-0 w-[45%] mx-auto lg:my-8 my-5" >List of exotic food items that habby has to offer across our top notch restaurants...</h1>
        </div>
        <div className="flex gap-12 flex-wrap pt-10">
        {menu.map((item) => (
           <Card key={item._id}>
              <Link to="" ><img src={"http://localhost:3000/" + item.img} alt="" className="h-[200px] w-[300px]"  /></Link>
              <p className="font-bold pt-2">{item.name}</p>
              {/* <p className="font-medium">{item.price}</p> */}
              
          </Card>    
        ))}   
        </div>
    </div>
  )
}

export default Menu