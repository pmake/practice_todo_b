var todo = (function(){
    var todos = [],finTodos = [];
    // for reducing DOM reading.
    var todoDiv = document.getElementById("todoArea"),
    finDiv = document.getElementById("finArea"),
    todoCheckAll = document.getElementById("todoCheckAll"),
    finCheckAll = document.getElementById("finCheckAll"),
    inputData = document.getElementById("inputData");
    
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
        var text = inputData.value;
        inputData.value ="";
        inputData.focus();
        if(text){
            creEle("li",text,todoDiv);
            todos.push(text);
            ls.setTodos(todos);
        }
    }

    function creEle(element,text,dest){
        var node = document.createElement(element),
        textNode = document.createTextNode(text),
        deleteBt = document.createElement("input"),
        checkBt =document.createElement("input");
        
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
        if((target=="todoCheck" && todoCheckAll.checked==true) || (target=="finCheck" && finCheckAll.checked==true))
        {
            for(var index in checkBoxes){
                checkBoxes[index].checked = true ;
            }
        }
        else
        {
            for(var index in checkBoxes){
                checkBoxes[index].checked = false ;
            }
        }
    }
    return {load:load,add:add,checkAllToggle:checkAllToggle};
}());