declare global {
  namespace Express {
    interface Request {
      clientId: string;
      userToken: string;
    }
  }
}

export {};
