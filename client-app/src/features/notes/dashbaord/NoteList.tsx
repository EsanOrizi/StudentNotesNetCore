import React, { useContext, useState } from "react";
import { Item, Button, Segment, Modal, Header, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  studentId: string;
}

const NoteList: React.FC<IProps> = ({ studentId }) => {
  const rootStore = useContext(RootStoreContext);
  const { filterNotes, target, submitting, deleteNote } = rootStore.mobxStore;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Segment clearing>
        <Button
          as={Link}
          to={`/createNote/${studentId}`}
          floated="right"
          content="New Note"
          color="blue"
        />
      </Segment>
      <Segment clearing>
        <Item.Group divided>
          {filterNotes(studentId).map((note) => (
            <Item key={note.id}>
              <Item.Content>
                <Item.Header as="a">{note.name}</Item.Header>
                <Item.Meta></Item.Meta>
                <Item.Description>
                  <div>{note.progressRating}</div>
                  <div>{note.extraNote}</div>
                  <div>{note.dateAdded.split("T")[0]}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/notes/${note.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Modal
                    open={open}
                    size="mini"
                    trigger={
                      <Button floated="right" content="Delete" color="red" />
                    }
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                  >
                    <Header content="Delete Note?" />
                    <Modal.Content>
                      <p>Are you sure you like to delete this note?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        color="red"
                        loading={submitting}
                        onClick={(e) => deleteNote(e, note.id)}
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
    </>
  );
};

export default observer(NoteList);
