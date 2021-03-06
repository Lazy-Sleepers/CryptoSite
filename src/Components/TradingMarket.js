import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Coin from "../Components/Coin";
import { Col, Row, CardDeck } from "react-bootstrap";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

function MyList() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filter1 = coins.filter(
    (coin) =>
      coin.symbol === "btc" ||
      coin.symbol === "eth" ||
      coin.symbol === "ltc" ||
      coin.symbol === "bch",
  );

  const filteredCoins = filter1.filter((coin) => coin.name.toLowerCase());

  return (
    <div className="market fixPad" style={{ backgroundColor: "#64b5f6" }}>
      <Col>
        <Row style={{ alignItems: "center", justifyContent: "center" }}>
          <CardDeck>
            {filteredCoins.map((coin) => {
              console.log(coin.last_updated);
              return (
                <Coin
                  key={coin.id}
                  name={coin.name}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  marketcap={coin.total_volume}
                  volume={coin.market_cap}
                  image={coin.image}
                  priceChange={coin.price_change_percentage_24h}
                  lastUpdate={coin.last_updated}
                  highPeek={coin.high_24h}
                  lowPeek={coin.low_24h}
                />
              );
            })}
          </CardDeck>
        </Row>
      </Col>
    </div>
  );
}
const DetailsChart = (props) => {
  const sym = props.match.params.name;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  console.log(width, height);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <TradingViewWidget
      symbol={
        sym === "btc"
          ? "COINBASE:BTCUSD"
          : sym === "eth"
          ? "COINBASE:ETHUSD"
          : sym === "ltc"
          ? "COINBASE:LTCUSD"
          : "COINBASE:BCHUSD"
      }
      theme={Themes.DARK}
      locale="en"
      //autosize={true}
      height={height <= 991 ? height - 115 : height - 50}
      width={width}
    />
  );
};
const TradingMarket = () => (
  <div
    style={{
      boxSizing: "border-box",
      margin: 0,
      paddingBottom: "5rem",
      fontFamily: "Montserrat",
      background: "linear-gradient(150deg,rgba(250,0,0,0.5),transparent)",
      backgroundColor: "#585e81",
      color: "#fff",
    }}
  >
    <Row className="bg-light">
      <Col>
        <MyList />
      </Col>
    </Row>
  </div>
);

export { TradingMarket, MyList, DetailsChart };
