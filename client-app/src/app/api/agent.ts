import axios, { AxiosResponse } from 'axios';
import { IStudent } from '../models/student';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (Response: AxiosResponse) => Response.data;

const sleep = (ms: number) => (Response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(Response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Students = {
  list: (): Promise<IStudent[]> => requests.get('/students'),
  details: (id: string) => requests.get(`/students/${id}`),
  create: (activity: IStudent) => requests.post(`/students`, activity),
  update: (activity: IStudent) =>
    requests.put(`/students/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/students/${id}`),
};

export default {
  Students,
};
