import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import StudentList from './StudentList';
import StudentDetails from '../details/StudentDetails';
import StudentForm from '../form/StudentForm';
import { observer } from 'mobx-react-lite';
import StudentStore from '../../../app/stores/studentStore';

const StudentDashboard: React.FC = () => {
  const studentStore = useContext(StudentStore);
  const { editMode, selectedStudent } = studentStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <StudentList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedStudent && !editMode && <StudentDetails />}
        {editMode && <StudentForm key={(selectedStudent && selectedStudent.id) || 0} student={selectedStudent!} />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(StudentDashboard);
