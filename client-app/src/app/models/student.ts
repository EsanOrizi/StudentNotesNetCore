export interface IStudent {
  id: string;
  name: string;
  address: string;
  phone: string;
  rate: number;
}

export class StudentFormValues implements IStudent {
  id: string = '';
  name: string = '';
  address: string = '';
  phone: string = '';
  rate: any = null;

  constructor(init?: IStudent) {
    Object.assign(this, init);
  }
}
