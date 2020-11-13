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
  const userPoint = useSelector((state: RootReducer) => state.order.orderList);
  const [dataBase, setDataBase] = useState<Array<string>>([
    'Нариманова 1, корп.2',
  ]);
  const [userCoordsData, setUserCoordsData] = useState<coordinatesData>({
    latitude: 0,
    longtitude: 0,
    zoom: 10,
  });
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  const { userCity } = userData;
  const { value } = userPoint[0];

  useEffect(() => {
    if (value.length) {
      getCoordinates(`${userCity}, ${value}`).then(({ results }) => {
        const [{ geometry }] = results;
        const { lat, lng } = geometry;
        setUserCoordsData({
          latitude: lat,
          longtitude: lng,
          zoom: 15,
        });
      });
    } else if (userCity) {
      getCoordinates(userCity).then(({ results }) => {
        if (userCity === 'Ульяновск') {
          setUserCoordsData({
            latitude: 54.3,
            longtitude: 48.3,
            zoom: 10,
          });
        } else {
          const [{ geometry }] = results;
          const { lat, lng } = geometry;
          setUserCoordsData({
            latitude: lat,
            longtitude: lng,
            zoom: 10,
          });
        }
      });
    }
  }, [userCity, value]);

  useEffect(() => {
    if (userCity && map && points) {
      points.forEach((address) => {
        if (!dataBase.includes(address)) {
          setDataBase((prev) => [...prev, address]);
          getCoordinates(`${userCity}, ${address}`).then(({ results }) => {
            if (results.length) {
              const { geometry } = results[0];
              const { lat, lng } = geometry;
              new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
            }
          });
        }
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
          bearing: 0,
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
        zoom: userCoordsData.zoom,
      });
    }
  }, [userCoordsData]);

  return <div ref={mapContainer} className="mapContainer" />;
};
