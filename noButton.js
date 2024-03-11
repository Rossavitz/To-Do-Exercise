const form = document.querySelector("#addTodo");
const input = document.querySelector("#todo");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.finished = savedTodos[i].finished ? true : false;
  if (newTodo.finished) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoList = document.querySelector("#todoList");
  const newTodo = document.createElement("li"); //create the empty 'li'
  newTodo.innerText = input.value; //giving the empty 'li' a value
  todoList.appendChild(newTodo); //attaching the new 'li' to the end of the 'ul'
  input.value = ""; //resetting the input field to blank
  savedTodos.push({ task: newTodo.innerText, finished: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    let clickedTodo = e.target;
    if (!clickedTodo.finished) {
      //if the clicked to do is not finished, add the line
      clickedTodo.style.textDecoration = "line-through";
      clickedTodo.finished = true; //this now makes the clicked to do finished
    } else {
      clickedTodo.style.textDecoration = "none"; //if we don't click on the to do (or when its added) no text decoration and considered not finished
      clickedTodo.finished = false;
    }

    for (let i = 0; i < savedTodos.length; i++) {
      if (savedTodos[i].task === clickedTodo.innerText) {
        savedTodos[i].finished = !savedTodos[i].finished;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    }
  }
});
