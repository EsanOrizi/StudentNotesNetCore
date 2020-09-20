import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { INote } from '../../../app/models/note';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import MobxStore from '../../../app/stores/mobxStore';

interface DetailsParams {
  id: string;
}

const NoteForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
  const mobxStore = useContext(MobxStore);
  const { createNote, editNote, submitting, note: initializeFormState, loadNote, clearNote } = mobxStore;

  const location = useLocation();
  const studentId = location.pathname.split('/createNote/')[1];

  const [note, setNote] = useState<INote>({
    id: '',
    name: '',
    progressRating: '',
    extraNote: '',
    dateAdded: '',
    studentId: '',
  });

  useEffect(() => {
    if (match.params.id && note.id.length === 0) {
      loadNote(match.params.id).then(() => initializeFormState && setNote(initializeFormState));
    }
    return () => {
      clearNote();
    };
  }, [loadNote, clearNote, match.params.id, initializeFormState, note.id.length]);

  const handleSubmit = () => {
    if (note.id.length === 0) {
      let newNote = {
        ...note,
        id: uuid(),
        studentId: studentId,
      };
      createNote(newNote).then(() => history.push(`/notes/${newNote.id}`));
    } else {
      editNote(note).then(() => history.push(`/notes/${note.id}`));
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setNote({ ...note, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input onChange={handleInputChange} name="name" placeholder="Name" value={note.name} />
        <Form.Input onChange={handleInputChange} name="extraNote" placeholder="ExtraNote" value={note.extraNote} />
        <Form.Input
          onChange={handleInputChange}
          name="progressRating"
          placeholder="ProgressRating"
          value={note.progressRating}
        />
        <Form.Input
          onChange={handleInputChange}
          name="dateAdded"
          placeholder="DateAdded"
          value={note.dateAdded.split('T')[0]}
        />

        <Button loading={submitting} floated="right" positive type="submit" content="submit" />
        <Button onClick={() => history.push('/notes')} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(NoteForm);
