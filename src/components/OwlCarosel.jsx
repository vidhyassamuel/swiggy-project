import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { SWIGGY_URL } from "../constant/Images/ConstantUrl";
import "../assets/css/components/OwlCarosel.css"; // 

const OwlCarosel = () => {
  const [carouselData, setCarouselData] = useState([]);

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
      console.log(fetchedData, "fetchedData");
      setCarouselData(fetchedData);
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
    <OwlCarousel
      className="owl-theme"
      {...options}
      style={{ border: "0px solid red", width: "65%", margin: "0px auto" }}
    >
      {carouselData.map((item, index) => (
        <div className="item" key={index} style={{ marginTop:"50px" }}>
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
            alt={item.accessibility?.altText || "Image"}
            className="carousel-image"
            style={{ width: "150px", border: "0px solid blue" }}
          />
        </div>
      ))}
    </OwlCarousel>
  );
};

export default OwlCarosel;
