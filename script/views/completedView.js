import { formatDate } from "../utils/formatDate.js";
import { renderTodoContainer, removeTodo, markTodoAsDone } from "../todo-list.js";
import { todoList } from "../data/todos.js";
import { attachEditButtonListeners } from "../components/editModal.js";

export function showCompletedView() {
  const completedTodosList = [];

  todoList.forEach((todoObject) => {
    if (todoObject.completed === true) {
      completedTodosList.push(todoObject);
    }
  });

  let completedListHTML = '';

  completedTodosList.forEach((todoElement) => {
  const { id, name, dueDate, completed } = todoElement;
  
  const formattedDate = formatDate(dueDate);

  const html = `
    <li class="todo-list-item js-active-list-item">
      <div class="todo-info">
        <input 
        type="checkbox" 
        class="todo-checkbox js-todo-checkbox" 
        data-todo-id=${id}
        ${completed ? 'checked' : ''}>
        <p class="todo-name js-todo-name ${completed ? 'todo-completed' : ''}">
      ${name}
        </p>
      </div>
      <div class="todo-controls">
        <div class="todo-buttons">
          <button class="edit-button js-edit-button" 
          data-todo-id=${id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
          </button>
          <button class="delete-button js-delete-button" data-todo-id=${id}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>
        <p class="todo-date">
          ${formattedDate}
        </p>
      </div>
    </li>`

    completedListHTML += html;
  });

  const htmlContent = `
    <ul class="todo-list js-todo-list">
      ${completedListHTML}
    </ul>
  `;

  renderTodoContainer(htmlContent);
  removeTodo();  
  attachEditButtonListeners(todoList);
  markTodoAsDone(showCompletedView);

  const todoContainer = document.querySelector('.js-todo-list');
  if (completedTodosList.length > 0) {
    todoContainer.classList.add('js-completed-todo-container');
  } else {
    todoContainer.classList.remove('js-completed-todo-container');
    todoContainer.classList.add('js-completed-empty-container');
  }
  return completedTodosList;
}