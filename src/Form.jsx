import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Form = ({ addItem }) => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);

  const updatePrice = (event) => {
    const inputValue = event.target.value;
    const newPrice = inputValue ? parseInt(event.target.value) : 0;
    setNewItemPrice(newPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newItemName);
    if (!newItemName) {
      toast.error("Please provide an item");
      return;
    }
    if (!newItemPrice) {
      toast.error("Please provide a price");
      return;
    }
    addItem(newItemName, newItemPrice);
    setNewItemName("");
    setNewItemPrice(0);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>Grocery Bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          placeholder="Item"
        />
        <input
          type="text"
          className="form-input"
          value={newItemPrice.toString()}
          onChange={updatePrice}
        />
        <button type="submit" className="btn">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default Form;
