import burger from "../../assets/burger.jpg"
import various from "../../assets/variousfoods.avif"
import fullpizza from "../../assets/fullpizza.jpeg"
import { Link } from "react-router-dom";

// const ImageList = [
//     {
//         id: 1,
//         image: burger,
//     },
//     {
//         id: 2,
//         image: pizza,
//     },
//     {
//         id: 3,
//         image: various
//     },
// ];

// const bgImage = {
//     backgroundimage: various,
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     width: "100%",
//     height: "100%,"
// }

const HeaderImage = () => {
   
  return (
    <div>
        <div className="border-b-0 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section*/}
            <div className="pt-20 text-black">
            <h6 className="text-orange-600 font-sans font-extrabold text-[4rem] lg:px-24 px-10 animate-bounce">Habby,</h6>
            <p className="text-black font-bold font-serif lg:text-[3rem] text-[2.5rem] lg:px-[15%] pl-10">Taking delevering your food items to the next level...</p>
                <div className="lg:pl-24 pl-8 pt-5 space-x-3">
                    <button className="bg-orange-600 text-black lg:px-10 lg:py-2 px-6 py-3 rounded-md hover:scale-105 duration-200">Order now</button>
                    <Link to="/restaurant"><button className="bg-orange-600 text-black lg:px-10 lg:py-2 px-6 py-3 rounded-md hover:scale-105 duration-200">Restaurants</button></Link>
                </div>       
            </div>
            {/* Image section*/}
                <div className=" lg:px-20 py-5 lg:pl-20">
                    <img className="lg:h-[50vh] h-[40vh] lg:w-[300px] w-[200px] rounded-full rotate lg:mx-0 mx-auto " src={burger} alt="" />
                    <img className="lg:h-[50vh] h-[40vh] lg:w-[300px] w-[220px] rounded-full rotate md:mx-0 lg:ml-32 mx-auto lg:pt-4 mt-6" src={fullpizza} alt="" />
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default HeaderImage