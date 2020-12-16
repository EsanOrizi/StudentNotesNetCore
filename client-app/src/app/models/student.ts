export interface IStudent {
  id: string;
  name: string;
  address: string;
  phone: string;
}



export class StudentFormValues implements IStudent {
  id: string = '';
  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(init?: IStudent) {
    Object.assign(this, init);
  }
  
}