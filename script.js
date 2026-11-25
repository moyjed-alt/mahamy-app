
const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(task => task.done).length;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("doneCount").textContent = done;
  document.getElementById("remainingCount").textContent = total - done;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    if (task.done) {
      span.style.textDecoration = "line-through";
      span.style.color = "#94a3b8";
    }

    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  updateStats();
}

function addTask() {
  const text = input.value.trim();

  if (!text) {
    alert("اكتب المهمة أولاً");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    done: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", event => {
  if (event.key === "Enter") addTask();
});

renderTasks();
