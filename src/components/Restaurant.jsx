import { useValue } from "../context/ContextProvider";
import "../assets/css/components/Restaurant.css";
import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Restaurant = () => {
  const navigate = useNavigate();
  const {
    state: { cardData }, dispatch
  } = useValue();

  const detailsPage = (restaurantId) => {
    console.log(restaurantId, "restaurantId");
    dispatch({ type: "RESTAURANT_ID", payload: restaurantId });
    navigate("/detailsPage");
  }

  return (
    <div className="restaurant-container">
      {cardData?.map((item, index) => (
        <div className="restaurant-card" key={index} onClick={() => detailsPage(item?.info.id)} >
          <div className="imgBx">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
              alt=""
              className="restaurant-image"
            />
          </div>
          <div className="details">
            <h2>
              {item?.info?.name} <br />
              <span>{item?.info.locality}</span>
            </h2>
            <p className="restaurant-rating">
              <StarBorderIcon /> {item?.info.avgRatingString}
            </p>
            <p className="restaurant-cuisines">
              {item?.info.cuisines.toString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
