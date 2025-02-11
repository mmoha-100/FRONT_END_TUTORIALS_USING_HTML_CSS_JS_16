const inp = document.querySelector(".input");
const add = document.querySelector(".add");
const tasks = document.querySelector(".tasks");

let arrTasks = [];

if (localStorage.getItem("tasks")) {
    arrTasks = getLSData();
}
// Default HTML
updateHTML(arrTasks);

add.onclick = function () {
    if (inp.value != "") {
        addTaskToArray(inp.value);
        inp.value = "";
    }
};

function addTaskToArray(taskTitle) {
    const task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
    };
    arrTasks.push(task);
    addLSData();
    updateHTML(arrTasks);
}

function updateHTML(arrayOfTasks) {
    tasks.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        div.id = task.id;
        div.innerHTML = task.title;
        if (task.completed == true) div.className = "task done";
        let removeBtn = document.createElement("button");
        removeBtn.className = "remove";
        removeBtn.innerHTML = "Remove";
        removeBtn.onclick = removeTask;
        div.append(removeBtn);
        tasks.append(div);
    });
}

function addLSData() {
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function getLSData() {
    return JSON.parse(localStorage.getItem("tasks"));
}

function removeTask() {
    // HTML:
    this.parentElement.remove();
    // Local Storage:
    removeLSTaskData(this.parentElement.id);
}

function removeLSTaskData(taskID) {
    arrTasks = arrTasks.filter((task) => task.id != taskID);
    addLSData(arrTasks);
}

tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("task")) {
        doneChanges(e.target.id);
    }
});

function doneChanges(taskID) {
    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == taskID) {
            arrTasks[i].completed = !arrTasks[i].completed; // Toggle the completed status
            break;
        }
    }
    addLSData();
    updateHTML(arrTasks);
}
