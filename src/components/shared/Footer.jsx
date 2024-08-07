import { FaShippingFast } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-orange-50 py-[15px] px-[50px] flex flex-col lg:flex overflow-auto" >
        <div className="flex items-center">
           <h6 className="text-4xl text-orange-600 font-serif">HABBY</h6>
           <a className="text-orange-600 text-3xl pt-1" href=""><FaShippingFast /></a>
        </div>
        <div className="flex border-t-2 pt-3">
            <div className="lg:pl-[20%] pb-3 ">
                <h1 className="text-[15px] text-orange-600 font-serif">Quick links</h1>
                <ul className="pt-3 font-semibold text-[14px] space-y-2">
                    <li>
                        <a href="" className="">Popular dishes</a>
                    </li>
                    <li>
                        <a href="" className="">Menu</a>
                    </li>
                    <li>
                        <a href="" className="">Reservation</a>
                    </li>
                    <li>
                        <a href="" className="">Reviews</a>
                    </li>
                </ul>
            </div>
            <div className="pl-[5%]">
                <h1 className="text-[15px] text-orange-600 font-serif">About us</h1>
                <ul className="pt-3 font-semibold text-[14px] space-y-2">
                    <li>
                        <a href="" className="">Terms and condition</a>
                    </li>
                    <li>
                        <a href="" className="">Privacy policy</a>
                    </li>
                    <li>
                        <a href="" className="">Contact</a>
                    </li>
                    <li>
                        <a href="" className="">About us</a>
                    </li>
                </ul>      
            </div>
            <div className="pl-[5%]">
                <h1 className="text-[15px] text-orange-600 font-serif">Get In Touch</h1>
                <ul className="pt-3 font-semibold text-[14px] space-y-2">
                    <li>
                        <a href="" id="contact" className="">Contact@habby.com</a>
                    </li>
                    <li>
                        <a href="" className="">Privacy policy</a>
                    </li>
                    <li>
                        <a href="" className="">Socials</a>
                    </li>
                </ul>      
            </div>
            <div className="lg:pl-[8%] pl-5 space-y-2">
            <FaFacebook />
            <FaInstagramSquare />
            <FaSquareXTwitter />
            <FaTelegram />
            </div>
        </div>
        <div className="border-t-2">
            <h1 className="py-3 text-[10px] text-black font-bold text-center  lg:px-[43%]">All copyright (C) 2024 Reserved</h1>
        </div>
    </div>


  )
}

export default Footer