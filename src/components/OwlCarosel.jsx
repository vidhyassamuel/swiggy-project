import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { SWIGGY_URL } from "../constant/Images/ConstantUrl";
import "../assets/css/components/OwlCarosel.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useValue } from "../context/ContextProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import SimpleLoader from 'react-simple-dots-loader';

const SlickCarousel = () => {
  const { dispatch } = useValue();
  const [carouselData, setCarouselData] = useState([]);
  const [secondCarousel, setSecondCarousel] = useState([]);
  const [thirdCard, setThirdCard] = useState([]);
  const [loadingFirstCarousel, setLoadingFirstCarousel] = useState(true);
  const [loadingSecondCarousel, setLoadingSecondCarousel] = useState(true);
  const [loadingThirdCard, setLoadingThirdCard] = useState(true);

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

      const fetchedData = response.data.data.cards[0].card.card.imageGridCards.info;
      setCarouselData(fetchedData);
      setLoadingFirstCarousel(false);

      const secondCarouselData = response?.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
      setSecondCarousel(secondCarouselData);
      setLoadingSecondCarousel(false);

      const thirdCardData = response?.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
      setThirdCard(thirdCardData);
      setLoadingThirdCard(false);

      dispatch({ type: "CARD_DATE", payload: thirdCardData });

    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      } else {
        console.error(err);
        setLoadingFirstCarousel(false);
        setLoadingSecondCarousel(false);
        setLoadingThirdCard(false);
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
        {loadingFirstCarousel ? (
          <div className="loader-container" style={{height:"80vh"}}>
            <h1>Loading...</h1>
          </div>
        ) : (
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
        )}
      </div>

      <div className="slider-container">
        {loadingSecondCarousel ? (
          <div className="loader-container" style={{height:"80vh"}}>
          <h1>Loading...</h1>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default SlickCarousel;
