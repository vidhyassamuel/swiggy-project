import "../assets/css/components/Navbar.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SWIGGY_ICON } from "../constant/Images/ImagesUrl";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img className="navbar-logo" src={SWIGGY_ICON} alt="Logo" />
          <div className="navbar-location">
            <LocationOnIcon />
            <span className="navbar-location-other">Other</span>
            <span className="navbar-location-detail">Bengaluru, Karnataka, India</span>
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" className="navbar-link">
            <BusinessCenterIcon />
            Swiggy Corporate
          </a>
          <a href="#" className="navbar-link">
            <SearchIcon />
            Search
          </a>
          <a href="#" className="navbar-link">
            <LocalOfferIcon />
            Offers <span className="navbar-new">NEW</span>
          </a>
          <a href="#" className="navbar-link">
            <HelpOutlineIcon />
            Help
          </a>
          <a href="#" className="navbar-link">
            <AccountCircleIcon />
            Sign In
          </a>
          <a href="#" className="navbar-link">
            <ShoppingCartIcon />
            Cart <span className="navbar-cart">(0)</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;