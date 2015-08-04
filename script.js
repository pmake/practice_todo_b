function add(){
    var cont = document.createElement("p");
    document.body.appendChild(cont);
     cont.innerHTML = document.getElementById("context").value;
}

document.getElementById("submit").addEventListener('click',add);