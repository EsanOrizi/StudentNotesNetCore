import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IStudent } from '../../../app/models/student';
import { v4 as uuid } from 'uuid';
import StudentStore from '../../../app/stores/studentStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  student: IStudent;
}

const StudentForm: React.FC<IProps> = ({ student: initializeFormState }) => {
  const studentStore = useContext(StudentStore);
  const { createStudent, editStudent, submitting, cancelFormOpen } = studentStore;
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

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setStudent({ ...student, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input onChange={handleInputChange} name="name" placeholder="Name" value={student.name} />
        <Form.Input onChange={handleInputChange} name="address" placeholder="Address" value={student.address} />
        <Form.Input onChange={handleInputChange} name="phone" placeholder="Phone" value={student.phone} />
        <Button loading={submitting} floated="right" positive type="submit" content="submit" />
        <Button onClick={cancelFormOpen} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(StudentForm);
