import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
import axios from '../../api';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import instance from '../../api';
const MapContainer = () => {
  const [ selected, setSelected ] = useState({});
  const [items, setItems] = useState([]);
  
  async function fetchData(){
    const {
            data: { messages, message },
          } = await axios.post('/api/get-item')
    if (!messages) alert(message);
    else setItems(messages);
}


  const onSelect = item => {
      setSelected(item);
    }
  const locations = [
      {
        name: "Location 1",
        location: { 
          lat: 25.019096,
          lng: 121.546366
        },
      },
      {
        name: "Location 2",
        location: { 
          lat: 25.03876,
          lng: 121.521604
        },
      },
      {
        name: "Location 3",
        location: { 
          lat: 25.058547,
          lng: 121.563281
        },
      },
    ];
  

    useEffect(() => {
        fetchData()
        console.log(items)


    },[]);

const mapStyles = {        
  height: "100vh",
  width: "100%"};

const defaultCenter = {
  lat:25.014947, lng: 121.535549 
}

return (
   <LoadScript
     googleMapsApiKey='AIzaSyDlr3jj0FaxiAiqSzwSMwzKnPZwnrV3otE'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
      {
          items.map(item => {
              const lat=parseFloat(item.lat)
              const lng=parseFloat(item.log)
              item.location={lat:lat,lng:lng}
              console.log(item.location)
            return (
            <Marker key={item.name} position={item.location}
            onClick={() => onSelect(item)}/>
            )
          })
       }
       {
          selected.location && 
          (
            <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>商家名稱：{selected.traderName}<br/>商品：{selected.productName}<br/>數量：{selected.quantity}個<br/>特價：{selected.onSalePrice}元</p>
          </InfoWindow>
          )
       }
   </GoogleMap>
   </LoadScript>
)
}

export default MapContainer;

