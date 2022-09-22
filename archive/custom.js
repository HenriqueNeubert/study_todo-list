const todoList = document.querySelector('#todoList');
const editForm = document.querySelector('#editForm');
const editImput = document.querySelector('#editImput');
const todoForm = document.querySelector('#createForm');
const editCancel = document.querySelector('#editCancel');
const createImput = document.querySelector('#createImput');



//FUNCTIONS
function handleTodo()
{
  handleCreateImput();

  createImput.value = '';
  
  createImput.focus();
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
  btnEdit.classList.add('btn', 'btn-danger', 'finish-todo'); //? adiciona classe 
  btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  divBtn.appendChild(btnEdit);

  const btnRemove = document.createElement('button');//? cria div
  btnRemove.classList.add('btn', 'btn-danger', 'remove-todo'); //? adiciona classe 
  btnRemove.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  divBtn.appendChild(btnRemove);

  todoList.appendChild(todo);
}

function handleCreateImput()
{
  const createImputValue = createImput.value;

  if(createImputValue){
    createTodo(createImputValue)
  }
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

document.addEventListener("click", (e) => { //! não especifica o elemento
  const targetE1 = e.target; //! ESTUDAR
  //? pega o elemento


  if(targetE1.classList.contains("finish-todo")){//? verifica se contem tal clase
    console.log('finalizar');
  }

});
