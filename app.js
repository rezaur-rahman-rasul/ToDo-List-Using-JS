// UI DEFINES
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");



loadEventListeners();
    // CUSTOM Function: loadEventListeners() 
function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', getTasks);

}

    // Function 1:  addTask()
function addTask(e){
if(taskInput.value === ' '){
    alert('Please Add A Task');
}else{
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class ='fa fa-remove'> </i>";
    
    li.appendChild(link);
    taskList.appendChild(li);

//Add Task in Local Stroge
    addTaskInLocalStorage(taskInput.value);
}
    e.preventDefault();
}

    // Function 2:   removeTask()
function  removeTask(e){
   if(e.target.parentElement.classList.contains("delete-item")){
       if(confirm("Are you sure?")){
           e.target.parentElement.parentElement.remove();

           //Remove Task From Local Stroge
           removeTaskFromLocalStorage(e.target.parentElement.parentElement );
       }
   }
        e.preventDefault();
    }

    // Function 3:   clearTask()
    function clearTask(e){
        taskList.innerHTML = '';

        //Clear From Local Storage
        clearFromLocalStorage();  
    }

    // Function 4:  filterTask() 
    function filterTask(e){
        const text= e.target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach(function (task) {
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
          } else {
            task.style.display = 'none';
          }
        });
    }

    // Function 5:   addTaskInLocalStorage()   
    function     addTaskInLocalStorage(newTask){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function 5:    removeTaskFromLocalStorage()
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function (task, index){
    
            if(taskItem.textContent === task){
                task.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function 6:    getTasks()
   function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task){

    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class ='fa fa-remove'> </i>";
    
    li.appendChild(link);

    taskList.appendChild(li);

    })
   }
   // Function 7:   clearFromLocalStorage()
  function clearFromLocalStorage(){
      localStorage.clear();
  }