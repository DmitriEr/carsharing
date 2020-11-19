const urlCommon =
  'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
const headerCommon = {
  'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
};

export const getCars: () => Promise<{
  data: {
    categoryId: { name: string };
    name: string;
    priceMin: number;
    priceMax: number;
    thumbnail: { path: string };
  }[];
}> = async () => {
  try {
    const url = `${urlCommon}car`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in database cars: ${error.message}`);
  }
};

export const getCities: () => Promise<{
  data: { name: string }[];
}> = async () => {
  try {
    const url = `${urlCommon}city`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in database cars: ${error.message}`);
  }
};

export const getPoints: () => Promise<{
  data: { cityId: { name: string }; address: string }[];
}> = async () => {
  try {
    const url = `${urlCommon}point`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in database cars: ${error.message}`);
  }
};
