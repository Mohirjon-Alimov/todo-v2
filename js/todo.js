"use strict";
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");

let allBtn = document.querySelector(".allBtn");
let completedBtn = document.querySelector(".completedBtn");
let uncompletedBtn = document.querySelector(".uncompletedBtn");

let allNum = document.querySelector(".allNum");
let CompletedNum = document.querySelector(".CompletedNum");
let uncomNum = document.querySelector(".uncomNum");

let localData = JSON.parse(window.localStorage.getItem("todos"));

const todos = localData || [];

elList.addEventListener("click", function (evt) {
  const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);

  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);

    elList.innerHTML = null;

    allNum.textContent = todos.length;

    window.localStorage.setItem("todos", JSON.stringify(todos));

    if (todos.length === 0) {
      window.localStorage.removeItem("todos");
    }

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    const checkboxId = evt.target.dataset.checkboxBtnId * 1;

    const foundTodo = todos.find((todo) => todo.id === checkboxId);

    foundTodo.isCompleted = !foundTodo.isCompleted;

    window.localStorage.setItem("todos", JSON.stringify(todos));

    elList.innerHTML = null;

    renderTodos(todos, elList);
  }
});

const renderTodos = function (arr, htmlElement) {
  arr.forEach((todo) => {
    const newItem = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    allNum.textContent = todos.length;
    CompletedNum.textContent = todos.filter((todo) => todo.isCompleted === true).length;
    uncomNum.textContent = todos.filter((todo) => todo.isCompleted === false).length;

    CompletedNum.textContent = todos.filter((todo) =>
    todo.isCompleted === true).length;

    uncomNum.textContent = todos.filter((todo) =>
    todo.isCompleted === false).length

    if(todos.length === 0){
      allNum.textContent = 0;
    }else{
      allNum.textContent = todos.length;
    }
    
    newItem.textContent = todo.title;
    newCheckbox.type = "checkbox";
    newDeleteBtn.textContent = "Delete";

    newDeleteBtn.setAttribute("class", "btn btn-outline-danger btn-sm delete-btn");
    newCheckbox.setAttribute("class", "checkbox-btn mx-2")

    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckbox.dataset.checkboxBtnId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    htmlElement.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    
    newItem.appendChild(newDeleteBtn);
  });
};

renderTodos(todos, elList);

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputValue = elInput.value;

  const newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);
  window.localStorage.setItem("todos", JSON.stringify(todos));

  elInput.value = null;
  elList.innerHTML = null;

  renderTodos(todos, elList);
});

allBtn.addEventListener("click", function(){
  elList.innerHTML = null;
  renderTodos(todos, elList);
});

completedBtn.addEventListener("click", function(){
  let completedTodos = todos.filter(function(todo){
    return todo.isCompleted
  });
  elList.innerHTML = null;

  renderTodos(completedTodos, elList)
});

uncompletedBtn.addEventListener("click", function(){
  let unCompletedTodos = todos.filter(function(todo){
    return !todo.isCompleted
  });
  elList.innerHTML = null;

  renderTodos(unCompletedTodos, elList)
});