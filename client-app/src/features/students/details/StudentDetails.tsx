import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import StudentStore from '../../../app/stores/studentStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailParams {
  id: string;
}

const StudentDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const studentStore = useContext(StudentStore);
  const { student, loadStudent, loadingInitial } = studentStore;

  useEffect(() => {
    loadStudent(match.params.id);
  }, [loadStudent, match.params.id]);

  if (loadingInitial || !student) return <LoadingComponent content="loading student" />;
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
          <Button as={Link} to={`/manage/${student.id}`} basic color="blue" content="Edit" />
          <Button onClick={() => history.push('/students')} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(StudentDetails);
