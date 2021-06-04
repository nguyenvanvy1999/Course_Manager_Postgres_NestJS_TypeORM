export type JwtConfig = {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
};
