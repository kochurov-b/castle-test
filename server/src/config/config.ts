type Config = {
  port: string | number;
  mongoUri: string;
};

export const config: Config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
};
