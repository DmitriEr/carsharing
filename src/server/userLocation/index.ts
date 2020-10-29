import { TypeUserLocation } from './interface';

const link = 'https://ipinfo.io';

export const getUserLocation: () => Promise<TypeUserLocation> = async () => {
  try {
    const url = `${link}?token=${process.env.REACT_APP_LOCATION}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTPS ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in ipinfo - ${error.message}`);
  }
};
