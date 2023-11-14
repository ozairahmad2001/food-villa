import { useContext } from "react";
import UserContext from "../utils/UserContext";
const Footer = () => {
const {user} = useContext(UserContext);
  return <h4 className="text-xl font-bold text-red-800">Made with love by - {user.name} || {user.email}</h4>;
};

export default Footer;
