import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchResults(props) {


  let tickersList = props.tickers? props.tickers.map((ticker,index) => {
      return (
          <div key={index}>
            <Link to={`/symbols/${ticker['1. symbol']}`} ><p>{ticker['1. symbol']}</p></Link>
            <p style={{color: "grey"}}>{ticker['2. name']}</p>
          </div>
        )
      }) : []; 

  return (
    <div className="ml-4 border border-5" style={{position: 'absolute', zIndex: '2', backgroundColor: 'white'}}>
          {props.tickers && (props.tickers.length !== 0) ? (
            <>
              {tickersList}
            </>
            ) : 
            (
              <>
              </>
            )}
    </div>
  )
}

