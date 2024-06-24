import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../Redux/CartSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../assets/css/components/Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-info">
                <h3>{item.card.info.name}</h3>
                <p>
                  ₹
                  {item.card.info.defaultPrice
                    ? (item.card.info.defaultPrice / 100).toFixed(2)
                    : 'N/A'}
                </p>
                <div className="menu-item-rating">
                  <span>★ {item.card.info.ratings.aggregatedRating.rating}</span>
                  <span>({item.card.info.ratings.aggregatedRating.ratingCount})</span>
                </div>
                <p>{item.card.info.description}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>
              </div>
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                alt=""
              />
            </div>
          ))
        ) : (
          <h1>No items available... 😊</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
