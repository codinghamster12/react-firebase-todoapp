import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get('https://us-central1-todoapp-e594a.cloudfunctions.net/api/todos')
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.todoId === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = id => {
    axios.delete(`https://us-central1-todoapp-e594a.cloudfunctions.net/api/todo/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.todoId !== id)]
      })
    );
  };

  // Add Todo
  addTodo = title => {
    axios
      .post('https://us-central1-todoapp-e594a.cloudfunctions.net/api/todo', {
        title,
        completed: false
      })
      .then(res => {
        const newTodo={
          'todoId': res.data.id,
          'title': res.data.title,
          'completed': res.data.completed
        }
        
        this.setState({ todos: [...this.state.todos, newTodo] });
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
