import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StarRating from './StarRating.jsx';
import Appv2 from './App-v2';


function Test(){
  const [movieRating, setMovieRating] = useState(0);

  return(
    <div>
      <StarRating maxRating={10} onSetRating={setMovieRating}/>
      <p>This movie was rated {movieRating} stars</p>  
    </div>
  )
}

{/*
      <StarRating maxRating={5} 
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}/>
    <StarRating size={20} color={"red"} className='test' defaultRating={2} />
    <StarRating 
      maxRating={10} 
      defaultRating={3}/> 
    <Test />
  */}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appv2 /> 
  </React.StrictMode>
);


reportWebVitals();
