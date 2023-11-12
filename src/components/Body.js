import { useEffect, useState } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_url } from "../constants";
import Shimmer from "./Shimmer";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";

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
  if(!allRestaurants) return null;
    return allRestaurants?.length===0?(
      <ShimmerSimpleGallery card imageHeight={300} caption/>
    ):(
      <>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search for your favourite restaurants..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
          <button className="search-btn" onClick={()=>{
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}>Search</button>
        </div>
        <div className='restaurant-list'>
        {filteredRestaurants.map((restaurant)=>{
          return (<Link to = {"/restaurant/"+restaurant.info.id} key={restaurant?.info?.id}>
          <RestaurantCard { ...restaurant?.info}/>
          </Link>);
        })}
        </div>
        
      </>
    )
};

export default Body;
