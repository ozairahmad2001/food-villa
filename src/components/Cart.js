import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleClearCart = ()=>{
    dispatch(clearCart())
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">This is your cart.</h1>
      <span className="text-2xl font-semibold">
        Items in your cart - {cartItems.length}
      </span>
    <button className="bg-green-100 m-3 p2" onClick={()=>handleClearCart()}> clear cart</button>
      <div className="flex">
        {cartItems.map((item) => (
          <FoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default Cart;
