import { useParams } from "react-router-dom";
import { swiggy_menu_api_url, MENU_ITEM_TYPE_KEY, IMG_CDN_URL } from "../constants";
import { useEffect, useState} from "react";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
    const { resId } = useParams();
    const [menuItems, setMenuItems] = useState(null);
    useEffect(()=> {
        getRestaurantMenu();
    }, []);
    async function getRestaurantMenu(){
        try{
            const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5482377&lng=77.2983373&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
            const json = await data.json();

            const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
            groupedCard?.cardGroupMap?.REGULAR?.
            cards?.map(x => x.card?.card)?.
            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];

            const uniqueMenuItems = [];
            menuItemsData.forEach((item) => {
              if (!uniqueMenuItems.find(x => x.id === item.id)) {
                uniqueMenuItems.push(item);
              }
            })
            setMenuItems(uniqueMenuItems);
        } catch(err){
            setMenuItems([]);
            setRestaurant(null);
            console.log(err);
        }
    };
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