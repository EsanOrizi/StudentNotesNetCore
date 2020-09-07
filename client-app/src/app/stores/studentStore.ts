import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IStudent } from '../models/student';
import agent from '../api/agent';
//import 'mobx-react-lite/batchingOptOut';

configure({ enforceActions: 'always' });

class StudentStore {
  @observable studentRegistry = new Map();
  @observable student: IStudent | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get studentArrayFromMap() {
    return Array.from(this.studentRegistry.values());
  }

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

  @action loadStudent = async (id: string) => {
    let student = this.getStudent(id);
    if (student) {
      this.student = student;
    } else {
      this.loadingInitial = true;
      try {
        student = await agent.Students.details(id);
        runInAction(() => {
          this.student = student;
          this.loadingInitial = false;
        });
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

  @action createStudent = async (student: IStudent) => {
    this.submitting = true;
    try {
      await agent.Students.create(student);
      runInAction(() => {
        this.studentRegistry.set(student.id, student);
        this.submitting = false;
      });
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

  @action clearStudent = () => {
    this.student = null;
  };
}

export default createContext(new StudentStore());
