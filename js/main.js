let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".delAll")

// Empty Array To Store the Tasks
let arrayOfTasks = [];

// check if there is data in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger get data from local storage function
getDataFromLocalStorage(); 

// add task
submit.onclick = function(){
    if(input.value !== ""){
        addTaskToArray(input.value); // add task to array of tasks
        input.value = ""; // Empty Input field
    }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if(e.target.classList.contains("del")){
        // Remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // Remove Element From page
        e.target.parentElement.remove();
        }
        // task element
        if(e.target.classList.contains("task")){
            // toggle completed for the task
            toggleStatusTaskWith(e.target.getAttribute("data-id"))
            // toggle Done class
            e.target.classList.toggle("done");       
    }

    // Delete All button
    if(e.target.classList.contains("delAll")){
        // remove local storage
        window.localStorage.removeItem("tasks");
        // remove all tasks from the page
        tasksDiv.innerHTML = "";
    }
    // remove delete All button
    if(arrayOfTasks.length === 0){
        tasksDiv.innerHTML = "";
    }

})

function addTaskToArray (taskText){
    // task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push Task To Array of tasks
    arrayOfTasks.push(task);
    // add tasks to page 
    addElementToPageFrom(arrayOfTasks);
    // add tasks to local storage 
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks){
    // Empty task div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append button to main div
        div.appendChild(span);
        // add task div to tasks container
        tasksDiv.appendChild(div);
    });

           // create delete all button
           let delAll = document.createElement("span");
           delAll.className = "delAll";
           delAll.appendChild(document.createTextNode("Delete All"));
           // append button to tasks div
           tasksDiv.appendChild(delAll);

}




function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks" ,JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId){
    for(let i = 0; i< arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}