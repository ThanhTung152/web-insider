import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();
const prefix = 'api/';

export const FetchFundraising = (path, params) =>
  apiClient.get(`${prefix + path}`, params);

export const FetchTopBacker = (params) => apiClient.get(topbackerUrl, params);

export const FetchUnlockDetail = (params) =>
  apiClient.get(`${prefix}/${params}`);

export const FundraisingSearch = (params) => {
  return apiClient.get('api/funding-rounds/search', params);
};

export const FetchDetailBanker = (params) =>
  apiClient.get(`${prefix}fundraisings/backer`, params);

export const FetchPortfollios = (params) =>
  apiClient.get(`${prefix}fundraising/backer/portfolios`, params);

export const FetchFunRound = (params) =>
  apiClient.get(`${prefix}fundraising/backer/funding-round`, params);

export const FetchSearchTopBanker = (params) => {
  return apiClient.get(`api/top-backers/search`, params);
};

export const FetchFilterFunc = (params) => {
  return apiClient.get(`api/backer/funding-round/search`, params);
};

export const FetchFilterPor = (params) => {
  return apiClient.get(`api/backer/portfolio/search`, params);
};
