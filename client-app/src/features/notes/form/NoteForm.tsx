import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { NoteFormValues } from '../../../app/models/note';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  name: isRequired({ message: 'name is required' }),
  progressRating: isRequired({ message: 'progressRating is required' }),
  extraNote: isRequired({ message: 'extraNote is required' }),
  dateAdded: isRequired({ message: 'dateAdded is required' }),
});

interface DetailsParams {
  id: string;
}

const NoteForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createNote,
    editNote,
    submitting,
    note: initializeFormState,
    loadNote,
    clearNote,
  } = rootStore.mobxStore;

  const location = useLocation();
  const studentId = location.pathname.split('/createNote/')[1];

  const [note, setNote] = useState(new NoteFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadNote(match.params.id)
        .then((note) => initializeFormState && setNote(new NoteFormValues(note)))
        .finally(() => setLoading(false));
    }
  }, [loadNote, clearNote, match.params.id, note.id.length, initializeFormState]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...note } = values;
    if (!note.id) {
      let newNote = {
        ...note,
        id: uuid(),
        studentId: studentId,
      };
      createNote(newNote);
    } else {
      editNote(note);
    }
  };

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={note}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name='name' placeholder='Name' value={note.name} component={TextInput} />
            <Field
              name='extraNote'
              placeholder='extraNote'
              value={note.extraNote}
              component={TextAreaInput}
              rows={3}
            />
            <Field
              name='progressRating'
              placeholder='progressRating'
              value={note.progressRating}
              component={TextInput}
            />
            <Field
              name='dateAdded'
              placeholder='dateAdded'
              value={note.dateAdded}
              component={TextInput}
            />
            <Button
              loading={submitting}
              disabled={loading || invalid || pristine}
              floated='right'
              positive
              type='submit'
              content='submit'
            />
            <Button
              onClick={
                note.id
                  ? () => history.push(`/notes/${note.id}`)
                  : () => history.push('/notes')
              }
              disabled={loading}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(NoteForm);
