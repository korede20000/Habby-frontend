import FoodContext from "../../context/FoodContext"
import { useSearchParams } from "react-router-dom"
import { useEffect, useContext } from "react"
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";


const thankYou = () => {
  const {createOrder} = useContext(FoodContext)
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")
  

  useEffect(()=>{
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref)
    }
  }, [transaction_id, tx_ref, createOrder])

  return (
    <div>
        <div className="flex flex-col items-center my-[5%]"> 
        <div className="text-green-600 text-9xl">
        <CiCircleCheck />
        </div>
        <p className="text-2xl my-[3%] font-bold">Thank you for your purchase, a representative will get back to you shortly..</p>
        <Link to="/profile"><button className="bg-orange-500 font-semibold text-white p-[10px] rounded-md hover:bg-orange-600" >Manage Orders</button></Link>
    </div>
    </div>
  )
}

export default thankYou