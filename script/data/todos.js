export function generateId() {
  const id = crypto.randomUUID();
  return id;
}

export const todoList = JSON.parse(localStorage.getItem('todoList')) 
  || [];
