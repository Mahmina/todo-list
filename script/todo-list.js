import { todoList, generateId } from "./data/todos.js";
import { capitalizeFirstLetter } from "./utils/stringUtils.js";
import  './navHandler.js';
import './views/allView.js'
import './views/activeView.js';
import './views/completedView.js';
import './views/removedView.js';
import { showAllView } from './views/allView.js'; 
import { addToRemovedTodos } from "./data/removed-todos.js";
import { numberToWords } from "./utils/stringUtils.js";


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
        updateStats();
      });
    });
}


export function updateStats() {
  const completedTasks = todoList.filter(todo => todo.completed).length;
  const totalTasks = todoList.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById('progress');

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;

  if (totalTasks === completedTasks && totalTasks !== 0) {
    blaskConfetti();
  } 


  const motivationalText = document.querySelector('.js-motivation-text');

  if (completedTasks === 0) {
    motivationalText.innerHTML = 'Don’t overthink, just begin!';
  } else if (completedTasks === 1) {
    motivationalText.innerHTML = `One down, ${numberToWords(totalTasks - completedTasks)} to go!`;
  } else if (completedTasks === Math.floor(totalTasks / 2)) {
    motivationalText.innerHTML = "Halfway there. You're on fire!";
  } else if (completedTasks === totalTasks - 1) {
    motivationalText.innerHTML = 'Only one task left. Crush it!';
  } else if (completedTasks < totalTasks / 2) {
    motivationalText.innerHTML = "Look at you go! Keep checking them off.";
  } else if (completedTasks > totalTasks / 2) {
    motivationalText.innerHTML = "The finish line is in sight. Go for it!";
  } else if (completedTasks === totalTasks) {
    motivationalText.innerHTML = 'You did it! Time to relax and celebrate. 🎉';
  } else {
    motivationalText.innerHTML = 'Stay in the zone!';
  }
}  

function blaskConfetti() {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
