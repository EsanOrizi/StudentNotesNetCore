import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { INote, NoteFormValues } from '../../../app/models/note';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import MobxStore from '../../../app/stores/mobxStore';
import {Form as FinalForm, Field } from 'react-final-form';
import { values } from 'mobx';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import {combineValidators, isRequired} from 'revalidate';


const validate = combineValidators ({
  name: isRequired({message: 'name is required'}),
  progressRating: isRequired({message: 'progressRating is required'}),
  extraNote: isRequired({message: 'extraNote is required'}),
  dateAdded: isRequired({message: 'dateAdded is required'}),
  
})


interface DetailsParams {
  id: string;
}

const NoteForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
  const mobxStore = useContext(MobxStore);
  const { createNote, editNote, submitting, note: initializeFormState, loadNote, clearNote } = mobxStore;

  const location = useLocation();
  const studentId = location.pathname.split('/createNote/')[1];

  // const [note, setNote] = useState<INote>({
  //   id: '',
  //   name: '',
  //   progressRating: '',
  //   extraNote: '',
  //   dateAdded: '',
  //   studentId: '',
  // });

  const [note, setNote] = useState(new NoteFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (match.params.id && note.id.length === 0) {
    //   loadNote(match.params.id).then(() => initializeFormState && setNote(initializeFormState));
    if (match.params.id) {
      setLoading(true);
      loadNote(match.params.id)
      .then((note) => initializeFormState && setNote(new NoteFormValues(note)))
      .finally(() =>  setLoading(false));  
  
  }
  //   return () => {
  //     clearNote();
  //   };
  // }, [loadNote, clearNote, match.params.id, initializeFormState, note.id.length]);

}, [loadNote, clearNote, match.params.id, note.id.length]);

  // const handleSubmit = () => {
  //   if (note.id.length === 0) {
      
    const handleFinalFormSubmit  = (values: any) => {
      const {...note} = values;  
      if (!note.id) {
        let newNote = {
        ...note,
        id: uuid(),
        studentId: studentId,
      };
     // createNote(newNote).then(() => history.push(`/notes/${newNote.id}`));
     createNote(newNote);

    } else {
     // editNote(note).then(() => history.push(`/notes/${note.id}`));
     editNote(note);

    }
  };

  // const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.currentTarget;
  //   setNote({ ...note, [name]: value });
  // };

  return (
    <Segment clearing>
      {/* <Form onSubmit={handleSubmit}>
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
        <Button onClick={() => {history.goBack()}} floated="right" type="button" content="Cancel" /> */}
      <FinalForm  
      validate={validate}
      initialValues={note}
      onSubmit={handleFinalFormSubmit}
      render={({handleSubmit , invalid, pristine}) => (

      <Form onSubmit={handleSubmit} loading={loading} >
        <Field name="name" placeholder="Name" value={note.name} component={TextInput}/>
        <Field name="extraNote" placeholder="extraNote" value={note.extraNote} component={TextAreaInput} rows={3} />
        <Field name="progressRating" placeholder="progressRating" value={note.progressRating} component={TextInput} />
        <Field name="dateAdded" placeholder="dateAdded" value={note.dateAdded} component={TextInput} />
        <Button loading={submitting} disabled={loading || invalid || pristine} floated="right" positive type="submit" content="submit" />
        <Button onClick={
          note.id 
          ? () => history.push(`/notes/${note.id}`) 
          : () => history.push('/notes')} 
          disabled={loading} 
          floated="right" 
          type="button" 
          content="Cancel" />
      
      
      </Form>
      )}
      />
    </Segment>
  );
};

export default observer(NoteForm);
