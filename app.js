const form = document.querySelector("#addTodo");
const input = document.querySelector("#todo");
const todoList = document.querySelector("#todoList");
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  newTodo.finished = savedTodos[i].finished ? true : false;
  if (newTodo.finished) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
  const removeBtn = document.createElement("button"); //create the button after the 'li'
  removeBtn.innerText = "Remove Task"; //button text
  newTodo.appendChild(removeBtn); //putting the button at the end of the newly added 'li'
}

// "adding the TODO" via events.
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //   createNewTodo(input.value); //calls function to create todo

  let newTodo = document.createElement("li");
  let todoValue = document.getElementById("todo").value;
  newTodo.innerText = todoValue;
  newTodo.finished = false;
  todoList.appendChild(newTodo);

  savedTodos.push({ task: newTodo.innerText, finished: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  const removeBtn = document.createElement("button"); //create the button after the 'li'
  removeBtn.innerText = "Remove Task"; //button text
  newTodo.appendChild(removeBtn); //putting the button at the end of the newly added 'li'

  form.reset(); //resetting the input field to blank
});

function deleteTodo(index) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let li = e.target.parentElement;
    let index = Array.prototype.indexOf.call(todoList.children, li);
    deleteTodo(index);
    todoList.removeChild(li);
    //if you click a button, remove the "todo"
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    let clickedTodo = e.target;
    let clickedTodoText = e.target.innerText;
    console.log(clickedTodoText);
    if (!clickedTodo.finished) {
      //if the clicked to do is not finished, add the line
      clickedTodo.style.textDecoration = "line-through";
      clickedTodo.finished = true; //this now makes the clicked to do finished
    } else {
      clickedTodo.style.textDecoration = "none"; //if we don't click on the to do (or when its added) no text decoration and considered not finished
      clickedTodo.finished = false;
    }

    for (let i = 0; i < savedTodos.length; i++) {
      if (clickedTodoText.includes(savedTodos[i].task)) {
        savedTodos[i].finished = !savedTodos[i].finished;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    }
  }
});
