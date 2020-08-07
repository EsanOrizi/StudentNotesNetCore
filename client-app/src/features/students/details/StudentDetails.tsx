import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IStudent } from "../../../app/models/student";

interface IProps {
  student: IStudent;
  setEditMode: (editMode: boolean) => void;
  setSelectedStudent: (student: IStudent | null) => void;
}

const StudentDetails: React.FC<IProps> = ({
  student,
  setEditMode,
  setSelectedStudent,
}) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{student.name}</Card.Header>
        <Card.Description>{student.address}</Card.Description>
        <Card.Description>{student.phone}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedStudent(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default StudentDetails;
