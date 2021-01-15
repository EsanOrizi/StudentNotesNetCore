import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IStudent } from '../models/student';
import { INote } from '../models/note';
import agent from '../api/agent';
import { history } from '../..';
import { RootStore } from './rootStore';


export default class MobxStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable studentRegistry = new Map();
  @observable noteRegistry = new Map();
  @observable student: IStudent | null = null;
  @observable note: INote | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  testArray: any = [];

  

  @computed get studentArrayFromMap() {
    return Array.from(this.studentRegistry.values());
  }

  @computed get noteArrayFromMap() {
    return Array.from(this.noteRegistry.values());
  }

  @action filterNotes = (id: string) => {
    var filteredNotes = this.noteArrayFromMap.filter((i) => i.studentId === id);
    return filteredNotes;
  };

  @action loadStudents = async () => {
    this.loadingInitial = true;
    try {
      const students = await agent.Students.list();
      runInAction('Loading Students', () => {
        students.forEach((student) => {
          this.studentRegistry.set(student.id, student);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('Load students error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadNotes = async () => {
    this.loadingInitial = true;
    try {
      const notes = await agent.Notes.list();
      runInAction('Loading Students', () => {
        notes.forEach((note) => {
          this.noteRegistry.set(note.id, note);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('Load notess error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadStudent = async (id: string) => {
    let student = this.getStudent(id);
    if (student) {
      this.student = student;
      return student;
    } else {
      this.loadingInitial = true;
      try {
        student = await agent.Students.details(id);
        runInAction(() => {
          this.student = student;
          this.studentRegistry.set(student.id, student);
          this.loadingInitial = false;
        });
        return student;

      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        console.log(error);
       }
    }
  };

  @action loadNote = async (id: string) => {
    let note = this.getNote(id);
    if (note) {
      this.note = note;
      return note;
    } else {
      this.loadingInitial = true;
      try {
        note = await agent.Notes.details(id);
        runInAction(() => {
          this.note = note;
          this.noteRegistry.set(note.id, note)
          this.loadingInitial = false;
        });
        return note;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getStudent = (id: string) => {
    return this.studentRegistry.get(id);
  };

  getNote = (id: string) => {
    return this.noteRegistry.get(id);
  };

  @action createStudent = async (student: IStudent) => {
    this.submitting = true;
    try {
      await agent.Students.create(student);
      runInAction(() => {
        this.studentRegistry.set(student.id, student);
        this.submitting = false;
      });
      history.push(`/students/${student.id}`)
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action createNote = async (note: INote) => {
    this.submitting = true;
    try {
      await agent.Notes.create(note);
      runInAction(() => {
        this.noteRegistry.set(note.id, note);
        this.submitting = false;
      });
      history.push(`/notes/${note.id}`)

    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action editStudent = async (student: IStudent) => {
    this.submitting = true;
    try {
      await agent.Students.update(student);
      runInAction(() => {
        this.studentRegistry.set(student.id, student);
        this.student = student;
        this.submitting = false;
      });
     history.push(`/students/${student.id}`)
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editNote = async (note: INote) => {
    this.submitting = true;
    try {
      await agent.Notes.update(note);
      runInAction(() => {
        this.noteRegistry.set(note.id, note);
        this.note = note;
        this.submitting = false;
      });
      history.push(`/notes/${note.id}`)

    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteStudent = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Students.delete(id);
      runInAction(() => {
        this.studentRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });

      console.log(error);
    }
  };

  @action deleteNote = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Notes.delete(id);
      runInAction(() => {
        this.noteRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });

      console.log(error);
    }
  };

  @action clearStudent = () => {
    this.student = null;
  };

  @action clearNote = () => {
    this.note = null;
  };
}

