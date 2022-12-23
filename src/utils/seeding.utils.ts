import 'dotenv/config';

export const getIds = (arrayOfUrls: string[]) =>
  arrayOfUrls.map((x) => x.split('/')[5]);
