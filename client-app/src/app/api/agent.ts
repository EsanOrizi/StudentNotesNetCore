import axios, { AxiosResponse } from 'axios';
import { IStudent } from '../models/student';
import { INote } from '../models/note';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
  if(error.message === 'Network Error' && !error.response) {
    toast.error('Network error - Make sure API is running!')
  }
  const {status, data, config} = error.response;
  if(status === 404) {
    history.push('/notfound');
  }
  if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
  {
    history.push('/notfound');
  }
  if (status === 500){
    toast.error('Server Error - Check terminal for more info!')
  }
})

const responseBody = (Response: AxiosResponse) => Response.data;

const sleep = (ms: number) => (Response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(Response), ms));

const requests = {
  get: (url: string) => axios.get(url).then(sleep(250)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(250)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(250)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(250)).then(responseBody),
};

const Students = {
  list: (): Promise<IStudent[]> => requests.get('/students'),
  details: (id: string) => requests.get(`/students/${id}`),
  create: (student: IStudent) => requests.post(`/students`, student),
  update: (student: IStudent) => requests.put(`/students/${student.id}`, student),
  delete: (id: string) => requests.del(`/students/${id}`),
};

const Notes = {
  list: (): Promise<INote[]> => requests.get('/notes'),
  details: (id: string) => requests.get(`/notes/${id}`),
  create: (note: INote) => requests.post(`/notes`, note),
  update: (note: INote) => requests.put(`/notes/${note.id}`, note),
  delete: (id: string) => requests.del(`/notes/${id}`),
};

export default {
  Students,
  Notes,
};
