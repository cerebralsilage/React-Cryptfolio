import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Highcharts, { getRendererType } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './candlestick.css';


export const CandleStickChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(30);
  const [volTime, setVolTime] = useState(30)

  const params = useParams();

  useEffect(() => {
    const fetchCandle = async () => {
      setIsLoading(true);
      const response = await Axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=${time}`
      );
      setPriceData(response.data)
    }
    const fetchVolume = async () => {
      const response2 = await Axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${volTime}`
      );
      setVolumeData(response2.data)
      setIsLoading(false)
    }
    fetchCandle()
    fetchVolume()
  }, [time, volTime]);
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

// return only volume data from fetch
  const reducedVolumeData = volumeData.total_volumes;
  //console.log(reducedVolumeData)

// seperate volume data to color column chart
  const lessVol = [];
  const plusVol = [];

  const seperateVolumes = () => {
    if (reducedVolumeData) {
      const arr1 = reducedVolumeData.map(data => {
        return data[1]
      })
      const arr2 = reducedVolumeData.map(data => {
        return data[1]
      })
      arr2.shift()

      for (let i = 0; i < reducedVolumeData.length; i++) {
        if (arr2[i] < arr1[i]) {
        plusVol.push(reducedVolumeData[i]);
        } else if (arr2[i] > arr1[i]) {
          lessVol.push(reducedVolumeData[i])
        } else {
          plusVol.push(reducedVolumeData[i])
        }
      }
    }
  }
  seperateVolumes();

  
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
    rangeSelector: {
      inputBoxWidth: '55px',
      selected: 1,
      buttons: [{
        type: 'day',
        count: 1,
        text: '1d',
        event: {
          click:
          function() {
            // The Endpoint URL
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=1`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }, {
        type: 'day',
        count: 7,
        text: '7d',
        event: {
          click:
          function() {
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=7`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }, {
        type: 'month',
        count: 1,
        text: '1m',
        event: {
          click:
          function() {
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=30`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }, {
        type: 'month',
        count: 6,
        text: '6m',
        event: {
          click:
          function() {
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=180`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }, {
        type: 'year',
        count: 1,
        text: '1y',
        event: {
          click:
          function() {
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=365`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }, {
        type: 'all',
        text: 'All',
        event: {
          click:
          function() {
            let url = `https://api.coingecko.com/api/v3/coins/${params.id}/ohlc?vs_currency=usd&days=max`;
            fetch(url)
              .then(function(response) {
                // Render the Response Status
                document.getElementById('result').innerHTML = response.status;
                // Parse the body as JSON
                return response.json();
              })
              .then(function(json) {
                // Render the parsed body
                document.getElementById('result_json').innerHTML = JSON.stringify(json);
              })
          }
        }
      }]
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        height: "60%",
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
      {
        type: "column",
        name: "Volume Up",
        data: plusVol,
        color: 'green',
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      },
      {
        type: "column",
        name: "Volume Down",
        data: lessVol,
        color: 'red',
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      }
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
            <p>Response Status :</p>
            <div id="result">
            </div>
            <p>JSON Object :</p>
            <div id="result_json">
            </div>
          </div>
        }
      </div>
    )
}
