import { urlAuth, headerCommon } from '../../constants/server';

interface UserRegister {
  id: string;
  password: string;
  username: string;
}

export const registerUser = async (
  path: string,
  user: { username: string; password: string }
): Promise<UserRegister> => {
  try {
    const url = `${urlAuth}${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: headerCommon,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in registerUser path ${path}: ${error.message}`);
  }
};
