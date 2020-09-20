import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MobxStore from '../../../app/stores/mobxStore';

interface DetailParams {
  id: string;
}

const StudentDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const mobxStore = useContext(MobxStore);
  const { student, loadStudent, loadingInitial } = mobxStore;

  useEffect(() => {
    loadStudent(match.params.id);
  }, [loadStudent, match.params.id]);

  if (loadingInitial || !student) return <LoadingComponent content="Loading student" />;
  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>{student!.name}</Card.Header>
          <Card.Description>{student!.address}</Card.Description>
          <Card.Description>{student!.phone}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={3}>
            <Button as={Link} to={`/manageStudent/${student.id}`} basic color="blue" content="Edit" />
            <Button onClick={() => history.push('/students')} basic color="grey" content="Cancel" />
            <Button as={Link} to={`/studentNotes/${student.id}`} basic color="blue" content="Notes" />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
};

export default observer(StudentDetails);
