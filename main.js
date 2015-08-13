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
    //改switch
    if(e.target.className=='todoCheck'){
        todo.changeSide(e.target.parentNode,'todos');
    }else if(e.target.className=='finCheck'){
        todo.changeSide(e.target.parentNode,'finTodos');
    }else if(e.target.className === 'todoDelete'){
        todo.deleteItem(e.target.parentNode,'todos');
        todo.refreshText(document.getElementById("todoArea"));
    }else if(e.target.className === 'finDelete'){
        todo.deleteItem(e.target.parentNode,'finTodos');
        todo.refreshText(document.getElementById("finArea"));
    }else if(e.target.className === 'todo'){
        todo.modify(e.target,'todos');
    }else if(e.target.className === 'finTodo'){
        todo.modify(e.target,'finTodos');
    }
});