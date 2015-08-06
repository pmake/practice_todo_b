var ls = (function(){
    var todos=[],finTodos=[];
    
    function getTodos(){
        if(localStorage.todos)
        {
            todos = JSON.parse(localStorage.todos);
        }
        if(localStorage.finTodos){
            finTodos = JSON.parse(localStorage.finTodos);
        }
        todo.load(todos,finTodos);
    }
    function setTodos(curTodos,curFinTodos){
        if(curTodos){
            localStorage.todos = JSON.stringify(curTodos);
        }
        if(curFinTodos){
            localStorage.finTodos = JSON.stringify(curFinTodos);
        }
    }
    return {getTodos:getTodos,setTodos:setTodos};
}());