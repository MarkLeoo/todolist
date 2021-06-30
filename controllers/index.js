var arrTaskToDo = [];
var arrTaskDone = [];

var renderText = function () {
    var content = "<tr><td class='text-center' style='font-weight: 400; font-size:18px;font-style: italic;'>Nothing to do</td></tr>";
    document.getElementById("tblTaskDoing").innerHTML = content;
}

renderText();


document.getElementById("btnAddActivity").onclick = function () {
    var task = new Task(document.getElementById("Activity").value, false);
    if (task.taskName.trim() === "") {
        Swal.fire({
            title: 'Oh no!',
            text: 'Please enter an activity!',
            icon: 'error',
        });
        document.getElementById("Activity").focus();
    } else {
        arrTaskToDo.push(task);
        renderTaskToDo(arrTaskToDo);
        luuLocalStorageTaskToDo(arrTaskToDo);
        document.getElementById("Activity").value = "";
    }
}

var renderTaskToDo = function (arr) {
    var content = "";
    if (arr.length === 0) {
        content = "<tr><td class='text-center' style='font-weight: 400; font-size:18px;font-style: italic;'>Nothing to do</td></tr>"
    } else {
        for (var i = 0; i < arr.length; i++) {
            var task = arr[i];
            content += `
            <tr class="border pt-3 mt-3 mb-3">
                <td class="col-10 p-2">${task.taskName}</td>
                <td class="col-2 d-flex justify-content-between p-2">
                    <button class="mr-2" onclick="delTask('${task.taskName}')"><i class="fa fa-trash-alt"></i></button>
                    <button onclick="doneTask('${task.taskName}')"><i class="fa fa-check-circle"></i></button>
                </td>
            </tr>
            <tr class="space"></tr>
            `
        }
    }

    document.getElementById("tblTaskDoing").innerHTML = content;
}

var renderTaskDone = function (arr) {
    var content = "";
    for (var i = 0; i < arr.length; i++) {
        var task = arr[i];
        content += `
        <tr class="border pt-3 mt-3 mb-3">
            <td class="col-10 p-2">${task.taskName}</td>
            <td class="col-2 d-flex justify-content-between p-2">
                <button class="mr-2" onclick="delTask('${task.taskName}')"><i class="fa fa-trash-alt"></i></button>
                <button onclick="rejectTask('${task.taskName}')"><i class="fa fa-check-circle"></i></button>
            </td>
        </tr>
        <tr class="space"></tr>
        `
    }
    document.getElementById("tblTaskDone").innerHTML = content;
}

var doneTask = function (taskName) {
    for (var i = 0; i < arrTaskToDo.length; i++) {
        var task = arrTaskToDo[i];
        if (task.taskName === taskName) {
            task.status = true;
            arrTaskToDo.splice(i, 1);
            arrTaskDone.push(task);
            renderTaskDone(arrTaskDone);
        }
    }
    renderTaskToDo(arrTaskToDo);
    luuLocalStorageTaskDone(arrTaskDone);
    luuLocalStorageTaskToDo(arrTaskToDo);
}

var delTask = function (taskName) {
    for (var i = arrTaskToDo.length - 1; i >= 0; i--) {
        var task = arrTaskToDo[i];
        if (task.taskName === taskName) {
            arrTaskToDo.splice(i, 1);
        }
    }
    renderTaskToDo(arrTaskToDo);
    for (var i = arrTaskDone.length - 1; i >= 0; i--) {
        var task = arrTaskDone[i];
        if (task.taskName === taskName) {
            arrTaskDone.splice(i, 1);
        }
    }
    renderTaskDone(arrTaskDone);
    luuLocalStorageTaskDone(arrTaskDone);
    luuLocalStorageTaskToDo(arrTaskToDo);
}

var rejectTask = function (taskName) {
    for (var i = 0; i < arrTaskDone.length; i++) {
        var task = arrTaskDone[i];
        if (task.taskName === taskName) {
            task.status = false;
            arrTaskToDo.push(task);
            arrTaskDone.splice(i, 1);
            renderTaskToDo(arrTaskToDo);
        }
    }
    renderTaskDone(arrTaskDone);
    luuLocalStorageTaskDone(arrTaskDone);
    luuLocalStorageTaskToDo(arrTaskToDo);
}

var luuLocalStorageTaskToDo = function () {
    var sArray = JSON.stringify(arrTaskToDo);
    localStorage.setItem('arrTaskToDo', sArray);
}
var luuLocalStorageTaskDone = function () {
    var sArray = JSON.stringify(arrTaskDone);
    localStorage.setItem('arrTaskDone', sArray);
}

var getLocalStorageTaskToDo = function () {
    if (localStorage.getItem('arrTaskToDo')) {
        var arrToDo = localStorage.getItem('arrTaskToDo');
        arrTaskToDo = JSON.parse(arrToDo);
        renderTaskToDo(arrTaskToDo);
    }
}
var getLocalStorageTaskDone = function () {
    if (localStorage.getItem('arrTaskDone')) {
        var arrDone = localStorage.getItem('arrTaskDone');
        arrTaskDone = JSON.parse(arrDone);
        renderTaskDone(arrTaskDone);
    }
}

getLocalStorageTaskToDo();
getLocalStorageTaskDone();

var getDateTime = function () {
    var text = document.getElementById("dateTime");
    var day, month, year;
    var dateTime = new Date();
    day = dateTime.getDate();
    month = dateTime.getMonth() + 1;
    year = dateTime.getFullYear();
    switch (month) {
        case 1: {
            month = "January";
            break;
        }
        case 2: {
            month = "February";
            break;
        }
        case 3: {
            month = "March";
            break;
        }
        case 4: {
            month = "April";
            break;
        }
        case 5: {
            month = "May";
            break;
        }
        case 6: {
            month = "June";
            break;
        }
        case 7: {
            month = "July";
            break;
        }
        case 8: {
            month = "August";
            break;
        }
        case 9: {
            month = "September";
            break;
        }
        case 10: {
            month = "October";
            break;
        }
        case 11: {
            month = "November";
            break;
        }
        case 12: {
            month = "December";
            break;
        }
    }
    text.innerHTML = month + " " + day + "," + year;
}
getDateTime();

