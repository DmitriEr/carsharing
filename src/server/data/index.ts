export const getCars = async () => {
  try {
    const url = 'http://api-factory.simbirsoft1.com/api/db/car';
    const response = await fetch(url, {
      headers: {
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      },
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

export const getCities = async () => {
  try {
    const url = 'http://api-factory.simbirsoft1.com/api/db/city';
    const response = await fetch(url, {
      headers: {
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      },
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

export const getPoints = async () => {
  try {
    const url = 'http://api-factory.simbirsoft1.com/api/db/point';
    const response = await fetch(url, {
      headers: {
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      },
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
