import React, { Component } from 'react';
import shortid from 'shortid';
// import ColorPicker from './components/ColorPicker';
import Container from './components/Container';
// import TodoList from './components/TodoList';
// import TodoEditor from './components/TodoEditor';
// import Filter from './components/TodoFilter';
import Modal from './components/Modal';
// import Clock from './components/Clock';
import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    console.log(parsedTodos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }

    // setTimeout(() => {
    //   this.setState({ todos: parsedTodos });
    // }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    // console.log(prevState);  // До обновления
    // console.log(this.state);  // После обновления

    if (this.state.todos !== prevState.todos) {
      console.log('Обновилось поле todos, записываю todos в хранилище');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce((total, todo) => (todo.completed ? total + 1 : total), 0);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* <button type="button" onClick={this.toggleModal}>Показать/скрыть время</button>
        {showModal &&<Clock />} */}

        {/* <button type="button" onClick={this.toggleModal}>Открыть модалку</button>

        {showModal && (
          <Modal onClose={this.toggleModal}>
          <button type="button" onClick={this.toggleModal}>Закрыть модалку</button>
          </Modal>
        )} */}

        {/* TODO: вынести в отдельный компонент */}

        {/* <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        /> */}
      </Container>
    );
  }
}

export default App;

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

//this.setState() нельзя вызывать в методе componentDidUpdate() или в render(), тк ог зацикливает компонент, можно только  в componentDidUpdate() по проверке условия - в HTTP запросах
