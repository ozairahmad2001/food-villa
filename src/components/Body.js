import { useEffect, useState } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_url } from "../constants";

function filterData (searchText, restaurants){
  const filterData = restaurants.filter((restaurants)=>restaurants?.info?.name.toLowerCase().includes(searchText.toLowerCase()));
  console.log(filterData);
  return filterData;
}

const Body = () =>{
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  },[]);

  async function getRestaurants(){
    try{
      const res = await fetch (swiggy_api_url);
      const json = await res.json();
      setAllRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    catch(error){
      console.log(error);
    }
  }
    return (
      <>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search for your favourite restaurants..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
          <button className="search-btn" onClick={()=>{
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}>Search</button>
        </div>
        {allRestaurants?.length === 0 ? (<h1>waiting for data from api</h1>)
        :
        (<div className='restaurant-list'>
        {filteredRestaurants.map((restaurant)=>{
          return (<RestaurantCard key={restaurant?.info?.id} { ...restaurant?.info}/>);
        })}
        </div>
        )}
      </>
    );
};

export default Body;
