export function filterData (searchText, restaurants){
    const filterData = restaurants.filter((restaurants)=>restaurants?.info?.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log(filterData);
    return filterData;
  }
  