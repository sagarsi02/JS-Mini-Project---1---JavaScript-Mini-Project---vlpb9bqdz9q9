showtask();
let addtitle = document.getElementById("addtitle"); // Input Section
let addnotesbtn = document.getElementById("addnotesbtn"); // add Button 

// Add Local Storage
addnotesbtn.addEventListener("click", function() {
    addtitleval = addtitle.value;
    if (addtitleval.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskobj = [];
        } else {
            taskobj = JSON.parse(webtask);
        }
        taskobj.push(addtitleval);
        localStorage.setItem("localtask", JSON.stringify(taskobj));
        addtitle.value = '';
    } else {
        alert("Please Enter Title");
    }
    showtask();
});


// Show To-Do List
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskobj = [];
    } else {
        taskobj = JSON.parse(webtask);
    }
    let html = '';
    let tasklist = document.getElementById("tasklist");
    taskobj.forEach((item, index) => {
        html += `<tr>
            <th scope="row">${index+1}</th>
            <td>${item}</td>
            <td>
                <button type="button" class="btn btn-success btn-sm" onclick="edittask(${index})">Edit</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger btn-sm" onclick="deletetask(${index})">Delete</button>
            </td>
        </tr>`;
    });
    tasklist.innerHTML = html;
}

// Edit To-Do List
function edittask(index) {
    let saveindex = document.getElementById("saveindex");
    let addnotesbtn = document.getElementById("addnotesbtn");
    let savenotesbtn = document.getElementById("savenotesbtn");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtitle.value = taskobj[index];
    saveindex.value = index;
    addnotesbtn.style.display = "none";
    savenotesbtn.style.display = "block";
}

// Update Task

let savenotesbtn = document.getElementById("savenotesbtn");
savenotesbtn.addEventListener("click", function() {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    taskobj[saveindex] = addtitle.value;
    // Button Disable or enable
    let addnotesbtn = document.getElementById("addnotesbtn");
    addnotesbtn.style.display = "block";
    savenotesbtn.style.display = "none";
    addtitle.value = '';
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
})

// Delete task
function deletetask(index) {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
}

// Delete all task
function deleteall() {
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    if (taskobj.length > 0) {
        taskobj.splice(0, webtask.length);
    } else {
        alert("No task here");
    }
    let addnotesbtn = document.getElementById("addnotesbtn");
    let savenotesbtn = document.getElementById("savenotesbtn");
    savenotesbtn.style.display = "none";
    addnotesbtn.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
}