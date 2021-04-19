import React, { useContext, useEffect } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { format } from "date-fns";

interface IProps {
  studentId: string;
}

const NoteList: React.FC<IProps> = ({ studentId }) => {
  const rootStore = useContext(RootStoreContext);
  const { filterNotes, getStudent } = rootStore.mobxStore;

  var student = getStudent(studentId);

  //  useEffect(() => {
  //   var student = getStudent(studentId);

  //  }, [getStudent, studentId]);

  return (
    <>
      <Segment clearing>
        {/* <Item.Header as="a">{student.name + `'s notes`}</Item.Header> */}
        <Item.Header>{'NAME'}</Item.Header>
        <Item.Extra>
          <Button
            compact
            as={Link}
            to={`/students/`}
            basic
            floated="left"
            content="Back"
            color='black'

          />
          <Button
            compact
            as={Link}
            to={`/createNote/${studentId}`}
            floated="right"
            content="New Note"
            color='instagram'
          />
        </Item.Extra>
      </Segment>
      <Segment clearing>
        <Item.Group divided>
          {filterNotes(studentId).map((note) => (
            <Item key={note.id}>
              <Item.Content>
                <Item.Header>{note.name}</Item.Header>
                <Item.Meta></Item.Meta>
                <Item.Description>
                  <div><b>Progress:</b>&nbsp;&nbsp;&nbsp;{note.progressRating}</div>
                  <div><b>Note:</b>&nbsp;&nbsp;&nbsp;{note.extraNote}</div>
                  <div><b>Date:</b>&nbsp;&nbsp;&nbsp;{format(note.dateAdded, "dd/MM/YYY")}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    compact
                    as={Link}
                    to={`/notes/${note.id}`}
                    floated="right"
                    content="View"
                    color='instagram'
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
