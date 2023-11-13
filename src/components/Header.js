import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export const Title = () => {
    return (
      <a href="/">
      <h1 className='logo'>Food Villa</h1>
    </a>
    )
};

const Header = () =>{

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
    return (
      <div className='header'>
        <Title/>
        <div className='nav-items'>
          <ul>
            <li> <Link to = '/'>Home</Link></li>
            <li> <Link to = '/about'>About</Link></li>
            <li> <Link to = '/contact'>Contact Us</Link></li>
            <li> <Link to = '/cart'>Cart</Link></li>
            <li> <Link to = '/instamart'>Instamart</Link></li>
            <li>{isLoggedIn ? (<button className="logout-btn" onClick={()=> setIsLoggedIn(false)}>Logout</button>)
             : 
             (<button className="login-btn" onClick={() => navigate("/login")}>Login</button>)}</li>
          </ul>
        </div>
      </div>
    )
};

export default Header;