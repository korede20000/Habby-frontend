// import { useContext, useEffect, useState } from "react";
// import FoodContext from "../../context/FoodContext"; 
// import Card from "./Card";
// import { Link } from "react-router-dom";

// const AllItem = () => {
//     const {menuItem, fetchAllMenuItem} = useContext(FoodContext)
//     // const [searchTerm, setSearchTerm] = useState('')
//     // const [category, SetCategory] = useState('')

//     useEffect(()=> {
//         fetchAllMenuItem()
//     }, [fetchAllMenuItem])

//     // const filteredMenuItem = menuItem.filter(menuItem => menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()) && (category ? menuItem.category.toLowerCase() === category.toLowerCase() : true))
//   return (
//     <div>
//         {/* <h2>All Menu Items</h2>
//         <input
//          type="text"
//          placeholder="Search by name" 
//          value={searchTerm}
//          onChange={(e) => setSearchTerm(e.target.value)}
//          />
//         <input
//          type="text"
//          placeholder="Filter by category" 
//          value={category}
//          onChange={(e) => setSearchTerm(e.target.value)} 
//          /> */}
//          <p>fetch me my items naa</p>
//         <div>
//             {Array.isArray(menuItem) ? (
//                 menuItem.map((item) => (
//                     <Card key={item._id}>
//                         <Link to="" ><img src={"http://localhost:3000/" + item.img} alt="" className="h-[200px] w-[300px]"/></Link>
//                         <p className="font-bold pt-2">{item.name}</p>
//                         <p className="font-medium">{item.description}</p>
//                         <p className="font-medium">{item.price}</p>
//                     </Card> 
                    
//                 ))
//             ) : (
//                 <p>No menu items available</p>
//             )}
//         </div>
//     </div>
//   )
// }

// export default AllItem