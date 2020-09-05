import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import StudentStore from '../../../app/stores/studentStore';
import { observer } from 'mobx-react-lite';

const StudentDetails: React.FC = () => {
  const studentStore = useContext(StudentStore);
  const { selectedStudent: student, openEditForm, cancelSelectedActivity } = studentStore;
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{student!.name}</Card.Header>
        <Card.Description>{student!.address}</Card.Description>
        <Card.Description>{student!.phone}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => openEditForm(student!.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(StudentDetails);
