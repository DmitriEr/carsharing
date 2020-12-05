// const url =
//   'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/order';
// const header = {
//   'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${btoa('intern:intern-S!')}`,
// };

export const createOrder = async (item) => {
  try {
    const response = await fetch(
      'http://api-factory.simbirsoft1.com/api/db/order',
      {
        method: 'POST',
        headers: {
          'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          'Authorization': '4cbcea96de',
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.text()}`);
    }

    const answer = await response.json();
    return answer;
  } catch (e) {
    throw new Error(`Error in createOrder: ${e}`);
  }
};

// export const getOrder = async () => {
//   try {
//     const response = await fetch(url, {
//       headers: header,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${response.text()}`);
//     }

//     const answer = await response.json();
//     return answer;
//   } catch (e) {
//     throw new Error(`Error in createOrder: ${e}`);
//   }
// };
