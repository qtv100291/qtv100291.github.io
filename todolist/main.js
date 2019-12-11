const todoList = [
    'Đi siêu thị',
    'Đi chơi',
    'Mua sắm quần áo',
    'Làm việc nhà'
];
var ul = document.createElement('ul');
ul.classList.add('styleUl');
let display =    document.getElementsByTagName('body')[0].appendChild(ul);
const newItem = document.getElementById('new-item');
newItem.addEventListener('click',addItem);

// display.innerHTML = render();

function render(){
    display.innerHTML = '';
    for (i=0; i<todoList.length; i++){
        li= document.createElement('li');
        p = document.createElement('p');
        p.innerHTML = todoList[i];
        li.appendChild(p);
        li.classList.add('li');
        deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('deletebutton');
        editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.classList.add('editbutton');
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        ul.appendChild(li);
    }
    var deleteList = document.getElementsByClassName('deletebutton')
    for (i=0; i< deleteList.length; i++){
        deleteList[i].addEventListener('click',deleteItem);
    }
    var editList = document.getElementsByClassName('editbutton')
    for (i=0; i< editList.length; i++){
        editList[i].addEventListener('click',editItem);
    }
    
    
}
render()


function addItem(){
    let input = document.getElementById('text-value');
    let textValue = input.value; 
   if(textValue.length !=0){
    todoList.push(textValue);
   }
   
    render();
    input.value = '';  
}


function deleteItem(){
   this.parentNode.parentNode.removeChild(this.parentNode);
   todoList.splice(this.index,1);
}

function editItem(){
   
    document.getElementsByTagName('p')[this.index].contentEditable ='true';
    
}

