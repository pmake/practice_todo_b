//localStorage.finTodos = JSON.stringify(["f1","f2","f3","f4"]);
ls.getTodos();
//localStorage.removeItem("todos");
//localStorage.removeItem("finTodos");
// Add listeners.
document.getElementById("submit").addEventListener('click',todo.add);
document.getElementById("inputData").addEventListener('keydown',function(e){if(e.keyCode==13){todo.add();}});
document.getElementById("todoCheckAll").addEventListener('click',function(){todo.checkAllToggle("todoCheck");});
document.getElementById("finCheckAll").addEventListener('click',function(){todo.checkAllToggle("finCheck");});