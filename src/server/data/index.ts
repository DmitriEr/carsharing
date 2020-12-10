import { urlCommon, headerCommon } from '../../constants/server';

interface Data {
  data: {
    categoryId: { name: string };
    id: string;
    name: string;
    priceMin: number;
    priceMax: number;
    thumbnail: { path: string };
    colors: string[];
    number: string;
    price: number;
    rateTypeId: { unit: string; name: string };
    cityId: { name: string; id: string };
    address: string;
  }[];
}

export const getData = async (path: string): Promise<Data> => {
  try {
    const url = `${urlCommon}${path}`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getData path ${path}: ${error.message}`);
  }
};
