import 'dotenv/config';

export const getIds = (arrayOfUrls: string[]) =>
  arrayOfUrls.map((x, i) => i + 1);
