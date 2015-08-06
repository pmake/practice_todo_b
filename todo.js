var todo = (function(){
    var todos = [],finTodos = [];
    // for reducing DOM reading.
    var todoDiv = document.getElementById("todoArea"),
    finDiv = document.getElementById("finArea");
    
    // functions
    function load(lsTodos,lsFinTodos){
        todos = lsTodos;
        finTodos = lsFinTodos;
        if(todos){
            todos.forEach(function(element,index){
                creEle("li",element,todoDiv);
            });
        }
        if(finTodos){
            finTodos.forEach(function(element,index){
                creEle("li",element,finDiv);
            });
        }
    }
    
    function add(){
        var text = document.getElementById("inputData").value;
        document.getElementById("inputData").value ="";
        if(text){
            creEle("li",text,todoDiv);
            todos.push(text);
            ls.setTodos(todos);
        }
    }

    function creEle(element,text,dest,index){
        var node = document.createElement(element),
        textNode = document.createTextNode(text),
        deleteBt = document.createElement("input"),
        shiftBt =document.createElement("input");
        
        deleteBt.setAttribute("id","deleteBt_"+index);
        deleteBt.setAttribute("value","X");
        deleteBt.setAttribute("type","button");
        deleteBt.className = "delete"
        
        shiftBt.setAttribute("id","shiftBt_"+index);
        shiftBt.setAttribute("value","C");
        shiftBt.setAttribute("type","button");
        shiftBt.className = "shift"
        
        node.appendChild(shiftBt);
        node.appendChild(textNode);
        node.appendChild(deleteBt);
        dest.appendChild(node);
    }
    return {load:load,add:add};
}());