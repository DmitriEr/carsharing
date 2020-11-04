import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getUserLocation } from '../../../../server/userLocation';
import { TypeUserLocation } from '../../../../server/userLocation/interface';
import { coordinatesData } from '../../../../interfaces/orderPage';
import { getLocation } from '../../../../server/geocodeLocation';
import './style.scss';

export const Map: React.FunctionComponent = () => {
  const [userCoordsData, setUserCoordsData] = useState<coordinatesData>({
    latitude: 0,
    longitude: 0,
    zoom: 11,
  });
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  getLocation('Moscow').then((data) => console.log(data));

  useEffect(() => {
    getUserLocation().then((location: TypeUserLocation) => {
      const dataCoords: string[] = location.loc.split(',');
      const [lat, long] = dataCoords;
      setUserCoordsData({
        ...userCoordsData,
        latitude: Number(lat),
        longitude: Number(long),
      });
    });
  }, []);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG1pdHJpZXIiLCJhIjoiY2thaTZmNzFxMG40cjMwbzBnc3B2aHowOSJ9.q40lHO4-30difBBHLsTIyQ';

  const initMap = (
    setMap: React.Dispatch<React.SetStateAction<any>>,
    mapContainer: React.RefObject<HTMLDivElement>
  ) => {
    if (!mapContainer.current) {
      return null;
    }

    const { latitude, longitude, zoom } = userCoordsData;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [longitude, latitude],
      zoom,
    });

    setMap(map);
  };

  !map && initMap(setMap, mapContainer);

  return <div ref={mapContainer} className="mapContainer" />;
};
