const todoList = document.querySelector('#todoList');
const editForm = document.querySelector('#editForm');
const editImput = document.querySelector('#editImput');
const todoForm = document.querySelector('#createForm');
const editCancel = document.querySelector('#editCancel');
const createImput = document.querySelector('#createImput');
let oldInputValue;


//FUNCTIONS

function handleTodo()
//? main function to handle
{
  const dataItem = handleImput(); //? verifica se algo foi digitado  
  insertDadaBase(dataItem)
  handleShowTodo()
}

function handleShowTodo()
{
  const arr = getDataBase()

  cleanTodo()
  arr.forEach(function(item) {
    createTodo(item)   
  });
}

function handleImput()
{
  const dataItem = createImput.value;
  
  const objItem = new Object();
  objItem.name = dataItem;  
  if(dataItem){
    return dataItem
  }else{
    alert('erro')
  }
}

function insertDadaBase(dataItem) //? dado do imput
//? para enviar dados
{
  const arr = getDataBase() //? pegar dados já existentes / retorna um array
  arr.push(dataItem) //? coloco o novo dado nesse array
  
  const newData = JSON.stringify(arr) //? transformo o array em string
  localStorage.setItem('item', newData)  //? envia ao banco
  
  createImput.value = '';
  
  createImput.focus();
  return
}

function getDataBase(teste)
//? para pegar dados
{
  const dataItemSaved = localStorage.getItem('item')
  
  if(dataItemSaved){//? verifica se há algum dado
    return JSON.parse(dataItemSaved); //? se sim, retorna o array
  }
  return []//? se não, envia um array vazio
}

function cleanTodo()
{
  const teste = document.getElementById('todoList');
  teste.innerText = ''
}

function createTodo(text)
{
  const todo = document.createElement('div');//? cria div
  todo.classList.add('todo'); //? adiciona classe .todo

  const title = document.createElement('h6');//? cria title
  title.innerText = text; //? valor recebido do imputCreate
  todo.appendChild(title); //? diz: title fica dentro de todo

  const divBtn = document.createElement('div');//? cria div
  divBtn.classList.add('d-flex', 'gap-1'); //? adiciona classe 
  todo.appendChild(divBtn);

  const btnFinish = document.createElement('button');//? cria div
  btnFinish.classList.add('btn', 'btn-danger', 'finish-todo'); //? adiciona classe 
  btnFinish.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  divBtn.appendChild(btnFinish);

  const btnEdit = document.createElement('button');//? cria div
  btnEdit.classList.add('btn', 'btn-danger', 'edit-todo'); //? adiciona classe 
  btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  divBtn.appendChild(btnEdit);

  const btnRemove = document.createElement('button');//? cria div
  btnRemove.classList.add('btn', 'btn-danger', 'remove-todo'); //? adiciona classe 
  btnRemove.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  divBtn.appendChild(btnRemove);

  todoList.appendChild(todo);
}

function handleButtons(e)
{
  //? pega o elemento
  const targetEl = e.target; //! ESTUDAR
  //? closest = pega o elemento parente mais proximo que tenha tal classe
  //? resumindo, ele pega o click do botao, e vai até a div que 
  //? tem a class .todo e coloca ela colo a const parentEl
  const parentEl = targetEl.closest('.todo');
  let todoTitle

  if(parentEl && parentEl.querySelector('h6')){
    todoTitle = parentEl.querySelector('h6').innerText    
  }

  if(targetEl.classList.contains("finish-todo")){//? verifica se contem tal clase
    parentEl.classList.toggle('done');
  }

  if(targetEl.classList.contains("remove-todo")){
    parentEl.remove();
  }

  if(targetEl.classList.contains("edit-todo")){
    handleToggleForms();
    editImput.value = todoTitle;
    oldInputValue = todoTitle
  }
}

const handleToggleForms = () => //!ESTUDAR 
{  
  editForm.classList.toggle('hide')  
  todoForm.classList.toggle('hide')
  todoList.classList.toggle('hide')
}

const handleUpdateTodo = (editInputValue) => //!ESTUDAR 
{
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h6")
    
    console.log(todoTitle);
    console.log(oldInputValue);
    if(todoTitle.innerText === oldInputValue){      
      todoTitle.innerText = editInputValue;
    }
  })

}

//EVENTS
todoForm.addEventListener('submit', (e) => { //! ESTUDAR
  //funcao anonima:
  //permitir passá-la como se 
  //fosse um objeto qualquer, 
  //que você pode atribuir a uma variável
  e.preventDefault();//? não envia form

  handleTodo();
});

editCancel.addEventListener('click', (e) => { 
  e.preventDefault();

  handleToggleForms();
});

document.addEventListener("click", (e) => { //! não especifica o elemento
  handleButtons(e)
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const editInputValue = editImput.value;

  if (editInputValue) {
    handleUpdateTodo(editInputValue);
  }

  handleToggleForms();  
});

// searchImput.onkeypress = function(){
//     const selectTodos = document.querySelectorAll('h6');
//     const arr = selectTodos;

//     arr.forEach(function(item, indice,
//     array){
//       const itemArr = item.innerText;
//       const itemSearch = searchImput.innerText;
//       if(itemArr === itemSearch){
//         console.log('igual');
//       }
//       console.log(item, indice);
//     });

//     // console.log(searchImput.value);
//     // console.log(arr);
    
//   };
