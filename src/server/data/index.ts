import { urlCommon, headerCommon } from '../../constants/server';
import { Data } from '../../interfaces';

export const getData = async (
  path: string,
  page = 0,
  limit = 50
): Promise<Data> => {
  try {
    const url = `${urlCommon}${path}?page=${page}&limit=${limit}`;
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

export const getOrders = async (path: string, page = 0): Promise<Data> => {
  try {
    const url = `${urlCommon}${path}?page=${page}&limit=1`;
    const response = await fetch(url, {
      headers: {
        ...headerCommon,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
