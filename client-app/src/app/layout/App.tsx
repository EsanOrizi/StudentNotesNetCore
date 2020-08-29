import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IStudent } from '../models/student';
import NavBar from '../../features/nav/NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';

const App = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectStudent = (id: string) => {
    setSelectedStudent(students.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedStudent(null);
    setEditMode(true);
  };

  const handleCreateStudent = (student: IStudent) => {
    setStudents([...students, student]);
    setSelectedStudent(student);
    setEditMode(false);
  };

  const handleEditStudent = (student: IStudent) => {
    setStudents([...students.filter((a) => a.id !== student.id), student]);
    setSelectedStudent(student);
    setEditMode(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents([...students.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IStudent[]>('http://localhost:5000/api/students')
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

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
        />
      </Container>
    </Fragment>
  );
};
export default App;
