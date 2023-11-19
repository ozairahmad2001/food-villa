import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_url,
  MENU_ITEM_TYPE_KEY,
  IMG_CDN_URL,
} from "../constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
const RestaurantMenu = () => {
  const { resId } = useParams();

  const menuItems = useRestaurant(resId);
  const dispatch = useDispatch();
  const handleAddItem = (menuItem) => {
    dispatch(addItem(menuItem)); //dispatch an action and passed the payload to it
  };

  return !menuItems ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div>
        <h1>Restaurant Id : {resId} </h1>
      </div>
      <div>
        <h1>Menu</h1>

        <h2>Total Menu Items: {menuItems.length}</h2>
        <ul>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <h3>{menuItem.name}</h3>
              <p>{menuItem.description}</p>
              <img src = {IMG_CDN_URL + menuItem.imageId}/>
              <p>Cost: Rs {menuItem.price / 100}</p>
              <button
                className="m-1 p-1 bg-green-100"
                onClick={() => handleAddItem(menuItem)}>
                {" "}
                add item
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RestaurantMenu;
