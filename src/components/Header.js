import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

export const Title = () => {
  return (
    <a href="/">
      <h1 className="text-3xl font-bold p-5 pr-10">Food Villa</h1>
    </a>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const cartItems = useSelector((store)=>store.cart.items);
  return (
    <div className="flex justify-between bg-pink-50 shadow-md ">
      <Title />
      <div className="nav-items">
        <ul className="flex py-7">
          <li className="px-2">
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li className="px-2" >
            {" "}
            <Link to="/about">About</Link>
          </li>
          <li className="px-2">
            {" "}
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-2">
            {" "}
            <Link to="/instamart">Instamart</Link>
          </li>
          <li className="px-2">
            {" "}
            <Link to="/cart">Cart {cartItems.length} items</Link>
          </li>
          <li className="p-18 font-bold text-red-900 uppercase">{user.name}</li>
          <li className="px-2">
            {isLoggedIn ? (
              <button
                className="logout-btn"
                onClick={() => setIsLoggedIn(false)}>
                Logout
              </button>
            ) : (
              <button className="login-btn"  onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
