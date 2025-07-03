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
  if (index !== -1) {
    removedTodosList.splice(index, 1);
    saveRemovedToStorage();
  }
}