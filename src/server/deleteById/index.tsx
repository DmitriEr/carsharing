import { headerCommon, urlCommon } from '../../constants/server';
import { Data } from '../../interfaces';

export const deleteById = async (id: string, path: string): Promise<Data> => {
  try {
    const url = `${urlCommon}${path}/${id}`;
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
    throw new Error(`Error: ${error.message}`);
  }
};
