
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
        document.getElementById("change").innerHTML = "<";
    } else {
        sidebar.style.left = "-250px";
        document.getElementById("change").innerHTML = ">";
    }
}


function toggleTopNavBar() {
    const topnav = document.getElementById("topNavbarUl");
    if (topnav.style.maxHeight === "0px") {
        topnav.style.maxHeight = "500px";
    } else {
        topnav.style.maxHeight = "0px";
    }
}

const date2 = new Date();
const formattedDate2 = date2.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
let setRequireDate = document.getElementById("setRequirementTabDate");
if (setRequireDate) {
    setRequireDate.textContent = formattedDate2;
}

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

let requireDateId = document.getElementById("requirementTabDate");
if (requireDateId) {
    requireDateId.textContent = formattedDate;
}
let rankDateId = document.getElementById("rankPageDate");
if (rankDateId) {
    rankDateId.textContent = formattedDate;
}

const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
let dateElement = document.getElementById("dateDisplay");

if (dateElement) {
    dateElement.textContent = date.toLocaleDateString('en-US', options);
}

let birthdayId = document.getElementById("birthdayPageDate");
if (birthdayId) {
    birthdayId.textContent = textContent = date.toLocaleDateString('en-US', options);
}

function addClassSchedule(event) {
    debugger;
    event.preventDefault();
    const selectedDay = document.getElementById("day").value;
    const selectedStartTime = document.getElementById("startTime").value;
    if(selectedDay==""){
    alert("select a day");
    return false;
    }
    if(selectedStartTime==""){
        alert("select a StartTime");
        return false;
        }
    const formatedStartTime = timeFormat(selectedStartTime);
    const selectedEndTime = document.getElementById("endTime").value;
    if(selectedEndTime==""){
        alert("select Ending Time");
        return false;
        }
    const formatedEndTime = timeFormat(selectedEndTime);
    let tableData = document.getElementById("tableBody");
    tableData.innerHTML += `<tr><td> ${selectedDay}</td ><td>${formatedStartTime}</td><td>${formatedEndTime}</td></tr>`;

}
function timeFormat(selectedTime) {
    let [hours, minutes] = selectedTime.split(":").map(Number);
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

    return `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
}

