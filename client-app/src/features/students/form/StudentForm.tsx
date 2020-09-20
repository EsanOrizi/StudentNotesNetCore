import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IStudent } from '../../../app/models/student';
import { v4 as uuid } from 'uuid';
import StudentStore from '../../../app/stores/mobxStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParams {
  id: string;
}

const StudentForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
  const studentStore = useContext(StudentStore);
  const {
    createStudent,
    editStudent,
    submitting,
    student: initializeFormState,
    loadStudent,
    clearStudent,
  } = studentStore;

  const [student, setStudent] = useState<IStudent>({
    id: '',
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (match.params.id && student.id.length === 0) {
      loadStudent(match.params.id).then(() => initializeFormState && setStudent(initializeFormState));
    }
    return () => {
      clearStudent();
    };
  }, [loadStudent, clearStudent, match.params.id, initializeFormState, student.id.length]);

  const handleSubmit = () => {
    if (student.id.length === 0) {
      let newStudent = {
        ...student,
        id: uuid(),
      };
      createStudent(newStudent).then(() => history.push(`/students/${newStudent.id}`));
    } else {
      editStudent(student).then(() => history.push(`/students/${student.id}`));
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
        <Button onClick={() => history.push('/students')} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(StudentForm);
