import React from 'react';
import AddComp from './AddComp';

function getDefaultState() {
  let todolist = [
    {
      id: '1',
      name: 'todo1',
      status: 'pending', //can be either 'pending' or 'completed'
    },
    {
      id: '2',
      name: 'todo2',
      status: 'completed',
    }
  ]
  let tasklist = [
    {
      id: '1',
      name: 'task1',
      status: 'pending',
      todolist_id: '1'
    },
    {
      id: '2',
      name: 'task2',
      status: 'completed',
      todolist_id: '1'
    },
    {
      id: '3',
      name: 'task3',
      status: 'pending',
      todolist_id: '1'
    },
    {
      id: '4',
      name: 'task11',
      status: 'completed',
      todolist_id: '2'
    },
    {
      id: '5',
      name: 'task22',
      status: 'pending',
      todolist_id: '2'
    }
  ]

  let tasksForTodoSelected = [
    {
      id: '1',
      name: 'task1',
      status: 'pending',
      todolist_id: '1'
    },
    {
      id: '2',
      name: 'task2',
      status: 'completed',
      todolist_id: '1'
    },
    {
      id: '3',
      name: 'task3',
      status: 'pending',
      todolist_id: '1'
    }
  ]
  return [todolist, tasklist, tasksForTodoSelected];
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    let initialState = getDefaultState();
    this.state = {
      todolist: initialState[0],
      tasklist: initialState[1],
      todoSelected: 1,
      tasksForTodoSelected: initialState[2],
      taskSelected: 1,
      showListType: 'todo', //can be either 'todo' or 'task' or 'add'
      newItemName: ''
    }
    this.showTasks = this.showTasks.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.TodoList = this.TodoList.bind(this);
    this.TaskList = this.TaskList.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.addToList = this.addToList.bind(this);
    this.setListType = this.setListType.bind(this);
    this.setItemName = this.setItemName.bind(this);
  }

  addToList = (operationType, itemName, type, todolist_id) => {
    let temp = [], temp2 = []
    if (type === 'todo') {
      temp = this.state.todolist;
      if (operationType === 'add') {
        temp.push({
          id: (this.state.todolist.length + 1).toString(),
          name: itemName,
          status: 'pending' //by default
        })
      } else {
        let x = temp.find(each => each.id === this.state.todoSelected)
        x.name = itemName
      }

      this.setState({
        todolist: temp
      })
    } else {
      temp = this.state.tasklist;
      temp2 = this.state.tasksForTodoSelected;
      if (operationType === 'add') {
        let obj = {
          id: (this.state.tasklist.length + 1).toString(),
          name: itemName,
          status: 'pending', //by default
          todolist_id: todolist_id
        }
        temp.push(obj)
        temp2.push(obj);
      }
      else {
        let x = temp.find(each => each.id === this.state.taskSelected)
        let y = temp2.find(each => each.id === this.state.taskSelected)
        x.name = itemName
        y.name = itemName
      }
      this.setState({
        tasklist: temp,
        tasksForTodoSelected: temp2
      })
    }
  }

  setListType = (type) => {
    this.setState({
      showListType: type
    })
  }

  setItemName = (itemName) => {
    this.setState({
      newItemName: itemName
    })
  }

  showComponent = () => {
    switch (this.state.showListType) {
      case 'todo': return this.TodoList();
      case 'task': return this.TaskList();
      case 'addTodo': return <AddComp operationType='add' setListType={(type) => this.setListType(type)} type='todo' newItemName={this.state.newItemName}
        setItemName={(itemName) => this.setItemName(itemName)} addToList={(operationType, itemName, type) => this.addToList(operationType, itemName, type)} />;

      case 'addTask': return <AddComp operationType='add' setListType={(type) => this.setListType(type)} type='task' newItemName={this.state.newItemName}
        setItemName={(itemName) => this.setItemName(itemName)} addToList={(operationType, itemName, type, todoId) => this.addToList(operationType, itemName, type, todoId)} todoId={this.state.todoSelected} />;

      case 'editTodo': return <AddComp operationType='edit' setListType={(type) => this.setListType(type)} type='todo' newItemName={this.state.newItemName}
        setItemName={(itemName) => this.setItemName(itemName)} addToList={(operationType, itemName, type) => this.addToList(operationType, itemName, type)} />;

      case 'editTask': return <AddComp operationType='edit' setListType={(type) => this.setListType(type)} type='task' newItemName={this.state.newItemName}
        setItemName={(itemName) => this.setItemName(itemName)} addToList={(operationType, itemName, type) => this.addToList(operationType, itemName, type)} />;

    }
  }

  showTasks = (todoId) => {
    this.setState({
      showListType: 'task',
      todoSelected: todoId,
      tasksForTodoSelected: this.state.tasklist.filter(each => each.todolist_id === todoId)
    });

  }

  deleteTodo = (todoId) => {
    this.setState({
      todolist: this.state.todolist.filter(each => each.id !== todoId),
      tasklist: this.state.tasklist.filter(each => each.todolist_id !== todoId),
      tasksForTodoSelected: []
    })
  }

  deleteTask = (taskId) => {
    this.setState({
      tasklist: this.state.tasklist.filter(each => each.id !== taskId),
      tasksForTodoSelected: this.state.tasksForTodoSelected.filter(each => each.id !== taskId)
    })
  }

  TodoList = () => {
    return (
      <div>
        <h2>TODO LIST</h2>
        <button onClick={() => this.setState({ showListType: 'addTodo', newItemName: '' })}>Add</button>
        {this.state.todolist.length === 0 ? <div>No items to show</div>
          : ""}
        {this.state.todolist.map(each => {
          return (
            <div>
              {each.status === 'pending' ?
                <a href="#" onClick={() => this.showTasks(each.id)}>{each.name}</a> :
                <a href="#" onClick={() => this.showTasks(each.id)}><del>{each.name}</del></a>
              }

              <button onClick={() => this.setState({ showListType: 'editTodo', newItemName: `${each.name}`, todoSelected: `${each.id}` })}>Edit</button>
              <button onClick={() => this.deleteTodo(each.id)}>Delete</button>
              <button onClick={() => {
                let temp = this.state.todolist
                let temp2 = temp.find(e => e.id === each.id)
                temp2.status = temp2.status === 'pending' ? 'completed' : 'pending'
                this.setState({
                  todolist: temp
                })
              }}>{each.status === 'pending' ? 'Check' : 'Uncheck'}</button>
              <br />
            </div>
          )
        })}
      </div>)
  }

  TaskList = () => {
    return (
      <div>
        <h2>TODO TASK LIST</h2>
        <a href="#" onClick={() => { this.setState({ showListType: 'todo' }) }}>Go back</a>
        <br />
        <button onClick={() => this.setState({ showListType: 'addTask', newItemName: '' })}>Add</button>

        <div><strong>{this.state.todolist.find(each => each.id === this.state.todoSelected).name}</strong></div>
        {this.state.tasksForTodoSelected.length === 0 ? <div>No items to show</div>
          : ""}
        {this.state.tasksForTodoSelected.map(each => {
          return (
            <div>
              {each.status === 'pending' ?
                <span>{each.name}</span>
                :
                <span><del>{each.name}</del></span>
              }
              <button onClick={() => this.setState({ showListType: 'editTask', newItemName: `${each.name}`, taskSelected: `${each.id}` })}>Edit</button>
              <button onClick={() => this.deleteTask(each.id)}>Delete</button>
              <button onClick={() => {
                let temp = this.state.tasklist
                let temp2 = this.state.tasksForTodoSelected

                let temp3 = temp.find(e => e.id === each.id)
                temp3.status = temp3.status === 'pending' ? 'completed' : 'pending'

                let temp4 = temp2.find(e => e.id === each.id)
                temp4.status = temp3.status
                this.setState({
                  tasklist: temp,
                  tasksForTodoSelected: temp2
                })
              }}>{each.status === 'pending' ? 'Check' : 'Uncheck'}</button>
            </div>
          )
        })}
      </div>)
  }


  render() {
    return (
      <div>
        <h1>TODO APP</h1>

        {this.showComponent()}

      </div>
    )
  }

}



export { HomeScreen }