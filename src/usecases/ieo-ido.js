import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

export const FetchIeoIdo = (path, params) =>
  apiClient.get(`api/${path}`, params);
export const FetchLaunchPadProjects = (params) =>
  apiClient.get(`api/launch-pad-projects`, params);

export const FetchIeoIdoUpcoming = (params) =>
  apiClient.get('api/ieo-ido', params);
export const FetchUnlockDetail = (params) =>
  apiClient.get(`api/ieo-ido/${params}`);
export const IeoIdoSearch = (params) =>
  apiClient.get('api/ieo-ido/search', params);
export const TopIdoLaunchPadSearch = (params) =>
  apiClient.get('api/ieo-ido/top-ido-launch-pad/search', params);
export const TopIdoLaunchPadDetail = (params) =>
  apiClient.get(`api/launch-pad-detail`, params);
