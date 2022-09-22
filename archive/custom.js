const todoList = document.querySelector('#todoList');
const editForm = document.querySelector('#editForm');
const editImput = document.querySelector('#editImput');
const todoForm = document.querySelector('#createForm');
const editCancel = document.querySelector('#editCancel');
const createImput = document.querySelector('#createImput');
let oldInputValue;


//FUNCTIONS

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
    // console.log('finalizar');
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

function handleTodo()
{
  handleCreateImput();

  createImput.value = '';
  
  createImput.focus();
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
