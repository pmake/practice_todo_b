//localStorage.finTodos = JSON.stringify(["f1","f2","f3","f4"]);
todo.getData();
todo.load();
//localStorage.removeItem("todos");
//localStorage.removeItem("finTodos");
// Add listeners.
document.getElementById("submit").addEventListener('click',todo.add);
document.getElementById("inputData").addEventListener('keydown',function(e){if(e.keyCode===13){todo.add();}});
document.getElementById("todoCheckAll").addEventListener('click',function(){todo.changeSideAll('todos');});
document.getElementById("finCheckAll").addEventListener('click',function(){todo.changeSideAll('finTodos');});
document.getElementById("todoDelAll").addEventListener('click',function(){todo.delAllItems('todos');});
document.getElementById("finDelAll").addEventListener('click',function(){todo.delAllItems('finTodos');});
document.querySelector('body').addEventListener('click',function(e){
    switch(e.target.className){
        case 'todoCheck':
            todo.changeSide(e.target.parentNode,'todos');
            break;
        case 'finCheck':
            todo.changeSide(e.target.parentNode,'finTodos');
            break;
        case 'todoDelete':
            todo.deleteItem(e.target.parentNode,'todos');
            todo.refreshText(document.getElementById("todoArea"));
            break;
        case 'finDelete':
            todo.deleteItem(e.target.parentNode,'finTodos');
            todo.refreshText(document.getElementById("finArea"));
            break;
        case 'todo':
            todo.modify(e.target,'todos');
            break;
        case 'finTodo':
            todo.modify(e.target,'finTodos');
            break;
    }
});