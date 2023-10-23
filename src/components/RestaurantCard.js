import { IMG_CDN_URL } from "../constants";

const RestaurantCard = ({cloudinaryImageId, name, cuisines, areaName, avgRating}) => {
    return (
      <div className='card'>
        <img src={IMG_CDN_URL+cloudinaryImageId}></img>
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <span>
         <h4>{avgRating} stars</h4>
         <h4>{areaName}</h4>
        </span>
      </div>
    )
};

export default RestaurantCard;