let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.name}</strong><br>
      Deadline: ${task.deadline}
      <button onclick="deleteTask(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const name = document.getElementById("taskInput").value;
  const deadline = document.getElementById("deadlineInput").value;

  if (name === "" || deadline === "") return;

  tasks.push({ name, deadline });
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("deadlineInput").value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
