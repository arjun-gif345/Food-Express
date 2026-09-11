import { useState } from "react";
import "./index.css";

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600"
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: 199,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    price: 249,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600"
  },
  {
    id: 4,
    name: "French Fries",
    price: 129,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
  },
  {
    id: 5,
    name: "Veg Biryani",
    price: 229,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=600"
  },
  {
    id: 6,
    name: "Chicken Biryani",
    price: 299,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
  },
  {
    id: 7,
    name: "Chocolate Cake",
    price: 179,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  },
  {
    id: 8,
    name: "Cold Coffee",
    price: 149,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
  },
  {
    id: 9,
    name: "Tandoori Chicken",
    price: 349,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600"
  },
  {
    id: 10,
    name: "Cheese Pizza",
    price: 349,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    id: 11,
    name: "Veg Burger",
    price: 169,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600"
  },
  {
    id: 12,
    name: "Ice Cream",
    price: 129,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = ["All", ...new Set(foods.map(food => food.category))];

  const filteredFoods = foods.filter(food =>
    (category === "All" || food.category === category) &&
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = food => {
    const existing = cart.find(item => item.id === food.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const increase = id => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = id => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("🎉 Order placed successfully!");
    setCart([]);
  };

  return (
    <div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          Food<span>Express</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#cart">Cart 🛒 ({totalItems})</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tag">FAST • FRESH • DELICIOUS</p>

          <h1>
            Delicious Food,
            <br />
            Delivered To You.
          </h1>

          <p>
            Order your favourite meals from the comfort of
            your home.
          </p>

          <a href="#menu" className="hero-btn">
            Order Now
          </a>
        </div>
      </section>

      {/* MENU */}
      <section className="menu" id="menu">

        <div className="section-title">
          <p>OUR MENU</p>
          <h2>Popular Dishes</h2>
        </div>

        {/* SEARCH */}
        <div className="filters">

          <input
            type="text"
            placeholder="🔍 Search food..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

        {/* FOOD CARDS */}
        <div className="food-grid">

          {filteredFoods.map(food => (

            <div className="food-card" key={food.id}>

              <div className="food-image">
                <img src={food.image} alt={food.name} />
              </div>

              <div className="food-info">

                <small>{food.category}</small>

                <h3>{food.name}</h3>

                <div className="rating">
                  ⭐ 4.8
                </div>

                <div className="food-bottom">

                  <strong>
                    ₹{food.price}
                  </strong>

                  <button onClick={() => addToCart(food)}>
                    + Add
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {filteredFoods.length === 0 && (
          <div className="no-food">
            <h3>No food found 😔</h3>
            <p>Try searching for something else.</p>
          </div>
        )}

      </section>

      {/* CART */}
      <section className="cart" id="cart">

        <div className="section-title">
          <p>YOUR ORDER</p>
          <h2>Shopping Cart</h2>
        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <div>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious food to get started.</p>
          </div>

        ) : (

          <div className="cart-layout">

            {/* ITEMS */}
            <div className="cart-items">

              {cart.map(item => (

                <div className="cart-item" key={item.id}>

                  <img src={item.image} alt={item.name} />

                  <div className="item-info">

                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() => decrease(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increase(item.id)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="item-right">

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                    <button
                      className="delete"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div className="order-summary">

              <h3>Order Summary</h3>

              <div>
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div>
                <span>Delivery Fee</span>
                <span>₹{delivery}</span>
              </div>

              <hr />

              <div className="total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

              <button
                className="checkout"
                onClick={placeOrder}
              >
                Place Order
              </button>

            </div>

          </div>

        )}

      </section>

      {/* FEATURES */}
      <section className="features">

        <div>
          <span>🚀</span>
          <h3>Fast Delivery</h3>
          <p>Hot food delivered quickly.</p>
        </div>

        <div>
          <span>🍴</span>
          <h3>Fresh Food</h3>
          <p>Prepared with quality ingredients.</p>
        </div>

        <div>
          <span>💳</span>
          <h3>Easy Ordering</h3>
          <p>Simple and convenient checkout.</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="logo">
          Food<span>Express</span>
        </div>

        <p>
          © 2026 FoodExpress. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;