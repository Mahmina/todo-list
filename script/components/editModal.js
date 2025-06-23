import { saveToStorage } from '../todo-list.js';

const modal = document.getElementById('myModal');
closeEditModal();

export function bindEditButtons() {
  document.querySelectorAll('.js-edit-button')
    .forEach((editButton) => {
      editButton.addEventListener('click', () => {
        modal.style.display = "block";

        populateEditModal(editButton);
      });
    });
}


function populateEditModal(editButton) {
  const todoName = editButton.dataset.todoName;
  const todoDate = editButton.dataset.todoDate;
  document.querySelector('.js-edit-name-input')
    .value = todoName;

  document.querySelector('.js-edit-date-input') 
    .value = todoDate; 
}  

function closeEditModal() {
  document.querySelectorAll('.js-close-modal, .js-cancel-edit-button')
    .forEach((element) => {
      element.addEventListener('click', () => {
      modal.style.display = "none";
      });
    });
}


