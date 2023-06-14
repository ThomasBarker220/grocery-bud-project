import React from "react";
import SingleItem from "./SingleItem";

const Items = ({ items, removeItem, editItem, total }) => {
  return (
    <div className="items">
      {items.map((item) => {
        return (
          <SingleItem
            key={item.id}
            item={item}
            removeItem={removeItem}
            editItem={editItem}
          />
        );
      })}
      <h5>Total Price: ${total}</h5>
    </div>
  );
};

export default Items;
