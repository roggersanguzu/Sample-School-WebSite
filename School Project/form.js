const subjects = ["Languages", "Sciences", "Arts", "Sports"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "8AM-9AM",
  "9AM-10AM",
  "10AM-11AM",
  "11AM-12PM",
  "1PM-2PM",
  "2PM-3PM",
];
let selectedCell = null;

const subjectHours = {
  Languages: 10,
  Sciences: 10,
  Arts: 5,
  Sports: 5,
};

function generateTimetable() {
  const timetable = generateInitialTimetable();
  displayTimetable(timetable);
}

function generateInitialTimetable() {
  const timetable = {};
  days.forEach((day) => {
    timetable[day] = {};
    timeSlots.forEach((timeSlot) => {
      timetable[day][timeSlot] = "";
    });
  });

  Object.keys(subjectHours).forEach((subject) => {
    let hours = subjectHours[subject];
    while (hours > 0) {
      const day = days[Math.floor(Math.random() * days.length)];
      const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      if (!timetable[day][timeSlot]) {
        timetable[day][timeSlot] = subject;
        hours--;
      }
    }
  });

  return timetable;
}

function displayTimetable(timetable) {
  const tbody = document.getElementById("timetable-body");
  tbody.innerHTML = "";
  days.forEach((day) => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("th");
    dayCell.textContent = day;
    row.appendChild(dayCell);
    timeSlots.forEach((timeSlot) => {
      const cell = document.createElement("td");
      cell.textContent = timetable[day][timeSlot];
      cell.setAttribute("data-day", day);
      cell.setAttribute("data-time", timeSlot);
      cell.onclick = () => selectCell(cell);
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = cell;
  selectedCell.classList.add("selected");

  const day = cell.getAttribute("data-day");
  const timeSlot = cell.getAttribute("data-time");
  const subject = cell.textContent;

  document.getElementById("day").value = day;
  document.getElementById("timeSlot").value = timeSlot;
  document.getElementById("subject").value = subject;
}

function onFormSubmit() {
  if (validate()) {
    const formData = readFormData();
    updateTimetable(formData);
    resetForm();
  }
}

function readFormData() {
  const formData = {};
  formData["day"] = document.getElementById("day").value;
  formData["timeSlot"] = document.getElementById("timeSlot").value;
  formData["subject"] = document.getElementById("subject").value;
  return formData;
}

function updateTimetable(data) {
  if (selectedCell) {
    const day = selectedCell.getAttribute("data-day");
    const timeSlot = selectedCell.getAttribute("data-time");
    selectedCell.textContent = data.subject;
  }
}

function resetForm() {
  document.getElementById("day").value = "";
  document.getElementById("timeSlot").value = "";
  document.getElementById("subject").value = "";
  if (selectedCell) {
    selectedCell.classList.remove("selected");
    selectedCell = null;
  }
}

function validate() {
  let isValid = true;
  const day = document.getElementById("day").value;
  const timeSlot = document.getElementById("timeSlot").value;
  const subject = document.getElementById("subject").value;

  if (!day || !timeSlot || !subject) {
    isValid = false;
    alert("All fields are required.");
  }

  return isValid;
}
