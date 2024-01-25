import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const prefix = 'api/';

export const FetchCoins = (params) => {
  return apiClient.get(prefix + 'coins', params);
};

export const SearchCoinsFilter = (params) =>
  apiClient.get(prefix + `coins/search`, params);

export const SearchCategoriesFilter = (params) =>
  apiClient.get(prefix + 'categories/search', params);

export const SearchFundraisingsFilter = (params) =>
  apiClient.get(prefix + 'funding-rounds/search', params);

export const SearchUpcomingFilter = (params) =>
  apiClient.get(prefix + 'ieo-ido/upcoming/search', params);

export const FetchCategories = (params) =>
  apiClient.get(prefix + 'categories', params);

export const FetchTrendings = (params) =>
  apiClient.get(prefix + 'trendings', params);

export const FetchUpComings = (params) =>
  apiClient.get(prefix + 'ieo-ido', params);

export const FetchFundraisings = (params) =>
  apiClient.get(prefix + 'funding-rounds', params);

export const FetchGainers = (params) =>
  apiClient.get(prefix + 'gainers', params);

export const FetchLosers = (params) => apiClient.get(prefix + 'losers', params);
