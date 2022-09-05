import  {Todo} from './Todo.js';
const conteiner=document.querySelector('container');
const todoForm=document.querySelector('.todo-form');
const todaInput=document.querySelector('#input-Todo');
const todoAddButton=document.querySelector('Button_Id');
const UnorderTodoList=document.querySelector('#list');
const messageElement=document.getElementById("message");

//createTodo

const createTodo=(newtodo)=>{
 const  todoElement=document.createElement("li");
 todoElement.id=newtodo.todoId;
 todoElement.classList.add("list-style")
 todoElement.innerHTML=`
 <span>${newtodo.todovalue}</span>
 <span>
 <button class="btn" id="deleteButton">
 <i class="fa fa-trash" aria-hidden="true"></i>
  </button>
 </span>
 `;
 UnorderTodoList.appendChild(todoElement);

  //deleteButton
 const deleteButton=todoElement.querySelector("#deleteButton");


 deleteButton.addEventListener("click",(event)=>{
    const selectedTodo=event.target.parentElement.parentElement.parentElement;
    UnorderTodoList.removeChild(selectedTodo);
    showMessage("Todo is deleted","danger");
    //delete todo from localStorage
    let todos=getTodosFromLocalStorage();
    todos=todos.filter((todo)=>(todo.todoId !==selectedTodo.id));
    localStorage.setItem("mytodos",JSON.stringify(todos));
 })
}


//showmessage
const showMessage=(text,status)=>{
  messageElement.textContent=text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(()=>{
   messageElement.textContent="";
   messageElement.classList.remove(`bg-${status}`)
  },1000)
}


//finding the value
todoForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const todovalue=todaInput.value;
  const todoId=Date.now().toString();
  const newtodo=new Todo(todoId,todovalue);
  createTodo(newtodo);
  showMessage("Todo is added","success");

  //adding Data in Localstorage
  const todos=getTodosFromLocalStorage();
  todos.push(newtodo);
  localStorage.setItem("mytodos",JSON.stringify(todos));
  todaInput.value=" ";
})


//gettodoshfromLocalStorage
const getTodosFromLocalStorage=()=>{
   return localStorage.getItem("mytodos")?
  JSON.parse(localStorage.getItem("mytodos")):[];
}


//
window.addEventListener("DOMContentLoaded",()=>{
  const todos=getTodosFromLocalStorage();
  todos.map((todo)=>{
    createTodo(todo);
  })
})
