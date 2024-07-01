import { useValue } from "../context/ContextProvider";
import { RESTAURANT_API } from "../constant/Images/ConstantUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../assets/css/components/DetailPage.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";
// import SimpleLoader from 'react-simple-dots-loader';

const DetailPage = () => {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true); // State to manage carousel loading
  const [loadingMenuItems, setLoadingMenuItems] = useState(true); // State to manage menu items loading
  const {
    state: { restaurantId },
  } = useValue();

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
      setMenuItems(menuItem);
      setLoadingMenuItems(false); // Set loading to false after menu items are fetched

      const carouselItems = response?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
        ?.cards[1]?.card?.card?.carousel || [];
      setCarouselData(carouselItems);
      setLoadingCarousel(false); // Set loading to false after carousel items are fetched

    } catch (err) {
      console.error(err);
      setLoadingCarousel(false); // Set loading to false in case of error
      setLoadingMenuItems(false); // Set loading to false in case of error
    }
  };

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="details-page">
      {loadingCarousel ? (
        <div className="loader-container"  style={{height:"80vh"}} >
        <h1>Loading...</h1>
        </div>
      ) : (
        <OwlCarousel
          className="owl-theme"
          {...options}
          style={{ border: "0px solid red", width: "85%", margin: "0px auto" }}
        >
          {carouselData.map((item, index) => (
            <div className="item" key={index} style={{ marginTop: "50px" }}>
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.dish?.info?.imageId}`}
                alt={item.dish?.info?.name || "Image"}
                className="carousel-image"
                style={{ width: "150px", border: "0px solid blue", borderRadius:"5px" }}
              />
            </div>
          ))}
        </OwlCarousel>
      )}

      {loadingMenuItems ? (
        <div className="loader-container" style={{height:"80vh"}}>
        <h1>Loading...</h1>
        </div>
      ) : (
        menuItems?.map((item, index) => (
          <div className="menu-items" key={index}>
            <div className="menu-item-info">
              <h3> {item?.card?.info?.name} </h3>
              <p> {item?.card.info.description} </p>
              <p>₹ {item?.card.info.defaultPrice ? (item.card.info.defaultPrice / 100).toFixed(2) : 'N/A'} </p>

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
              <button onClick={() => addFoodItem(item)} className="css-button-sliding-to-left--sand">Add Item</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DetailPage;
