export const herokuapp = 'http://api-factory.simbirsoft1.com/';
// 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/';

export const urlCommon = `${herokuapp}api/db/`;

export const urlAuth = `${herokuapp}api/auth/`;

export const headerCommon = {
  'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
