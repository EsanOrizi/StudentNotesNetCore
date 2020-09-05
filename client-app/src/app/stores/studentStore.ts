import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IStudent } from '../models/student';
import agent from '../api/agent';
//import 'mobx-react-lite/batchingOptOut';

configure({ enforceActions: 'always' });

class StudentStore {
  @observable studentRegistry = new Map();
  @observable students: IStudent[] = [];
  @observable selectedStudent: IStudent | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
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

  @action createStudent = async (student: IStudent) => {
    this.submitting = true;
    try {
      await agent.Students.create(student);
      runInAction(() => {
        this.studentRegistry.set(student.id, student);
        this.editMode = false;
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
        this.selectedStudent = student;
        this.editMode = false;
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedStudent = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedStudent = this.studentRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedStudent = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectStudent = (id: string) => {
    this.selectedStudent = this.studentRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new StudentStore());
