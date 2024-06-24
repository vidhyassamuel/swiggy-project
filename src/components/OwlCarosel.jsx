import  { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { SWIGGY_URL } from "../constant/Images/ConstantUrl";
import "../assets/css/components/OwlCarosel.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useValue } from "../context/ContextProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickCarousel = () => {
  const { dispatch } = useValue();
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

      const thirdCard =
        response?.data.data.cards[4].card.card.gridElements.infoWithStyle
          .restaurants;

      dispatch({ type: "CARD_DATE", payload: thirdCard });

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
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
        </Slider>
      </div>

      <div className="slider-container">
        <Slider {...settings}>
          {secondCarousel.map((item, index) => (
            <div
              className="item"
              key={index}
              style={{
                marginTop: "0px",
                margin: "20px 30px",
                padding: "10px",
              }}
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info.cloudinaryImageId}`}
                className="carousel-image"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "0px solid blue",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <p>{item?.info.name}</p>
              <p>
                <StarBorderIcon /> {item?.info.avgRatingString}{" "}
                {item?.info.sla.slaString}
              </p>
              <p style={{ fontSize: "10px" }}>
                {item?.info.cuisines.toString()}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SlickCarousel;
