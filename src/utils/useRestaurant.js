import React from 'react'
import { useState, useEffect } from 'react';
import { MENU_ITEM_TYPE_KEY } from '../constants';

const useRestaurant = (resId) => {

  const [restaurant, setRestaurant] = useState(null);

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
        setRestaurant(uniqueMenuItems);
        console.log(restaurant);
    } catch(err){
        setRestaurant([]);
        console.log(err);
    }
  };

  return restaurant;
}

export default useRestaurant