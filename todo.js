var todo = (function(){
    'use strict';
    var todos = [],finTodos = [];
    // for reducing DOM reading.
    var todoDiv = document.getElementById("todoArea"),
    finDiv = document.getElementById("finArea"),
    todoCheckAll = document.getElementById("todoCheckAll"),
    finCheckAll = document.getElementById("finCheckAll"),
    inputData = document.getElementById("inputData");
    
    // functions
    function getData(){
        ls.getTodos();
        var data = ls.passingData();
        todos = data[0];
        finTodos = data[1];
    }
    
    function load(){
        if(todos){
            todos.forEach(function(element,index){
                creEle("li",element,todoDiv,index);
            });
        }
        if(finTodos){
            finTodos.forEach(function(element,index){
                creEle("li",element,finDiv,index);
            });
        }
    }
    
    function add(){
        var text = inputData.value;
        inputData.value ="";
        inputData.focus();
        if(text){
            creEle("li",text,todoDiv,todos.length);
            todos.push(text);
            ls.setTodos(todos);
        }
    }

    function creEle(element,text,dest,index){
        var node = document.createElement(element),
        textNode = document.createTextNode(text),
        deleteBt = document.createElement("input"),
        checkBt =document.createElement("input");
        
        node.setAttribute('id',index);
        
        deleteBt.setAttribute("value","X");
        deleteBt.setAttribute("type","button");
        
        checkBt.setAttribute("type","checkbox");
        //區別是哪一邊的checkboxes
        if(dest == todoDiv){
            deleteBt.className = "todoDelete";
            checkBt.className = "todoCheck";
        }
        else{
            deleteBt.className = "finDelete";
            checkBt.className = "finCheck";
        }
        node.appendChild(checkBt);
        node.appendChild(textNode);
        node.appendChild(deleteBt);
        dest.appendChild(node);
    }
    function checkAllToggle(target){
        var checkBoxes = document.getElementsByClassName(target);
        if (target=="todoCheck"){var childrens = document.getElementById("todoArea").children;}
        else{var childrens = document.getElementById("finArea").children;}
        var i=0;
        
        if((target=="todoCheck" && todoCheckAll.checked==true) || (target=="finCheck" && finCheckAll.checked==true))
        {
            for(;i<checkBoxes.length;i++){
                checkBoxes[i].checked = true ;
                textDeco(childrens[i+1],true);
            }
        }
        else
        {
            for(;i<checkBoxes.length;i++){
                checkBoxes[i].checked = false ;
                textDeco(childrens[i+1],false);
            }
        }
    }
    function textDeco(target,decoTrue){
        if(decoTrue){
            target.style.textDecoration = "line-through";
        }else{
            target.style.textDecoration = "none";
        }
    }
    function deleteItem(elem,dest){
        elem.parentNode.removeChild(elem);
        if(dest==='todos'){
            todos.splice(elem.id,1);
            ls.setTodos(todos);
            resetId(todoDiv);
        }else if(dest==='finTodos'){
            finTodos.splice(elem.id,1);
            ls.setTodos(false,finTodos);
            resetId(finDiv);
        }
    }
    function resetId(dest){
        var c = dest.children;
        for(var i=1;i<c.length;i++){
            c[i].id=i-1;
        }
    }
    return {
    getData:getData,
    load:load,
    add:add,
    checkAllToggle:checkAllToggle,
    textDeco:textDeco,
    deleteItem:deleteItem
    };
}());