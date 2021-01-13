import { urlAuth, headerCommon } from '../../constants/server';
import { random } from '../../helper';

interface UserLogin {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
}

export const loginUser = async (
  path: string,
  user: { username: string; password: string }
): Promise<UserLogin> => {
  const url = `${urlAuth}${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headerCommon,
      Authorization: `Basic ${btoa(`${random()}:4cbcea96de`)}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    return;
  }

  return response.json();
};
