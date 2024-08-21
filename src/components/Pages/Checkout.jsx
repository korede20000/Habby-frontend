import { useContext } from "react";
import FoodContext from "../../context/FoodContext";
import {Navigate} from "react-router-dom"

const Checkout = () => {

  const { cartItems, totalAmount , isauthenticated} = useContext(FoodContext);

  if(!isauthenticated){
    return <Navigate to="/login"/>
  }


  const total = totalAmount();

  const handleCheckout = async (e) => {
    e.preventDefault();

    const amount = totalAmount();
    const currency = "NGN";

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const phone = e.target.elements.phone.value;
    const address = e.target.elements.address.value;

    try {
      const res = await fetch("https://habby-api.onrender.com/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          firstName,
          lastName,
          phone,
          address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error(data.msg || "Failed to Initiate Payment");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="lg:flex my-10 mx-10 gap-10">
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <h1 className="font-bold text-center text-orange-600 mb-5 text-2xl">ORDER SUMMARY</h1>
        <table className="w-full mx-auto border-2 border-orange-600">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2">Item</th>
              <th className="py-2">Image</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-center font-semibold">
            {cartItems.menuItems?.map((item) => (
              <tr key={item._id} className="border-b-2 border-orange-600">
                <td className="py-2 font-serif">{item.menuItem.name}</td>
                <td className="py-2">
                  <div className="flex justify-center">
                    <img
                      src={"https://habby-api.onrender.com/" + item.menuItem.img}
                      className="h-12"
                      alt=""
                    />
                  </div>
                </td>
                <td className="py-2">₦{item.menuItem.price}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-5">
          <h1 className="text-2xl font-bold">TOTAL = ₦{total}</h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="mb-5 font-bold text-center text-orange-600 text-2xl">DELIVERY INFORMATION</h1>
        <form onSubmit={handleCheckout} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="firstName">
              First Name
            </label>
            <input className="outline outline-1 p-2 rounded-md" type="text" name="firstName" />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="lastName">
              Last Name
            </label>
            <input className="outline outline-1 p-2 rounded-md" type="text" name="lastName" />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="phone">
              Phone Number
            </label>
            <input className="outline outline-1 p-2 rounded-md" type="text" name="phone" />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="address">
              Address
            </label>
            <textarea
              className="outline outline-1 p-2 rounded-md"
              name="address"
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-600 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-700"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout