import React, { useContext, useEffect } from 'react';
import { Item, Button, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import StudentStore from '../../../app/stores/studentStore';
import { Link, RouteComponentProps } from 'react-router-dom';

interface IProps {
  studentId: string;
}

const NoteList: React.FC<IProps> = ({ studentId }) => {
  const studentStore = useContext(StudentStore);
  const { filterNotes, noteArrayFromMap, target, submitting, deleteNote } = studentStore;

  return (
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
                <div>{note.dateAdded}</div>
                <div>{note.studentId}</div>
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to={`/notes/${note.id}`} floated="right" content="View" color="blue" />
                <Button
                  name={note.id}
                  loading={target === note.id && submitting}
                  onClick={(e) => deleteNote(e, note.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(NoteList);
