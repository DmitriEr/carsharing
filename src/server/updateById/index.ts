import { headerCommon, urlCommon } from '../../constants/server';
import { Data } from '../../interfaces';

export const updateById = async (
  id: string,
  value,
  path: string
): Promise<Data> => {
  try {
    const url = `${urlCommon}${path}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...headerCommon,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(value),
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
