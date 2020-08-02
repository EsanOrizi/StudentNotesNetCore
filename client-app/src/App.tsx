import React, { Component } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/students").then((Response) => {
      this.setState({
        students: Response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Student Notes</Header.Content>
        </Header>

        <List>
          {this.state.students.map((student: any) => (
            <List.Item key={student.id}>{student.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}
export default App;
