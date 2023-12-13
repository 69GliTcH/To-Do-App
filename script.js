const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

const tasks = localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
showAllTasks();

function showAllTasks() { //loops the array ans maske task div and apppend it
    tasks.forEach((value, index) => {
        //creating cpmmentd out div from html file
        const div = document.createElement("div");
        div.setAttribute("class", "task");
        const innerDiv = document.createElement("div");
        div.append(innerDiv);
        const p = document.createElement("p");
        p.innerText = value.title;
        innerDiv.append(p)
        const span = document.createElement("span");
        span.innerText = value.description;
        innerDiv.append(span)
        const delBtn = document.createElement("button");
        delBtn.setAttribute("class", "delBtn");
        delBtn.innerText = "-";
        delBtn.addEventListener("click",()=>{
            removeTask();
            tasks.splice(index,1); //remove from array
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showAllTasks();
        });
        div.append(delBtn);
        container.append(div);
    });
};

function removeTask() {    // to remove previous saved array
    tasks.forEach(() => {
        const div = document.querySelector(".task");
        div.remove();
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();     //to  stop the reloading of page
    removeTask();
    tasks.push({
        title: title.value,
        description: description.value,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showAllTasks();
});