import { HTTPResponseCoords } from '../../interfaces/redux';

export const getCoordinates: (
  placeName: string
) => Promise<HTTPResponseCoords> = async (placeName: string) => {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=${process.env.REACT_APP_OPENCAGEDATA}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTPS ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in geocode - ${error.message}`);
  }
};
