import FoodContext from "../../context/FoodContext"
import { useContext } from "react";
import {MdDelete} from "react-icons/md"
import { Link } from "react-router-dom";
import {Navigate} from "react-router-dom"

const Cart = () => {
    const {cartItems, fetchCart, updateQuantity, totalAmount, deleteItems, calculateDeliveryFee, isAuthenticated} = useContext(FoodContext);

    useEffect(() => {
        fetchCart(); // Fetch cart items on component mount
    }, []);

    if(!isAuthenticated) {
        return <Navigate to="/login"/>
    }

  const cartTable=(
    <>
    <table className="w-[10%] lg:w-[90%] mx-auto h-[30vh] mt-5">
            <thead className="border-2 border-orange-600">
                <th>Action</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                
            </thead>
            <tbody className="text-center">
                {cartItems.menuItems?.map((item)=> (
                    <tr key={item.menuItem._id} className="border-b-2">
                        <td>
                            <div>
                                <button onClick={()=> deleteItems(item.menuItem._id)} >
                                <MdDelete className="text-2xl text-orange-500"/>
                                </button>
                            </div>
                        </td>
                        <td className="font-serif">{item.menuItem.name}</td>
                        <td>  
                            <div className="flex justify-center my-1">
                                <img src={ "https://habby-api.onrender.com/" + item.menuItem.img} alt="" className="h-[50px] w-[50px] outline outline-1 outline-orange-500 " />
                            </div>
                        </td>
                        <td className="font-semibold">{item.menuItem?.price}</td>
                        <td>
                            <input type="number" className="outline outline-1 w-[100%] lg:w-[30%] font-semibold text-center" value={item.quantity} min="1"  onChange={(e)=> updateQuantity(item.menuItem._id, e.target.value)}/>
                        </td>
                        <td className="font-semibold">{item.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="text-center py-4 px-4 border border-white shadow-2xl">
            <div className="mt-5">
                <div className="text-lg font-semibold mb-3">Delivery Fee = ₦{calculateDeliveryFee(cartItems.menuItems?.reduce((total, item) => total + item.amount, 0) || 0)}</div>
                <div className="text-lg font-semibold mb-3">Total = ₦{totalAmount()}</div>
                <div>
                <Link to="/checkout"><button className=" text-white font-bold mt-3 bg-orange-600 py-2 px-4">Checkout</button></Link>
            </div>
        </div>
        </div>
    </>
  )

  return (
    <div className="mt-5" >
        <h1 className="text-xl font-bold text-orange-600 text-center mb-10">YOUR ORDER</h1>
        {cartItems.menuItems?.length > 0 ? cartTable : <h1 className="text-center font-bold">No Items</h1> }
    </div>
  )
}

export default Cart