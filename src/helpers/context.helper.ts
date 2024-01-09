import jwt from "jsonwebtoken";

type DecodedToken = {
  userId?: string;
};

export const getUser = async (token: string): Promise<string | null> => {
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY) as DecodedToken;
      if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
      }
    }
    return null;
  } catch (error) {
    console.error('Error in token verification:', error);
    return null;
  }
};

export const verifyAccessToken = (token: string): string | null => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY) as DecodedToken;
    return decodedToken.userId || null;
  } catch (error) {
    console.error('Error in access token verification:', error);
    return null;
  }
};
