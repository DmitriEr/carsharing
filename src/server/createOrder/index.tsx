import { urlCommon, headerCommon } from '../../constants/server';

export const createOrder = async (item) => {
  try {
    const response = await fetch(`${urlCommon}order`, {
      method: 'POST',
      headers: headerCommon,
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.text()}`);
    }

    const answer = await response.json();
    return answer;
  } catch (e) {
    throw new Error(`Error in createOrder: ${e}`);
  }
};
