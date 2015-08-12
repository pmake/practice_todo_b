//localStorage.finTodos = JSON.stringify(["f1","f2","f3","f4"]);
todo.getData();
todo.load();
//localStorage.removeItem("todos");
//localStorage.removeItem("finTodos");
// Add listeners.
document.getElementById("submit").addEventListener('click',todo.add);
document.getElementById("inputData").addEventListener('keydown',function(e){if(e.keyCode==13){todo.add();}});
document.getElementById("todoCheckAll").addEventListener('click',function(){todo.checkAllToggle("todoCheck");});
document.getElementById("finCheckAll").addEventListener('click',function(){todo.checkAllToggle("finCheck");});
document.getElementById("moveChecked").addEventListener('click',todo.moveCheckedItems);
document.getElementById("deleteChecked").addEventListener('click',todo.delCheckedItems);
document.querySelector('body').addEventListener('click',function(e){
    //切換勾選
    if(e.target.className=='todoCheck'||e.target.className=='finCheck'){
        if (e.target.checked==true){
            todo.textDeco(e.target.parentElement,true);
        }else{
            todo.textDeco(e.target.parentElement,false);
        }
    }
    //刪除元素
    if(e.target.className === 'todoDelete'){
        todo.deleteItem(e.target.parentNode,'todos');
    }else if(e.target.className === 'finDelete'){
        todo.deleteItem(e.target.parentNode,'finTodos');
    }
});