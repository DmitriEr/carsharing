const urlCommon =
  'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
const headerCommon = {
  'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
  'Content-Type': 'application/json',
};

export const getOrderById: (
  id: string
) => Promise<{
  data: {
    carId: { name: string; number: string; thumbnail: { path: string } };
    cityId: { name: string };
    color: string;
    isFullTank: boolean;
    isNeedChildChair: boolean;
    isRightWheel: boolean;
    pointId: { address: string };
    price: number;
    dateFrom: number;
    dateTo: number;
    rateId: { rateTypeId: { name: string } };
  };
}> = async (id) => {
  try {
    const url = `${urlCommon}order/${id}`;
    const response = await fetch(url, {
      headers: headerCommon,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getOrderById: ${error.message}`);
  }
};
