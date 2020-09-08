import React, { useContext } from 'react';
import { Item, Button, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import StudentStore from '../../../app/stores/studentStore';
import { Link } from 'react-router-dom';

const StudentList: React.FC = () => {
  const studentStore = useContext(StudentStore);
  const { studentArrayFromMap, deleteStudent, submitting, target } = studentStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {studentArrayFromMap.map((student) => (
          <Item key={student.id}>
            <Item.Content>
              <Item.Header as="a">{student.name}</Item.Header>
              <Item.Meta></Item.Meta>
              <Item.Description>
                <div>{student.address}</div>
                <div>{student.phone}</div>
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to={`/students/${student.id}`} floated="right" content="View" color="blue" />
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

export default observer(StudentList);
