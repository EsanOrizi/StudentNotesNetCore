import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const StudentDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    student,
    loadStudent,
    loadingInitial,
    deleteStudent,
    submitting,
  } = rootStore.mobxStore;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadStudent(match.params.id);
  }, [loadStudent, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading student" />;

  if (!student) return <h2>Student Not Found</h2>;

  return (
    <h2>
      <Card fluid>
        <Card.Content>
          <Card.Header>{student!.name}</Card.Header>
          <Card.Description>{student!.address}</Card.Description>
          <Card.Description>{student!.phone}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={4}>
            <Button
              as={Link}
              to={`/manageStudent/${student.id}`}
              basic
              color="blue"
              content="Edit"
            />
            <Button
              onClick={() => history.push("/students")}
              basic
              color="grey"
              content="Cancel"
            />
            <Button
              as={Link}
              to={`/studentNotes/${student.id}`}
              basic
              color="blue"
              content="Notes"
            />
            <Modal
              open={open}
              size="mini"
              trigger={<Button floated="right" content="Delete" color="red" />}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <Header content="Delete student?" />
              <Modal.Content>
                <p>Are you sure you like to delete this student?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  loading={submitting}
                  onClick={(e) =>
                    deleteStudent(e, student.id)
                      .finally(() => setOpen(false))
                      .finally(() => history.push("/students"))
                  }
                >
                  <Icon name="remove" /> YES DELETE
                </Button>
                <Button color="green" onClick={() => setOpen(false)}>
                  <Icon name="checkmark" /> No
                </Button>
              </Modal.Actions>
            </Modal>
          </Button.Group>
        </Card.Content>
      </Card>
    </h2>
  );
};

export default observer(StudentDetails);
