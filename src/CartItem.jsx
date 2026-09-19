import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Convierte precios como "$15" en el número 15.
  const getNumericCost = (cost) => {
    if (typeof cost === "number") {
      return cost;
    }

    return parseFloat(cost.replace("$", "")) || 0;
  };

  // Calcula el costo total de todos los productos.
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = getNumericCost(item.cost);
      return total + itemCost * item.quantity;
    }, 0);
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    onContinueShopping(event);
  };

  const handleCheckoutShopping = () => {
    alert("Checkout functionality coming soon!");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcula el subtotal de un producto.
  const calculateTotalCost = (item) => {
    const itemCost = getNumericCost(item.cost);
    return itemCost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div
          style={{
            color: "black",
            fontSize: "24px",
            margin: "30px 0",
          }}
        >
          Your cart is empty.
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <div className="cart-item-name">
                  {item.name}
                </div>

                <div className="cart-item-cost">
                  Unit Price: {item.cost}
                </div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    −
                  </button>

                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="total_cart_amount"
        style={{
          marginTop: "20px",
          color: "black",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Grand Total: ${calculateTotalAmount()}
      </div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;