
import { authClient } from './auth-client';

const getTokenFromClient = async() => {
    const { data, error } = await authClient.token();
    if (error) {
      console.log(error);
    }

    const jwtToken = data?.token;
    return jwtToken
};

export default getTokenFromClient;