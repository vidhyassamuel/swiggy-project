import { useValue } from "../context/ContextProvider";
import "../assets/css/components/Restaurant.css";

import StarBorderIcon from "@mui/icons-material/StarBorder";

const Restaurant = () => {
  const {
    state: { cardData },
  } = useValue();

  console.log(cardData, "thirdCardthirdCard");

  return (
    <div className="restaurant-container">
      {cardData?.map((item, index) => (
        <div className="restaurant-card" key={index}>
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
            alt=""
            className="restaurant-image"
          />
          <div>
            <p> {item?.info?.name} </p>
            <p className="restaurant-rating" > <StarBorderIcon/>  {item?.info.avgRatingString} </p>
            <p  className="restaurant-cuisines" >{item?.info.cuisines.toString()} </p>
            <p>  {item?.info.locality} </p>
        
          </div>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
