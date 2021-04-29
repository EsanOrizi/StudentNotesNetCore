import React, { useContext } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps {
  studentId: string;
}

const NoteList: React.FC<IProps> = ({ studentId }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    filterNotes,
    loadingInitial,
  } = rootStore.mobxStore;

  if (loadingInitial) return <LoadingComponent content="Loading student" />;

  return (
    <Segment clearing>
      <Item.Group divided>
        {filterNotes(studentId).map((note) => (
          <Item key={note.id}>
            <Item.Content>
              <Item.Header>{note.name}</Item.Header>
              <Item.Meta></Item.Meta>
              <Item.Description>
                <div>
                  <b>Progress:</b>&nbsp;&nbsp;&nbsp;{note.progressRating}
                </div>
                <div>
                  <b>Note:</b>&nbsp;&nbsp;&nbsp;{note.extraNote}
                </div>
                <div>
                  <b>Date:</b>&nbsp;&nbsp;&nbsp;
                  {format(note.dateAdded, "dd/MM/YYY")}
                </div>
              </Item.Description>

              <Button
                as={Link}
                to={`/manageNote/${note.id}`}
                basic
                floated="right"
                color="black"
                content="Edit"
                compact
              />
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(NoteList);
