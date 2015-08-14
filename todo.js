//版本b
//待辦1、自動編號2、勾選改切換3、點擊textnode可編輯內容
//4、fin側新增時改置頂
//5、前4項完成後把b版web app打包成mobile本地端不需連網app

var todo = (function(){
    'use strict';
    var todos = [],finTodos = [];
    // for reducing DOM reading.
    var todoDiv = document.getElementById("todoArea"),
    finDiv = document.getElementById("finArea"),
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
    function creEle(element,text,dest,index,atBegin){
        //顯示時才編號，不直接將編號存檔，減少修改
        text =(index+1).toString()+'. '+text;
        var node = document.createElement(element),
        textNode = document.createTextNode(text),
        deleteBt = document.createElement("input"),
        checkBt =document.createElement("input");
        
        node.setAttribute('id',index);
        
        deleteBt.setAttribute("value","X");
        deleteBt.setAttribute("type","button");
        
        checkBt.setAttribute("type","button");
        //區別是哪一邊的checkboxes
        if(dest == todoDiv){
            node.className = "todo";
            deleteBt.className = "todoDelete";
            checkBt.className = "todoCheck";
            checkBt.setAttribute("value","→");
        }
        else{
            node.className = "finTodo";
            deleteBt.className = "finDelete";
            checkBt.className = "finCheck";
            checkBt.setAttribute("value","←");
        }
        node.appendChild(checkBt);
        node.appendChild(textNode);
        node.appendChild(deleteBt);
        if(!atBegin){dest.appendChild(node);}
        else{dest.insertBefore(node,dest.childNodes[2]);}
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
    function refreshText(dest){
        var c = dest.children;
        var i=0;
        if(dest.id==="todoArea"){
            for(i=1;i<c.length;i++){
                c[i].childNodes[1].nodeValue=i+'. '+todos[i-1];
            }
        }else{
            for(i=1;i<c.length;i++){
                c[i].childNodes[1].nodeValue=i+'. '+finTodos[i-1];
            }
        }
    }
    function changeSide(elem,dest){
        if(dest==='todos'){
            var text = todos[elem.id];
            creEle('li',text,finDiv,finTodos.length,true);
            finTodos.unshift(text);
            ls.setTodos(false,finTodos);
            deleteItem(elem,dest);
            resetId(finDiv);
        }else{
            var text = finTodos[elem.id];
            creEle('li',text,todoDiv,todos.length);
            todos.push(text);
            ls.setTodos(todos);
            deleteItem(elem,dest);
        }
        refreshText(todoDiv);
        refreshText(finDiv);
    }
    function changeSideAll(dest){
        if(dest==='todos'){
            todos.forEach(function(element,index){
                creEle("li",element,finDiv,finTodos.length,true);
                //改用concat在迴圈外一次加入減少i/o
                //finTodos.unshift(element);
                //ls.setTodos(false,finTodos);
            });
            todos.reverse();//
            finTodos = todos.concat(finTodos);//
            ls.setTodos(false,finTodos);//
            refreshText(finDiv);
            resetId(finDiv);
            delAllItems(dest);
        }else{
            finTodos.forEach(function(element,index){
                creEle("li",element,todoDiv,todos.length);
                //todos.push(element);
                //ls.setTodos(todos);
            });
            todos = todos.concat(finTodos);
            ls.setTodos(todos);
            refreshText(todoDiv);
            resetId(finDiv);
            delAllItems(dest);
        }
    }
    function delAllItems(dest){
        if(dest==='todos'){
            var items = document.getElementsByClassName('todo');
            //items是物件不能用foreach
            var count = items.length;
            for(var i=0;i<count;i++){
                //items物件每刪1個element就會更新編號，固定第1個可依序刪除
                deleteItem(items[0],'todos');
            }
        }else{
            var items = document.getElementsByClassName('finTodo');
            var count = items.length;
            for(var i=0;i<count;i++){
                deleteItem(items[0],'finTodos');
            }
        }
    }
    function modify(target,dest){
        var width = target.parentNode.clientWidth*0.75,
            oriText = target.textContent,
            seriNum = parseInt(oriText),
            seriNumText = seriNum.toString()+'. ',
            todoText = oriText.substring(seriNum.toString().length+2),
            tempInput = document.createElement('input');
        
        tempInput.setAttribute('value',todoText);
        tempInput.style.width=width + 'px';
        target.replaceChild(tempInput,target.childNodes[1]);
        tempInput.focus();
        tempInput.select();//全選內文
        function replaceText(recover){
            if(dest==='todos'){var targetList=todos;}
            else{var targetList=finTodos;}
            
            if(recover){var newTodoText= todoText;}
            else{var newTodoText= tempInput.value;}
            var newTextNode=document.createTextNode(seriNumText+newTodoText);
            target.replaceChild(newTextNode,target.childNodes[1]);
            targetList[seriNum-1] = newTodoText;
            if(dest==='todos'){ls.setTodos(targetList);}
            else{ls.setTodos(false,targetList);}
        }
        function tempHandler1(e){
            if(e.keyCode===13){
                replaceText();
            }else if(e.keyCode===27){
                tempInput.removeEventListener('blur',tempHandler2);
                replaceText(true);
            }
        }
        function tempHandler2(){
            replaceText();
        }
        //enter或失焦時抓取內容代入textnode替換input elem，若是按esc則還原內容
        tempInput.addEventListener('keydown',tempHandler1);
        tempInput.addEventListener('blur',tempHandler2);
    }
    return {
    getData:getData,
    load:load,
    add:add,
    textDeco:textDeco,
    deleteItem:deleteItem,
    changeSide:changeSide,
    refreshText:refreshText,
    delAllItems:delAllItems,
    changeSideAll:changeSideAll,
    modify:modify
    };
}());