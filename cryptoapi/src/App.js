import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => alert("Wufff there is an eror"));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <div class="wavy">
          <span className="apple1">S</span>
          <span className="apple2">E</span>
          <span className="apple3">A</span>
          <span className="apple4">R</span>
          <span className="apple6">C</span>
          <span className="apple6">H</span>
          <span className="apple7">.</span>
          <span className="apple8">.</span>
          <span className="apple9">.</span>
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter your Currency"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
      <div className="copyright">All rights reserved ©akash2021</div>
    </div>
  );
}

export default App;
