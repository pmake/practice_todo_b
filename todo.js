//版本b
//待辦1、自動編號2、勾選改切換3、點擊textnode可編輯內容
//4、前3項完成後把b版web app打包成mobile本地端不需連網app

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
            node.className = "todo";
            deleteBt.className = "todoDelete";
            checkBt.className = "todoCheck";
        }
        else{
            node.className = "finTodo";
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
    function moveCheckedItems(){
        var checkedInputs = document.querySelectorAll("input:checked");
        for(var i=0;i<checkedInputs.length;i++){
            if(checkedInputs[i].className==="todoCheck"){
                var text =checkedInputs[i].parentNode.textContent;
                creEle('li',text,finDiv,finTodos.length);
                finTodos.push(text);
                ls.setTodos(false,finTodos);
                deleteItem(checkedInputs[i].parentNode,'todos');
            }else if(checkedInputs[i].className==="finCheck"){
                var text =checkedInputs[i].parentNode.textContent;
                creEle('li',text,todoDiv,todos.length);
                todos.push(text);
                ls.setTodos(todos);
                deleteItem(checkedInputs[i].parentNode,'finTodos');
            }
        }
        document.getElementById("todoCheckAll").checked = false;
        document.getElementById("finCheckAll").checked = false;
    }
    function delCheckedItems(){
        var checkedInputs = document.querySelectorAll("input:checked");
        for(var i=0;i<checkedInputs.length;i++){
            if(checkedInputs[i].className === "todoCheck"){
                deleteItem(checkedInputs[i].parentNode,'todos'); 
            }else if(checkedInputs[i].className === "finCheck"){
                deleteItem(checkedInputs[i].parentNode,'finTodos');
            }
        }
        document.getElementById("todoCheckAll").checked = false;
        document.getElementById("finCheckAll").checked = false;
    }
    return {
    getData:getData,
    load:load,
    add:add,
    checkAllToggle:checkAllToggle,
    textDeco:textDeco,
    deleteItem:deleteItem,
    delCheckedItems:delCheckedItems,
    moveCheckedItems:moveCheckedItems
    };
}());