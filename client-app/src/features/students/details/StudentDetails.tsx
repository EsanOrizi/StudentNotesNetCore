import React, { useContext, useEffect } from "react";
import { Card, Button} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import NoteList from "../../notes/dashbaord/NoteList";

interface DetailParams {
  id: string;
}

const StudentDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    student,
    loadStudent,
    loadNotes,
  } = rootStore.mobxStore;
  

  useEffect(() => {
    loadNotes();
    loadStudent(match.params.id);
  }, [loadNotes, loadStudent, match.params.id, history]);

  if (!student) return <h2>Student Not Found</h2>;

  return (
    <>
      <Card fluid>
        <Card.Content header={student!.name} />
        <Card.Content extra>
          <Card.Description>
            <div>
              <b>Address:</b>&nbsp;&nbsp;&nbsp;{student!.address}
            </div>
            <div>
              <b>Phone:</b>&nbsp;&nbsp;&nbsp;{student!.phone}
            </div>
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button
            compact
            as={Link}
            to={`/createNote/${student.id}`}
            content="New Note"
            color="black"
            basic
          />
          <Button
            compact
            as={Link}
            to={`/manageStudent/${student.id}`}
            basic
            floated="right"
            color="black"
            content="Edit"
          />
        </Card.Content>
      </Card>
      <Card fluid>
        <NoteList studentId={student.id}></NoteList>
      </Card>
    </>
  );
};

export default observer(StudentDetails);
