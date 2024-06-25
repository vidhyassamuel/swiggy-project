import "../assets/css/components/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SWIGGY_ICON } from "../constant/Images/ImagesUrl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); 

  const itemCount = useSelector(state => state.cart.itemCount);


  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
        <Link to="/">
          <img className="navbar-logo" src={SWIGGY_ICON} alt="Logo" />
          </Link>
          <div className="navbar-location">
            <LocationOnIcon fontSize="small"  />
            <span className="navbar-location-detail">
              Bengaluru, Karnataka, India
            </span>
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" className="navbar-link">
            <BusinessCenterIcon fontSize="small" />
            Swiggy Corporate
          </a>
          <a href="#" className="navbar-link">
            <SearchIcon fontSize="small" />
            Search
          </a>
          <a href="#" className="navbar-link">
            <LocalOfferIcon fontSize="small" />
            Offers <span className="navbar-new">NEW</span>
          </a>
          <a href="#" className="navbar-link">
            <HelpOutlineIcon fontSize="small" />
            Help
          </a>
          <a href="#" className="navbar-link">
            <AccountCircleIcon fontSize="small" />
            Sign In
          </a>
          <a href="#" className="navbar-link" onClick={handleCartClick}>
            <ShoppingCartIcon />
            Cart <span className="navbar-cart"> ({itemCount}) </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
