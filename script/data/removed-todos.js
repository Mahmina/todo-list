export let removedTodosList = JSON.parse(localStorage.getItem('removedTodosList')) || [];

export function addToRemovedTodos(todo) {
  removedTodosList.push(todo);
  saveRemovedToStorage();
}

export function saveRemovedToStorage() {
  localStorage.setItem('removedTodosList', JSON.stringify(removedTodosList));
}

export function removeFromRemovedTodos(todoId) {
  const index = removedTodosList.findIndex(todo => todo.id === todoId);

  const confirmDelete = window.confirm('Are you sure you want to permanently delete this task?');

  if (!confirmDelete) {
    return; // User canceled deletion
  }
  
  if (index !== -1) {
    removedTodosList.splice(index, 1);
    saveRemovedToStorage();
  }
}