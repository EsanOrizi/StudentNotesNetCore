import React from "react";
import { Grid } from "semantic-ui-react";
import { IStudent } from "../../../app/models/student";
import StudentList from "./StudentList";
import StudentDetails from "../details/StudentDetails";
import StudentForm from "../form/StudentForm";

interface IProps {
  students: IStudent[];
  selectStudent: (id: number) => void;
  selectedStudent: IStudent | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedStudent: (student: IStudent | null) => void;
  createStudent: (student: IStudent) => void;
  editStudent: (student: IStudent) => void;
  deleteStudent: (id: number) => void;
}

const StudentDashboard: React.FC<IProps> = ({
  students,
  selectStudent,
  selectedStudent,
  editMode,
  setEditMode,
  setSelectedStudent,
  createStudent,
  editStudent,
  deleteStudent,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <StudentList
          students={students}
          selectStudent={selectStudent}
          deleteStudent={deleteStudent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedStudent && !editMode && (
          <StudentDetails
            student={selectedStudent}
            setEditMode={setEditMode}
            setSelectedStudent={setSelectedStudent}
          />
        )}
        {editMode && (
          <StudentForm
            key={(selectedStudent && selectedStudent.id) || 0}
            setEditMode={setEditMode}
            student={selectedStudent!}
            createStudent={createStudent}
            editStudent={editStudent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default StudentDashboard;
