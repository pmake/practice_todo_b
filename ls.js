var ls = (function(){
    'use strict';
    var todos=[],finTodos=[];
    
    function getTodos(){
        if(localStorage.todos)
        {
            todos = JSON.parse(localStorage.todos);
        }
        if(localStorage.finTodos){
            finTodos = JSON.parse(localStorage.finTodos);
        }
    }
    function setTodos(curTodos,curFinTodos){
        if(curTodos){
            localStorage.todos = JSON.stringify(curTodos);
        }
        if(curFinTodos){
            localStorage.finTodos = JSON.stringify(curFinTodos);
        }
    }
    
    function passingData(){
        return [todos,finTodos];
    }
    
    return {
        getTodos:getTodos,
        setTodos:setTodos,
        passingData:passingData
    };
}());