export interface INote {
  id: string;
  name: string;
  progressRating: string;
  extraNote: string;
  dateAdded: Date | null;
  studentId: string;
}

export class NoteFormValues implements INote {
  id: string = '';
  name: string = '';
  progressRating: string = '';
  extraNote: string = '';
  dateAdded: Date | null = new Date();
  studentId: string = '';

  constructor(init?: INote) {
    Object.assign(this, init);
  }
}
