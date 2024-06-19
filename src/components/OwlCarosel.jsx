import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { SWIGGY_URL } from "../constant/Images/ConstantUrl";
import "../assets/css/components/OwlCarosel.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {useValue} from "../context/ContextProvider"


const OwlCarosel = () => {

const {dispatch} = useValue();


  const [carouselData, setCarouselData] = useState([]);
  const [secondCarousel, setSecondCarousel] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ourRequest = axios.CancelToken.source();
    try {
      const response = await axios.get(SWIGGY_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: ourRequest.token,
      });

      const fetchedData =
        response.data.data.cards[0].card.card.imageGridCards.info;

      const secondCarouselData =
        response?.data.data.cards[1].card.card.gridElements.infoWithStyle
          .restaurants;


const thirdCard = response?.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;

dispatch({type:"CARD_DATE", payload: thirdCard})

      console.log(thirdCard, "thirdCard");

      setCarouselData(fetchedData);
      setSecondCarousel(secondCarouselData);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      } else {
        console.error(err);
      }
    }
  };

  const options = {
    loop: true,
    margin: 0, // Set margin to 0
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  return (
    <>
      <OwlCarousel
        className="owl-theme"
        {...options}
        style={{ border: "0px solid red", width: "65%", margin: "0px auto" }}
      >
        {carouselData.map((item, index) => (
          <div className="item" key={index} style={{ marginTop: "50px" }}>
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
              alt={item.accessibility?.altText || "Image"}
              className="carousel-image"
              style={{ width: "150px", border: "0px solid blue" }}
            />
          </div>
        ))}
      </OwlCarousel>

      <OwlCarousel
        className="owl-theme"
        {...options}
        style={{ border: "0px solid red", width: "85%", margin: "0px auto" }}
      >
        {secondCarousel.map((item, index) => (
          <div className="item" key={index} style={{ marginTop: "0px",
            margin:"20px 30px",
            padding:"10px",
          

           }}>
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info.cloudinaryImageId}`}
              // alt={item.accessibility?.altText || "Image"}
              className="carousel-image"
              style={{
                width: "200px",
                height: "200px",
                border: "0px solid blue",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <p> {item?.info.name} </p>
            <p>
              {" "}
              <StarBorderIcon /> {item?.info.avgRatingString}{" "}
              {item?.info.sla.slaString}{" "}
            </p>
            <p style={{fontSize:"10px"}} > {item?.info.cuisines.toString()} </p>
          </div>
        ))}
      </OwlCarousel>

    </>
  );
};

export default OwlCarosel;
