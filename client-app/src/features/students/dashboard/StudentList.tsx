import React, { useContext, useState } from "react";
import {
  Item,
  Button,
  Segment,
  Modal,
  Icon,
  Header,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

const StudentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    studentArrayFromMap,
    deleteStudent,
    submitting,
     } = rootStore.mobxStore;

  const [open, setOpen] = useState(false);

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
                <Button
                  as={Link}
                  to={`/students/${student.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Modal
                  open={open}
                  size='mini'
                  trigger={
                    <Button floated="right" content="Delete" color="red" />
                  }
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
                      onClick={(e) => deleteStudent(e, student.id)}
                    >
                      <Icon name="remove" /> YES DELETE
                    </Button>
                    <Button color="green" onClick={() => setOpen(false)}>
                      <Icon name="checkmark" /> No
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(StudentList);
