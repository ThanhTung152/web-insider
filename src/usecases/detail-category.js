import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

export const FetchDetailCategoriesOverview = (url, params) =>
  apiClient.get(`api/${url}`, params);
