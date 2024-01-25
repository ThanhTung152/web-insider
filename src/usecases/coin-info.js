import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const prefix = 'api/';

export const FetchFundraisings = (params) =>
  apiClient.get(prefix + 'fundraisings', params);

export const FetchMarkets = (params) =>
  apiClient.get(prefix + 'markets', params);

export const FetchOverviews = (params) =>
  apiClient.get(prefix + 'overviews', params);

export const FetchProfiles = (params) =>
  apiClient.get(prefix + 'profiles', params);

export const FetchSocials = (params) =>
  apiClient.get(prefix + 'socials', params);

export const FetchSumaries = (params) =>
  apiClient.get(prefix + 'sumaries', params);

export const FetchTokenomics = (params) =>
  apiClient.get(prefix + 'tokenomics', params);

export const FetchUnlocks = (params) =>
  apiClient.get(prefix + 'unlocks', params);

export const FetchUpComings = (params) =>
  apiClient.get(prefix + 'upcomings', params);

export const FetchCoinDetail = (params) => apiClient.get(`${prefix}coin/detail`, params);

export const FetchHistoricals = (params) =>
  apiClient.get(`${prefix}market/historicals`, params);

export const FetchSpot = (params) =>
  apiClient.get(`${prefix}market/spots`, params);

export const FetchUnlockToken = (params) =>
  apiClient.get(`${prefix}coin-unlock`, params);

export const FetchCoinTokenomics = (params) =>
  apiClient.get(`${prefix}coin-tokenomic`, params);

export const FetchCoinFundraising = (params) =>
  apiClient.get(`${prefix}coin-fundraising`, params);

export const FetchCoinIDOIEO = (params) =>
  apiClient.get(`${prefix}coin-ieoido`, params);

  export const FetchSearchExchange = (params) =>
  apiClient.get(`${prefix}/market/spot/search`, params);






