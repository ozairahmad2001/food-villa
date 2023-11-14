import { useContext } from 'react';
import { IMG_CDN_URL } from "../constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  avgRating,
}) => {
  const {user} = useContext(UserContext)
  return (
    <div className="w-56 p-2 m-2 bg-pink-50 shadow-lg">
      <img src={IMG_CDN_URL + cloudinaryImageId}></img>
      <h2 className="font-bold text-xl">{name}</h2>
      <h3>{cuisines.join(", ")}</h3>
      <span>
        <h4>{avgRating} stars</h4>
        <h4>{areaName}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;
