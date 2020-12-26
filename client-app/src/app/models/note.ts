export interface INote {
  id: string;
  name: string;
  progressRating: string;
  extraNote: string;
  dateAdded: string;
  studentId: string;
}



export class NoteFormValues implements INote {
  id: string = '';
  name: string = '';
  progressRating: string = '';
  extraNote: string = '';
  dateAdded: string = '';
  studentId: string = '';

  constructor(init?: INote) {
    Object.assign(this, init);
  }
}