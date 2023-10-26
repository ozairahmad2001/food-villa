import { useParams } from "react-router-dom";
import { swiggy_menu_api_url, MENU_ITEM_TYPE_KEY } from "../constants";
import { useEffect, useState} from "react";
const RestaurantMenu = () => {
    const {resId} = useParams();
    const [menuItems, setMenuItems] = useState([]);
    useEffect(()=> {
        getRestaurantMenu();
    }, []);
    async function getRestaurantMenu(){
        try{
            const response = await fetch (swiggy_menu_api_url + resId);
            const json = response.json();
            console.log("api call made");

            const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
            groupedCard?.cardGroupMap?.REGULAR?.
            cards?.map(x => x.card?.card)?.
            filter(x=>x?.card?.card['@type'] == MENU_ITEM_TYPE_KEY)?.
            map(x=> x?.card?.card?.itemCards).flat().map(x=> x.card?.info) || [];
            
            const uniqueMenuItems = [];
            menuItemsData.forEach((item)=> {
                if(!uniqueMenuItems.find(x=>x.id === item.id)){
                    uniqueMenuItems.push(item);
                }
            });
            setMenuItems(uniqueMenuItems);
        } catch(err){

            console.log(err);
        }
    };
    return (
        <div className="restaurant-menu">
        {menuItems.length}
            {menuItems.map((item) => {
                return (
                    <h3>{menuItems.length}</h3>
                )
            })}
        </div>
    )
};
export default RestaurantMenu;