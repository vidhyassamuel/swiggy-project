import { useValue } from "../context/ContextProvider";
import { RESTAURANT_API } from "../constant/Images/ConstantUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../assets/css/components/DetailPage.css";

const DetailPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const {
    state: { restaurantId },
  } = useValue();

  console.log(restaurantId, "restaurantId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(RESTAURANT_API + restaurantId, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const menuItem =
        response?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
          ?.cards[2]?.card?.card?.itemCards;
      console.log(menuItem, "response MENU");
      setMenuItems(menuItem);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="details-page">
  {menuItems?.map((item, index) => (
    <div className="menu-items" key={index}>
      <div className="menu-item-info">
        <h3> {item?.card?.info?.name} </h3>
        <p> {item?.card.info.description} </p>
        <p>₹ {(item?.card.info.defaultPrice / 100).toFixed(2)} </p>
        <div className="menu-item-rating">
          <StarBorderIcon />
          <span> {item?.card.info.ratings.aggregatedRating.rating} </span>
          <span>
            {" "}
            {item?.card.info.ratings.aggregatedRating.ratingCount}{" "}
          </span>
        </div>
      </div>
      <div className="menu-item-image">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit//${item?.card.info.imageId}`}
          alt=""
        />
        <button className="add-button"> ADD </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default DetailPage;
