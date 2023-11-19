import { IMG_CDN_URL } from "../constants";
const FoodItem = ({ name, description, imageId, price }) => {
  return (
    <div className="w-56 p-2 m-2 bg-pink-50 shadow-lg">
      <img src={IMG_CDN_URL + imageId}></img>
      <h2 className="font-bold text-xl">{name}</h2>
      <h3>{description}</h3>
      <span>
        <h4>Rupees: {price / 100} stars</h4>
      </span>
    </div>
  );
};

export default FoodItem;
