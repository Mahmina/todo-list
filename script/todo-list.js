import { todoList, generateId } from "./data/todos.js";
import { capitalizeFirstLetter } from "./utils/stringUtils.js";
import  './navHandler.js';
import './views/allView.js'
import './views/activeView.js';
import './views/completedView.js';
import './views/removedView.js';
import { showAllView } from './views/allView.js'; 
import { addToRemovedTodos } from "./data/removed-todos.js";
import { showActiveView } from "./views/activeView.js";


document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
  });

  
function addTodo() {
  const inputElement = document.querySelector('.js-todo-name-input');
  const name = capitalizeFirstLetter(inputElement.value);

  const dateInputElement = document.getElementById('todo-date-input');
  const dueDate = dateInputElement.value;
  
  const newTodo = {
    id: generateId(),
    name: name,
    dueDate: dueDate,
    completed: false
  };
 
  todoList.push(newTodo);

  inputElement.value = '';
  dateInputElement.value = '';

  showAllView();
  setNavIndicator('all');
  saveToStorage();
}  


export function renderTodoContainer(htmlContent) {
  const todoContainer = document.querySelector('.js-todo-container');
  todoContainer.innerHTML = htmlContent;
}

window.addEventListener('DOMContentLoaded', () => {
  const allLink = document.querySelector('.nav-link[data-view="all"]');
  if (allLink) {
    allLink.click();  
  }
});

export function setNavIndicator(viewName) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active'); 
    } else {
      link.classList.remove('active');
    }
  });
}

export function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

export function removeTodo() {
  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const todoId = deleteButton.dataset.todoId;
        const deletedTodo = todoList.find(todo => todo.id === todoId);
        
        addToRemovedTodos(deletedTodo);

        const index = todoList.findIndex(todo => todo.id === todoId);

        if (index !== -1) {
          todoList.splice(index, 1);
          showAllView();
          setNavIndicator('all');
          saveToStorage();
        }
      });
    });    
}

export function markTodoAsDone(refreshView) {
  document.querySelectorAll('.js-todo-checkbox')
    .forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        const todoId = checkbox.dataset.todoId;

        const todoNameElement = checkbox.parentElement.querySelector('.js-todo-name');

        const matchingTodo = todoList.find(todoItem => todoItem.id === todoId);
        if (matchingTodo) {
          matchingTodo.completed = !matchingTodo.completed; 

          if (todoNameElement) {
            todoNameElement.classList.toggle('todo-completed', matchingTodo.completed);
          }
        }
        saveToStorage();

        if (typeof refreshView === 'function') {
          refreshView();
        }
      });
    });
}


 


