import { useParams } from "react-router-dom";
import { swiggy_menu_api_url, MENU_ITEM_TYPE_KEY, IMG_CDN_URL } from "../constants";
import { useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
const RestaurantMenu = () => {
    const { resId } = useParams();

    const menuItems = useRestaurant(resId);
   
    return !menuItems ? (<Shimmer/>):(
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
                    <p>Cost: Rs {menuItem.price/100}</p>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};
export default RestaurantMenu;