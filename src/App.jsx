import React from "react";
import "./App.css";
import Arrow from "./images/icon-arrow.svg"
import { useState, useEffect } from "react";
import L from "leaflet"

const ipRegex = /^([0-9]{1,3}.){3}[0-9]{1,3}$/;

function App() {
const [ipAddress, setIpAddress] = useState('') 
const [location, setLocation] = useState('') 
const mapRef = React.useRef(null)

const BuscarIpInput = (e) => {
  try {
  setIpAddress(e.target.value);
  if (ipRegex.test(value) || value === "") {
    setIpAddress(value);
  }
} catch (error){
}
}

const enviarIp = () => {
  if (!ipRegex.test(ipAddress)) {
    alert("La dirección IP ingresada no es válida");
    return;
  }
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=at_rMcTAF9HrR0LrfibHxgAOH40uH2DS&ipAddress=${ipAddress}`;
  fetch (apiUrl)
  .then((response) => {
    response.clone().json().then((data) => {
      setLocation(data)
    console.log(location);
    })
  })
}

React.useEffect(() => {
  if (location && mapRef.current) {
    const { lat, lng } = location.location;
    const zoomLevel = 13;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: zoomLevel,
    });

    var container = L.DomUtil.get('map');
if(container != null){
container._leaflet_id = null;
}

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org/%22%3EOpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

  }
}, [location]
) ;



  return (
    <div className="App">
      <header>
        <h1>IP Address Tracker</h1>
        <label htmlFor="">
        <input value={ipAddress} onChange={BuscarIpInput} type="text" />
          <button onClick={enviarIp} type="submit"><img src={Arrow} alt="" /></button>
          </label>
          <div className="box">
            <div className="datos barra">
            <p>IP Address</p>
            <h2>{location ? location.ip:""}</h2>
            </div>
            <div className="datos barra">
            <p>Location</p>
            <h2>{location ? location.location.region:""}</h2>
            </div>
            <div className="datos barra">
            <p>Timezone</p>
            <h2>{location ? location.location.timezone:""}</h2>
            </div>
            <div className="datos">
            <p>ISP</p>
            <h2>{location ? location.isp:""}</h2>
            </div>
          </div>
      </header>
      <div id="map" ref={mapRef}></div>
    </div>
  );
}

export default App;
