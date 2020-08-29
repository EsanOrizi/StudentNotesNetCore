import React, { SyntheticEvent } from 'react';
import { Item, Button, Segment } from 'semantic-ui-react';
import { IStudent } from '../../../app/models/student';

interface IProps {
  students: IStudent[];
  selectStudent: (id: string) => void;
  deleteStudent: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const StudentList: React.FC<IProps> = ({ students, selectStudent, deleteStudent, submitting, target }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {students.map((student) => (
          <Item key={student.id}>
            <Item.Content>
              <Item.Header as="a">{student.name}</Item.Header>
              <Item.Meta></Item.Meta>
              <Item.Description>
                <div>{student.address}</div>
                <div>{student.phone}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectStudent(student.id)} floated="right" content="View" color="blue" />
                <Button
                  name={student.id}
                  loading={target === student.id && submitting}
                  onClick={(e) => deleteStudent(e, student.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default StudentList;
