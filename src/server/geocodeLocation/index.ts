const link = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

export const getLocation: (city: string) => Promise<any> = async (
  city: string
) => {
  try {
    const url = `${link}${city}.json?types=place&access_token=${process.env.REACT_APP_MAP}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTPS ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in mapbox.com - ${error.message}`);
  }
};
