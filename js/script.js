
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


// Membership plan editor
(() => {
    const modal = document.getElementById("membershipModal");
    const form = document.getElementById("membershipForm");
    const cards = document.getElementById("membershipCards");
    const openButton = document.getElementById("openMembershipModal");
    const closeButton = document.getElementById("closeMembershipModal");
    const cancelButton = document.getElementById("cancelMembershipModal");
    if (!modal || !form || !cards || !openButton) return;
    let editingCard = null;
    const fields = { shortCode:document.getElementById("membershipShortCode"), fee:document.getElementById("membershipFee"), duration:document.getElementById("membershipDuration"), members:document.getElementById("membershipMembers"), days:document.getElementById("membershipDays") };
    const setModalState = (isOpen) => { modal.hidden = !isOpen; if (isOpen) fields.shortCode.focus(); };
    const resetForm = () => { form.reset(); editingCard = null; document.getElementById("membershipModalTitle").textContent = "Add/Edit Membership Plan"; };
    const getPlanData = () => ({ shortCode:fields.shortCode.value.trim(), fee:Number(fields.fee.value || 0).toFixed(2), duration:fields.duration.value, members:fields.members.value, days:fields.days.value || "0" });
    const updateCard = (card, plan) => { card.dataset.plan=plan.shortCode; card.dataset.fee=plan.fee; card.dataset.duration=plan.duration; card.dataset.members=plan.members; card.dataset.term=plan.days; card.dataset.days=plan.days; card.querySelector("h2").textContent=plan.shortCode; const values=card.querySelectorAll(".membership-card__details p span"); values[0].textContent=plan.members; values[1].textContent=`$${plan.fee}`; values[2].textContent=plan.duration; values[3].textContent=plan.days; };
    openButton.addEventListener("click", () => { resetForm(); setModalState(true); });
    cards.addEventListener("click", (event) => { const button=event.target.closest(".edit-membership-button"); if (!button) return; editingCard=button.closest(".membership-card"); fields.shortCode.value=editingCard.dataset.plan; fields.fee.value=editingCard.dataset.fee; fields.duration.value=editingCard.dataset.duration; fields.members.value=editingCard.dataset.members; fields.days.value=editingCard.dataset.days || editingCard.dataset.term || "0"; document.getElementById("membershipModalTitle").textContent="Edit Membership Plan"; setModalState(true); });
    form.addEventListener("submit", (event) => { event.preventDefault(); const plan=getPlanData(); if (editingCard) updateCard(editingCard,plan); else { const card=document.createElement("article"); card.className="membership-card"; card.innerHTML='<header><h2></h2><i class="fa-solid fa-medal" aria-hidden="true"></i></header><div class="membership-card__details"><p><strong>Members:</strong><span></span></p><p><strong>Fee:</strong><span></span></p><p><strong>Duration:</strong><span></span></p><p><strong>Term:</strong><span></span></p><button class="edit-membership-button" type="button">Edit</button></div>'; cards.appendChild(card); updateCard(card,plan); } setModalState(false); resetForm(); });
    [closeButton,cancelButton].forEach((button) => button.addEventListener("click", () => { setModalState(false); resetForm(); }));
    modal.addEventListener("click", (event) => { if (event.target === modal) { setModalState(false); resetForm(); } });
})();
