import React, { useContext } from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

const StudentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { studentArrayFromMap } = rootStore.mobxStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {studentArrayFromMap.map((student) => (
          <Item key={student.id}>
            <Item.Content>
              <Item.Header>{student.name}</Item.Header>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/students/${student.id}`}
                  floated="right"
                  content="View"
                  color='black'
                  basic
                  compact
                />               
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(StudentList);
