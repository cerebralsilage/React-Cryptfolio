
import './CoinCap.css';

const CoinCapTop = ({
  totalCap,
  oneDay
}) => {
  return (
    <div className="coincap-page">
      {oneDay < 0 ?
        <div className="cap-total-orange">
          <div className="cap-total-top">
            <p>Total Cap</p>
            <p className="right1">24H</p>
          </div>
          <div className="cap-total-bottom">
            <p className="total-cap-num">{totalCap}</p>
            <p>{oneDay}%</p>
          </div>
        </div>
      :
        <div className="cap-total-green">
          <div className="cap-total-top">
            <p>Total Cap</p>
            <p className="right1">24H</p>
          </div>
          <div className="cap-total-bottom">
            <p>{totalCap}</p>
            <p>{oneDay}%</p>
          </div>
        </div>
      }
      <div className="cap-head">
        <p className="head-rank">Rank/Coin</p>
        <p className="head-cap-occ">CoinCap/Occupation</p>
        <p className="head-price">Price</p>
      </div>
    </div>
  );
}

export default CoinCapTop;