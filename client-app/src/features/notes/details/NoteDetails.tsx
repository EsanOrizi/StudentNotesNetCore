import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Header, Icon, Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";

interface DetailParams {
  id: string;
}

const NoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { note, loadNote, submitting, deleteNote } = rootStore.mobxStore;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNote(match.params.id);
  }, [loadNote, match.params.id]);

  if (!note) return <h2>Note not Found</h2>;
  return (
    <Card fluid>
      <Card.Content header={note!.name} />
      <Card.Content extra>
        <Card.Description>
          <div>
            <b>Progress:</b>&nbsp;&nbsp;&nbsp;{note.progressRating}
          </div>
          <div>
            <b>Note:</b>&nbsp;&nbsp;&nbsp;{note.extraNote}
          </div>
          <div>
            <b>Date:</b>&nbsp;&nbsp;&nbsp;{format(note.dateAdded!, "dd/MM/YYY")}
          </div>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Item.Extra>
          <Button
            onClick={() => history.push(`/students/${note.studentId}`)}
            basic
            floated="left"
            color="black"
            content="Looks good"
            compact
          />

          <Modal
            open={open}
            size="mini"
            trigger={
              <Button compact floated="right" content="Delete" color="red" />
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
                floated="right"
                compact
                color="red"
                loading={submitting}
                onClick={(e) =>
                  deleteNote(e, note.id).finally(() =>
                    history.push(`/studentNotes/${note.studentId}`)
                  )
                }
              >
                <Icon name="remove" /> YES DELETE
              </Button>
              <Button compact color="green" onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> No
              </Button>
            </Modal.Actions>
          </Modal>

          <Button
            as={Link}
            to={`/manageNote/${note.id}`}
            basic
            floated="right"
            color="black"
            content="Edit"
            compact
          />
        </Item.Extra>
      </Card.Content>
    </Card>
  );
};

export default observer(NoteDetails);
