import React, { useState, useEffect } from "react";
import coinGecko from '../../Util/coingecko';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './Charts.css';


export const HistoryChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [timeFormat, setTimeFormat] = useState('24h')
  const [isLoading, setIsLoading] = useState(false);
  const {day, week, month, year, all} = priceData;

  const params = useParams();

  const formatData = (data) => {
    return data.map((el) => {
      return ([
        el[0],
        el[1],
        el[2],
        el[3],
        el[4]
      ])
    });
  };

  useEffect(() => {
    const fetchCandle = async () => {
      setIsLoading(true);
      const [day, week, month, year, all] = await Promise.all([
        coinGecko.get(`/coins/${params.id}/ohlc?vs_currency=usd&days=1`
        ),
        coinGecko.get(`/coins/${params.id}/ohlc?vs_currency=usd&days=7`
        ),
        coinGecko.get(`/coins/${params.id}/ohlc?vs_currency=usd&days=30`
        ),
        coinGecko.get(`/coins/${params.id}/ohlc?vs_currency=usd&days=365`
        ),
        coinGecko.get(`/coins/${params.id}/ohlc?vs_currency=usd&days=max`
        ),
      ]);

      setPriceData({
        day: formatData(day.data),
        week: formatData(week.data),
        month: formatData(month.data),
        year: formatData(year.data),
        all: formatData(all.data)
      });
      setIsLoading(false);
    };
    fetchCandle();
  }, []);
 // console.log(day)


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1m":
        return month;
      case "1y":
        return year;
      case "all":
        return all;
      default:
        return day;
    }
  };

  
// chart data and options
  const groupingUnits = [
    [
      'day', [1, 2, 3, 4, 5, 6, 7]
    ],
    [
      "week", // unit name
      [1] // allowed multiples
    ],
    ["month", [1, 2, 3, 4, 6]]
  ];
  
  const options = {
    plotOptions: {
      candlestick: {
          color: '#228a8c',
          upColor: 'green',
          backgroundColor: '#ffffff00',
      }, 
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        height: "65%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: "OHLC",
        data: determineTimeFormat(),
        dataGrouping: {
          units: groupingUnits
        }
      },
    ]
  };

    return (
      <div>
        {isLoading === true ?
          <p className='loading-data'>Loading...</p>
        :
          <div>
            <div className="chart-button">
              <button
                onClick={() => setTimeFormat("24h")}
                className="btn1"
              >
                1d
              </button>
              <button
                onClick={() => setTimeFormat("7d")}
                className="btn7"
              >
                7d
              </button>
              <button
                onClick={() => setTimeFormat("1m")}
                className="btn30"
              >
                1m
              </button>
              <button
                onClick={() => setTimeFormat("1y")}
                className="btnY"
              >
                1y
              </button>
              <button
                onClick={() => setTimeFormat("all")}
                className="btnAll"
              >
                all
              </button>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={options}
            />
          </div>
        }
      </div>
    )
}