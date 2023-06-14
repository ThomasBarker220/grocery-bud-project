import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";

// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     list = JSON.parse(localStorage.getItem("list"));
//   } else {
//     list = [];
//   }
//   return list;
// };

const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

const defaultTotal = JSON.parse(localStorage.getItem("total") || "0");

const App = () => {
  const [items, setItems] = useState(defaultList);
  const [total, setTotal] = useState(defaultTotal);

  const addItem = (itemName, itemPrice) => {
    const newItem = {
      name: itemName,
      price: itemPrice,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("Item added");
  };

  const removeItem = (itemId) => {
    const toRemove = items.find((item) => item.id === itemId);
    const newTotal = toRemove.completed ? total - toRemove.price : total;
    if (newTotal < 0) {
      setTotal(0);
      localStorage.setItem("total", 0);
    } else {
      setTotal(newTotal);
      localStorage.setItem("total", newTotal);
    }

    const filteredItems = items.filter((item) => {
      return item.id !== itemId;
    });
    setItems(filteredItems);
    setLocalStorage(filteredItems);
    toast.success("Item removed");
  };

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        if (newItem.completed) {
          const newTotal = total + newItem.price;
          setTotal(newTotal);
          localStorage.setItem("total", newTotal);
        } else {
          const newTotal = total - newItem.price;
          if (newTotal < 0) {
            setTotal(0);
            localStorage.setItem("total", 0);
          } else {
            setTotal(newTotal);
            localStorage.setItem("total", newTotal);
          }
        }
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        total={total}
      />
    </section>
  );
};

export default App;
