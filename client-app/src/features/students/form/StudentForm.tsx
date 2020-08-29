import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IStudent } from '../../../app/models/student';
import { v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  student: IStudent;
  createStudent: (student: IStudent) => void;
  editStudent: (student: IStudent) => void;
}

const StudentForm: React.FC<IProps> = ({
  setEditMode,
  student: initializeFormState,
  createStudent,
  editStudent,
}) => {
  const initializeForm = () => {
    if (initializeFormState) {
      return initializeFormState;
    } else {
      return {
        id: '',
        name: '',
        address: '',
        phone: '',
      };
    }
  };

  const [student, setStudent] = useState<IStudent>(initializeForm);

  const handleSubmit = () => {
    if (student.id.length === 0) {
      let newStudent = {
        ...student,
        id: uuid(),
      };
      createStudent(newStudent);
    } else {
      editStudent(student);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setStudent({ ...student, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={student.name}
        />
        <Form.Input
          onChange={handleInputChange}
          name="address"
          placeholder="Address"
          value={student.address}
        />
        <Form.Input
          onChange={handleInputChange}
          name="phone"
          placeholder="Phone"
          value={student.phone}
        />
        <Button floated="right" positive type="submit" content="submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default StudentForm;
