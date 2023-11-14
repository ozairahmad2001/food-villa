import { useEffect, useState } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_url } from "../constants";
import Shimmer from "./Shimmer";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

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

  const isOnline = useOnline();
  if(!isOnline){
    return <h1>Looks like you are offline... please check your internet connection.</h1>
  }

  if(!allRestaurants) return null;
    return allRestaurants?.length===0?(
      <ShimmerSimpleGallery card imageHeight={300} caption/>
    ):(
      <>
        <div className="search-container p-3 my-2 flex justify-center items-center">
          <input type="text" className="search-input mx-2 border-2 rounded-md focus:bg-slate-200 w-80 p-1 h-11" placeholder="Search for your favourite restaurants..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}></input>
          <button className="search-btn p-2 m-2 bg-violet-500 hover:bg-violet-600 rounded-md text-white" onClick={()=>{
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}>Search</button>
        </div>
        <div className='flex flex-wrap justify-center'>
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
