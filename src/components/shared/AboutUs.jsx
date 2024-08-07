import customers from "../../assets/customers.jpeg"
import vendors from "../../assets/burgerking-restuarant.jpg"
import services from "../../assets/services.jpeg"

const AboutUs = () => {
  return (
    
    <div className="bg-black">
        <div className="lg:px-[44%] text-center py-4">
        <h3 className="text-[2.5rem] text-orange-600 font-serif" id="about">About us</h3>
        </div>
        
        <div className="lg:flex lg:w-[80%] mx-[10%] py-12 gap-28">
        <div className="pt-8">
        <img className="w-[280px] h-[200px] outline-double outline-orange-400" src={vendors} alt="" />
            <h4 className="text-[1.5rem] text-orange-600 font-serif lg:px-16 py-2 text-center">OUR VENDORS</h4>
            <div className="w-[110%]  text-white ">
            <p className="font-medium font-serif lg:px-2">Our vendors are handpicked for quality</p>
            <p className="font-medium font-serif lg:px-5 px-2" >and freshness, ensuring you receive</p>
            <p className="font-medium font-serif lg:px-7 px-3" >the best ingredients from trusted.</p>
            </div>
        </div>
        <div className="pt-8">
        <img className="w-fit h-[200px] outline-double outline-orange-400 " src={services} alt="" />
            <h4 className="text-[1.5rem] text-orange-600 font-serif lg:px-16 py-2 text-center">OUR SERVICES</h4>
            <div className=" w-[120%] text-white">
            <p className="font-medium font-serif lg:px-2">Our vendors are handpicked for quality</p>
            <p className="font-medium font-serif lg:px-5 px-3" >and freshness, ensuring you receive</p>
            <p className="font-medium font-serif lg:px-7 px-4" >the best ingredients from trusted.</p>
            </div>
        </div>

        <div className="pt-8">
        <img className="w-fit h-[200px] outline-double  outline-orange-400" src={customers} alt="" />
            <h4 className="text-[1.5rem] text-orange-600 font-serif lg:px-12 py-2 text-center">OUR CUSTOMERS</h4>
            <div className=" w-[120%] text-white">
            <p className="font-medium font-serif lg:px-2 ">Our customers are priority, enjoying</p>
            <p className="font-medium font-serif lg:px-7 px-7" >personalized services, diverse </p>
            <p className="font-medium font-serif lg:px-12 px-12" >option for cool dining.</p>
            </div>
        </div>
        </div>
        
            
    </div>
  )
}

export default AboutUs