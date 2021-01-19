import { urlCommon, headerCommon } from '../../constants/server';
import { DataItem } from '../../interfaces';

export const getById: (
  path: string,
  id: string
) => Promise<{
  data: DataItem;
}> = async (path, id) => {
  try {
    const url = `${urlCommon}${path}/${id}`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getById: ${error.message}`);
  }
};
