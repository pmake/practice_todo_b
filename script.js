var todo = (function(){
    var todos = [],finTodos = [];
    // for reducing DOM reading.
    var todoDiv = document.getElementById("todoArea"),
    finDiv = document.getElementById("finArea");
    
    // functions
    function load(){
        todos = localStorage.todos;
        finTodos = localStorage.finTodos;
    }
    
    function add(){
        creEle("P",document.getElementById("inputData").value,todoDiv);
        document.getElementById("inputData").value ="";
    }
    
    function modify(){
        
    }
    function save(){
     
    }
    function update(){
        
        
    }
    function creEle(element,text,dest){
        var node = document.createElement(element),
        textNode = document.createTextNode(text);
        node.appendChild(textNode);
        dest.appendChild(node);
    }
    return {load:load,add:add,modify:modify,save:save,update:update};
}());

todo.load();

// Add listeners.
document.getElementById("submit").addEventListener('click',todo.add);