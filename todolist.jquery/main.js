let todoList = [];
    
let display = $('<ul class="styleUl"></ul>').appendTo('body');
$('#new-item').on('click', addItem);
$('#Update').on('click', update);
let index;
let newInput = $('#new-input');

function render(){
    display.empty();
    for (let i=0; i<todoList.length; i++){
        $('<li><p>'+todoList[i].content+'</p><button class="deletebutton" onclick= "deleteItem(this)">Delete</button> <button class="editbutton" onclick="editItem(this)">Edit</button>').attr('id',todoList[i].id).appendTo(display);
    }
}

function addItem(){
    let thing ={};
    let input = $('#text-value');
    let textValue = input.val(); 
    if(textValue.length !=0){
    thing.content = textValue;
    thing.id = new Date().getTime();
    todoList.push(thing);
   }
    render();
    input.val(''); 
}

function update(){
    let newTextValue = newInput.val();
    for (let i=0; i<todoList.length; i++){
        if (todoList[i].id == index){
            todoList[i].content = newTextValue;
        }
    } 
    index = '';
    newInput.val('');
    render();
}

function deleteItem(elmt){
    let self = $(elmt).parent();
    for (let i=0; i<todoList.length; i++){
        if (todoList[i].id == self.attr('id')){
            self.remove();
            todoList.splice(i,1);
        }
    } 
}


function editItem(elmt){
    let self = $(elmt).parent();
    for (let i=0; i<todoList.length; i++){
        if (todoList[i].id == self.attr('id')){
            newInput.val(todoList[i].content);
            index = todoList[i].id;
        }
    } 
}