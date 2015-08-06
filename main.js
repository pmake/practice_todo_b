localStorage.finTodos = JSON.stringify(["f1","f2","f3","f4"]);
ls.getTodos();

//localStorage.removeItem("todos");
//localStorage.removeItem("finTodos");
// Add listeners.
document.getElementById("submit").addEventListener('click',todo.add);