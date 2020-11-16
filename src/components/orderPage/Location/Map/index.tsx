import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { RootReducer } from '../../../../interfaces';
import { getCoordinates } from '../../../../server/geocodeLocation';
import './style.scss';

export const Map: React.FunctionComponent<{ points: string[] }> = ({
  points,
}) => {
  const info = (state: RootReducer) => state.information;
  const place = (state: RootReducer) => state.order.orderList;
  const userData = useSelector(info);
  const userPoint = useSelector(place);

  const [dataBase, setDataBase] = useState<string[]>([]);

  const [userCoordsData, setUserCoordsData] = useState<{ [x: string]: number }>(
    {
      latitude: 0,
      longtitude: 0,
      zoom: 10,
    }
  );
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);

  const { userCity } = userData;
  const { value } = userPoint[0];

  useEffect(() => {
    if (userCity || value.length) {
      getCoordinates(`${userCity} ${value}`).then(({ results }) => {
        let lat;
        let lng;
        if (value.length === 0) {
          const cityList = results.filter((item) => {
            if (item.components._type === 'city') {
              return true;
            }
          });
          const [{ geometry }] = cityList;
          lng = geometry.lng;
          lat = geometry.lat;
        } else {
          const [{ geometry }] = results;
          lng = geometry.lng;
          lat = geometry.lat;
        }
        setUserCoordsData({
          latitude: lat,
          longtitude: lng,
          zoom: value.length ? 15 : 10,
        });
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
