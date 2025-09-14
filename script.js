const taskList = [
  {
    timestamp: Date.now() + 1,
    task: "Welcome to Simple To-Do App",
    completed: false,
  },
  {
    timestamp: Date.now() + 2,
    task: "Click the item to change the status",
    completed: true,
  },
  {
    timestamp: Date.now() + 3,
    task: "Click 'x' button to delete",
    completed: false,
  },
];

const taskStatus = ["all", "active", "completed"];
let activeStatus = taskStatus[0];
const taskGroup = {
  all: {
    data: taskList,
    placeholder: "Task is empty",
  },
  active: {
    data: taskList.filter((t) => !t.completed),
    placeholder: "There's no active task",
  },
  completed: {
    data: taskList.filter((t) => t.completed),
    placeholder: "There's no completed task",
  },
};

const tasksContainer = document.getElementById("tasksContainer");
const addButton = document.getElementById("addButton");
const inputTask = document.getElementById("inputTask");
const taskForm = document.getElementById("taskForm");

function renderList() {
  tasksContainer.innerHTML = "";

  const filteredTask = taskGroup[activeStatus].data;

  if (filteredTask.length) {
    filteredTask.forEach((task) => {
      const li = document.createElement("li");
      if (task.completed) {
        li.classList.add("completed");
      }

      li.innerHTML = `
        
                <button class="delete" data-timestamp="${
                  task.timestamp
                }">&times;</button>
                <label class="task" data-timestamp="${task.timestamp}">
                <span>${task.task} <small>${new Date(
        task.timestamp
      ).toLocaleString()}</small></span>
                <input class="taskCheck" type="checkbox" data-timestamp="${
                  task.timestamp
                }" ${task.completed ? "checked" : ""} />
                </label>
    
        `;

      tasksContainer.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.classList.add("placeholder");
    li.innerHTML = `
        <span>${taskGroup[activeStatus].placeholder}</span>
     `;
    tasksContainer.appendChild(li);
  }
}

function toggleTaskStatus(timestamp) {
  const task = taskList.find((t) => t.timestamp === Number(timestamp));
  if (task) {
    task.completed = !task.completed;
    renderList();
  }
}

function deleteTask(timestamp) {
  const index = taskList.findIndex((t) => t.timestamp === Number(timestamp));
  console.log(index);
  if (index !== -1) {
    taskList.splice(index, 1);
    renderList();
  }
}

function addTask(title) {
  const newTask = {
    timestamp: Date.now(),
    task: title,
    completed: false,
  };

  taskList.push(newTask);
  renderList();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputTask.value.trim();
  if (title) {
    addTask(title);
    inputTask.value = "";
    addButton.disabled = true;
  }
});

inputTask.addEventListener("input", () => {
  addButton.disabled = inputTask.value.trim() === "";
});

document.body.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"][data-timestamp]')) {
    toggleTaskStatus(e.target.dataset.timestamp);
  }
});

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".delete[data-timestamp]")) {
    deleteTask(e.target.dataset.timestamp);
  }
});

renderList();
