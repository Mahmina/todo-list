import { todoList } from "../data/todos.js";
import { saveToStorage } from "../todo-list.js";
import { showAllView } from "../views/allView.js";

attachEditButtonListeners();
closeEditModal();

// Get modal element
const modal = document.getElementById('myModal');

// Update Todos
document.querySelector('.js-update-button')
  .addEventListener('click', () => {
    const todoId = modal.dataset.editingId;
    const matchingTodo = todoList.find(todo => todo.id === todoId);
    if (!matchingTodo) return;

    matchingTodo.name = document.querySelector('.js-edit-name-input').value;
    matchingTodo.dueDate = document.querySelector('.js-edit-date-input').value;

    saveToStorage();
    showAllView();
    modal.style.display = "none";

    attachEditButtonListeners();
  });

export function attachEditButtonListeners() {
  document.querySelectorAll('.js-edit-button')
    .forEach((editButton) => {
      editButton.addEventListener('click', () => {
        modal.style.display = "block";
        const todoId = editButton.dataset.todoId;
        
        let matchingTodo;

        todoList.forEach((todoItem) => {
          if (todoItem.id === todoId) {
            matchingTodo = todoItem;
          }
        });
        populateEditModal(matchingTodo);

        modal.dataset.editingId = todoId;
      });
    });   
}

// Populate the modal inputs with the todo's info
function populateEditModal(matchingTodo) {
  if (!matchingTodo) return;

  document.querySelector('.js-edit-name-input').value = matchingTodo.name;;
  document.querySelector('.js-edit-date-input').value = matchingTodo.dueDate; 
}

// Set up click handlers for closing/canceling the modal
function closeEditModal() {
  document.querySelectorAll('.js-close-modal, .js-cancel-edit-button')
    .forEach((element) => {
      element.addEventListener('click', () => {
      modal.style.display = "none";
      });
    });
}
