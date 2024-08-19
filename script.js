// selecting input , button , ul 

var inputbox=document.getElementById("todo-input")
var addbutton=document.getElementById("add-button")
var listitem=document.getElementById("todos")
const progressBar = document.getElementById("progress");
const numbers = document.getElementById("numbers");
const filters = document.querySelectorAll('.filter');


function toadd(){
    if (inputbox.value.trim() === '') return; // avoid adding empty tasks
    var newitem=document.createElement("li")
    newitem.innerHTML=inputbox.value   
    newitem.style.color="white"
     newitem.style.backgroundColor="#e6b7eca1"

    newitem.addEventListener('click', () => {
        newitem.classList.toggle('completed');
        updateProgress();
    });
    listitem.appendChild(newitem)
    inputbox.value='' ; // clear input box
    updateProgress();
   

}
// function to update the progress bar
function updateProgress() {
    const totalTasks = listitem.children.length;
    const completedTasks = document.querySelectorAll('#todos li.completed').length;
    
    // Update progress bar width
    const progressPercentage = (totalTasks === 0) ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.style.backgroundColor= "#e6b7eca1"
    
    // Update numbers display
    numbers.textContent = `${completedTasks}/${totalTasks}`;
}

// Example of making sure button visibility is not affected by filter logic
function ensureButtonVisible() {
    addbutton.style.display = 'block'; // Ensure the add button is visible
}

// Call this function in case any logic might hide it
ensureButtonVisible();

// Event listener for add button
addbutton.addEventListener('click', toadd);

document.querySelector('.delete-all').addEventListener('click',() => {
    listitem.innerHTML='';
    updateProgress();
});

// filter functionality 
filters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove 'active' class from all filters
        filters.forEach(f => f.classList.remove('active'));

        // Add 'active' class to the clicked filter
        filter.classList.add('active');

        const filterType = filter.getAttribute('data-filter');
        const todoItems = listitem.querySelectorAll('li');

        todoItems.forEach(item => {
            if (filterType === 'completed') {
                item.style.display = item.classList.contains('completed') ? 'block' : 'none';
            } else if (filterType === 'pending') {
                item.style.display = !item.classList.contains('completed') ? 'block' : 'none';
            } else {
                item.style.display = 'block';
            }
        });
    });
});




