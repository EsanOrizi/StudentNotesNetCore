import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IStudent } from '../models/student';
import NavBar from '../../features/nav/NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectStudent = (id: string) => {
    setSelectedStudent(students.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedStudent(null);
    setEditMode(true);
  };

  const handleCreateStudent = (student: IStudent) => {
    setSubmitting(true);
    agent.Students.create(student)
      .then(() => {
        setStudents([...students, student]);
        setSelectedStudent(student);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditStudent = (student: IStudent) => {
    setSubmitting(true);
    agent.Students.update(student)
      .then(() => {
        setStudents([...students.filter((a) => a.id !== student.id), student]);
        setSelectedStudent(student);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteStudent = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Students.delete(id)
      .then(() => {
        setStudents([...students.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Students.list()
      .then((response) => {
        let students: IStudent[] = [];
        response.forEach((student) => {
          students.push(student);
        });
        setStudents(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading students..." />;

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <StudentDashboard
          students={students}
          selectStudent={handleSelectStudent}
          selectedStudent={selectedStudent}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedStudent={setSelectedStudent}
          createStudent={handleCreateStudent}
          editStudent={handleEditStudent}
          deleteStudent={handleDeleteStudent}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};
export default App;
