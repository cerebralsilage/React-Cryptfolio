import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './Charts.css';


export const HistoryChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchCandle = async () => {
      setIsLoading(true);
      const response = await Axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=max`
      );
      setPriceData(response.data)
    }
    
    fetchCandle();
    setIsLoading(false);
  }, [params.id]);
  //console.log(priceData)
  //console.log(volumeData)

  const ohlc = []
  if (priceData) {
    for(let i = 0; i < priceData.length; i++) {
      ohlc.push([
        priceData[i][0], // the date
        priceData[i][1], // open
        priceData[i][2], // high
        priceData[i][3], // low
        priceData[i][4] // close
      ]);
    }
  }
// console.log(ohlc)
  
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
        name: "AAPL Up",
        data: priceData,
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