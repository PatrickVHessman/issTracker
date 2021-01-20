
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import token from './token';
import 'mapbox-gl/dist/mapbox-gl.css';
import icon from './space-station.png'
import { Button, Paper } from '@material-ui/core';

function App() {
  let mapSize;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        mapSize = 300;
    }
    else {
      mapSize = 600;
    }

  const style = {margin: "20px auto"}

  const [timestamp, setTimestamp] = useState();
  const [latitude, setLatitude] = useState(28.1999992);
  const [longitude, setLongitude] = useState(-177.3499986);

  const [viewport, setViewport] = useState({
    width: mapSize,
    height:400,
    latitude: 28.1999992,
    longitude: -177.3499986,
    zoom: 8
  });

  const apiCall = () => {
    axios.get('http://api.open-notify.org/iss-now.json')
      .then(res => {
        const newLat = parseFloat(res.data.iss_position.latitude);
        const newLong = parseFloat(res.data.iss_position.longitude);
        const newTime = new Date(res.data.timestamp * 1000).toString();
        setViewport({
    width: mapSize,
    height: 400,
    latitude: newLat,
    longitude: newLong,
    zoom: 2
  })
  setLatitude(newLat);
        setLongitude(newLong);
        setTimestamp(newTime);
        console.log(res.data.timestamp);
      })
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="App">
      <Paper variant="outlined" className="mainCard">
      <h1>International Space Station Tracker</h1>
      <h4>Powered by Open Notify's International <a href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/" target="_blank"
        rel="noopener noreferrer">Space Station Current Location API</a> and React</h4>
      <p>Updated: {timestamp}</p>
      <p>Latitude: {latitude} | Longitude: {longitude}</p>
      <Button onClick={() => apiCall()} color="primary" variant="contained">Update Map</Button>
      <div style={{margin: "auto", display: "block"}}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => setViewport(viewport)}
        style={style}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
      >
        <div style={{position: 'absolute', right: '2px', top: "2px"}}>
          
          <NavigationControl />
        </div>
        <Marker latitude={latitude} longitude={longitude}>
          <img src={icon} alt="International Space Station Tracker" />
        </Marker>
        
        </ReactMapGL>
      </div>
      </Paper>
        <footer className="bg-dark">
      Icon made by <a href="https://www.freepik.com" title="Freepik" target="_blank"
        rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank"
        rel="noopener noreferrer">www.flaticon.com</a> | Created by{" "}
      <a
        href="http://patrickvhessman.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Patrick Hessman
      </a>{" "}
      |{" "}
      <a
        href="https://github.com/PatrickVHessman/issTracker"
        target="_blank"
        rel="noopener noreferrer"
      >
        View source
      </a>
    </footer>
        
        
    </div>
  );
}

export default App;
