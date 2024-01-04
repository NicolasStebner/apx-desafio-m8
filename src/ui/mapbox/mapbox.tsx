import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Control } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import css from "./mapbox.css"

mapboxgl.accessToken = 'pk.eyJ1Ijoibmloby1kZXYyMDIzIiwiYSI6ImNsa3F4aDJmdjFwcHEzb255MWZ1enZxbHkifQ.tMBEilBbPSw1T7_F76F-bg';

function Mapbox(props){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(props.coordenadas?.lng || -58.38);
  const [lat, setLat] = useState(props.coordenadas?.lat || -34.60);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
  if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      props.somethingChange({
        lng: map.current.getCenter().lng.toFixed(4),
        lat: map.current.getCenter().lat.toFixed(4)
      })
    });
  },[]);

  return <>
            <div ref={mapContainer} className={css.map_container}>
              {/* <div className={css.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
              </div> */}
            </div>
        </>
}

export {Mapbox}