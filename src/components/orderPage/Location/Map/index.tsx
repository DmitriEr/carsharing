import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { RootReducer } from '../../../../interfaces/redux';
import { coordinatesData } from '../../../../interfaces/orderPage';
import { getCoordinates } from '../../../../server/geocodeLocation';
import { PointsProps } from '../../../../interfaces/orderPage';
import './style.scss';

export const Map: React.FunctionComponent<PointsProps> = ({ points }) => {
  const userData = useSelector((state: RootReducer) => state.information);
  const { userCity } = userData;

  const [userCoordsData, setUserCoordsData] = useState<coordinatesData>({
    latitude: 0,
    longtitude: 0,
    zoom: 10,
  });

  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (userCity) {
      getCoordinates(userCity).then(({ results }) => {
        const [{ geometry }] = results;
        const { lat, lng } = geometry;
        setUserCoordsData({
          ...userCoordsData,
          latitude: lat,
          longtitude: lng,
        });
      });
    }
  }, [userCity]);

  useEffect(() => {
    if (userCity && map && points) {
      points.forEach((address) => {
        getCoordinates(`${userCity}, ${address}`).then(({ results }) => {
          if (results.length) {
            const { geometry } = results[0];
            const { lat, lng } = geometry;
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          }
        });
      });
    }
  }, [userCity, map, points]);

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

  return <div ref={mapContainer} className="mapContainer" />;
};
