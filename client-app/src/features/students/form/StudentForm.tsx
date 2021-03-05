import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { StudentFormValues } from '../../../app/models/student';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { combineValidators, composeValidators, isNumeric, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  name: isRequired({ message: 'name is required' }),
  address: isRequired({ message: 'address is required' }),
  phone: composeValidators(
  isRequired({ message: 'Can not be Empty' }),
  isNumeric({message:'Must be a number'}))()
});

interface DetailsParams {
  id: string;
}

const StudentForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createStudent,
    editStudent,
    submitting,
    student: initializeFormState,
    loadStudent,
    clearStudent,
  } = rootStore.mobxStore;

  const [student, setStudent] = useState(new StudentFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadStudent(match.params.id)
        .then((student) => initializeFormState && setStudent(new StudentFormValues(student)))
        .finally(() => setLoading(false));
    }
  }, [loadStudent, clearStudent, match.params.id, student.id.length, initializeFormState]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...student } = values;
    if (!student.id) {
      let newStudent = {
        ...student,
        id: uuid(),
      };
      createStudent(newStudent);
    } else {
      editStudent(student);
    }
  };

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={student}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name='name' placeholder='Name' value={student.name} component={TextInput} />
            <Field
              name='address'
              placeholder='Address'
              value={student.address}
              component={TextAreaInput}
              rows={3}
            />
            <Field
              name='phone'
              placeholder='Phone'
              value={student.phone}
              component={TextInput}
            />
            <Button
              loading={submitting}
              disabled={loading || invalid || pristine}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              onClick={
                student.id
                  ? () => history.push(`/students/${student.id}`)
                  : () => history.push('/students')
              }
              disabled={loading}
              floated='right'
              type='button'
              basic
              color='black'
              content='Cancel'
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(StudentForm);
