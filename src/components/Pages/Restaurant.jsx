import { useContext } from "react";
import { Link } from "react-router-dom";
import FoodContext from "../../context/FoodContext"
import { CiStar } from "react-icons/ci";


const Restaurant = () => {
  const { restaurant, loading, filteredRestaurants, searchQuery, setSearchQuery } = useContext(FoodContext);

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl lg:px-[40%] text-orange-600 text-center pt-5">Explore our Restaurants</h1>
        <div className="mb-8">
          <input
            className="lg:px-[10px] lg:w-[15%] outline outline-2 outline-neutral-300 border-orange-600 py-2 pl-5 rounded-full lg:mx-[42%] mx-[20%] my-5"
            type="text"
            placeholder="explore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>
      {loading ? (
        <p className="text-3xl font-semibold pl-5">Loading...</p>
      ) : (
        <div className="lg:my-[20px] my-14 lg:mx-[25px] mx-10 ">
          <div className="lg:flex lg:gap-6 space-y-8">
            {filteredRestaurants.map((restaurant) => (
              <div className="border border-white lg:w-[350px] w-[250px] h-[260px] my-4 outline-1 text-center rounded-2xl shadow-2xl hover:scale-90 duration-200" key={restaurant._id}>
                <Link to={`/restaurant/${restaurant._id}`}>
                  <img src={"https://habby-api.onrender.com/" + restaurant.img} alt="" className="lg:h-[150px] lg:w-[300px] h-[150px] w-[200px] rounded-lg lg:px-5 px-3 lg:mx-0 mx-5 py-5" />
                </Link>
                <p className="font-bold pt-2 text-black">{restaurant.name}</p>
                <div className="flex lg:px-16 px-24">
                  <p className="font-medium text-orange-600">{restaurant.rating}</p>
                  <p className="text-yellow-500"><CiStar /></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant