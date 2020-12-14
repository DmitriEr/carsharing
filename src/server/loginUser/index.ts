import { urlAuth, headerCommon } from '../../constants/server';

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
): Promise<UserLogin | boolean> => {
  const url = `${urlAuth}${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headerCommon,
      Authorization: `Basic ${btoa('11d7c9f:4cbcea96de')}`,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    return false;
  }

  return true;
};
