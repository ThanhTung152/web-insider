import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

export const FetchCategoryDetail = (params) =>
  apiClient.get(`api/category`, params);

export const FetchCategoryCoins = (params) =>
  apiClient.get(`api/coins`, params);

export const CategoryCoinsSearch = (params) =>
  apiClient.get(`api/categories/search`, params);
