import React, { useContext, useEffect } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, match } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  studentId: string;
}



const NoteList: React.FC<IProps> = ({ studentId }) => {
  const rootStore = useContext(RootStoreContext);
  const { filterNotes, student, loadStudent } = rootStore.mobxStore;

  useEffect(() => {
    loadStudent(studentId);
  }, [loadStudent]);

  return (
    <>
      <Segment clearing >
        <h2>{student!.name}</h2>
        <Button
          as={Link}
          to={`/createNote/${studentId}`}
          floated="left"
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
