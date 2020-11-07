import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { RootReducer } from '../../../../interfaces/redux';
import { coordinatesData } from '../../../../interfaces/orderPage';
import { getLocation, getAddress } from '../../../../server/geocodeLocation';
import './style.scss';

export const Map: React.FunctionComponent<any> = ({ setPionts }) => {
  const userCity: string = useSelector(
    (state: RootReducer) => state.information.userCity
  );

  const [userCoordsData, setUserCoordsData] = useState<coordinatesData>({
    latitude: 0,
    longtitude: 0,
    zoom: 11,
  });

  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (userCity) {
      getLocation(userCity).then((data) => {
        const [long, lat] = data.features[0].center;
        setUserCoordsData({
          ...userCoordsData,
          latitude: lat,
          longtitude: long,
        });
      });
    }
  }, [userCity]);

  useEffect(() => {
    if (userCity && map) {
      getAddress(userCity).then((data) => {
        const { features } = data;
        setPionts([]);
        features.forEach((address) => {
          const { center, place_name } = address;
          setPionts((prev) => [...prev, place_name]);
          new mapboxgl.Marker().setLngLat(center).addTo(map);
        });
      });
    }
  }, [userCity, map]);

  useEffect(() => {
    if (userCoordsData.latitude) {
      mapboxgl.accessToken = process.env.REACT_APP_MAP;

      const initMap = (
        setMap: React.Dispatch<React.SetStateAction<any>>,
        mapContainer: React.RefObject<HTMLDivElement>
      ) => {
        if (!mapContainer.current) {
          return null;
        }
        const { latitude, longtitude, zoom } = userCoordsData;

        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/outdoors-v11',
          center: [longtitude, latitude],
          zoom,
        });

        setMap(map);
      };
      if (!map) {
        initMap(setMap, mapContainer);
      }
    }
  }, [map, userCoordsData]);

  useEffect(() => {
    if (map !== null) {
      map.flyTo({
        center: [userCoordsData.longtitude, userCoordsData.latitude],
        essential: true,
      });
    }
  }, [userCoordsData]);

  return (
    <>
      <span>Выбрать на карте</span>
      <div ref={mapContainer} className="mapContainer" />
    </>
  );
};
