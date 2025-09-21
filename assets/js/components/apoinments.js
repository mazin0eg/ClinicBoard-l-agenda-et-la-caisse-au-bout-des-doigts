const appointments = () => {
    return `
        <div class="page-top-actions">
    <a id="openAppointmentModal" class="btn-add" href="#add-appointment-modal">+ Add Appointment</a>
  </div>

  <div id="add-appointment-modal" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <a href="#" id="closeAppointmentModal" class="close">&times;</a>
      <h2>Add Appointment</h2>
      <form id="appointmentForm">
        <div class="form-grid">
          <input type="text" name="patient" placeholder="Patient Name" required>
          <input type="date" name="date" required>
          <input type="time" name="time" required>
          <input type="text" name="doctor" placeholder="Doctor" required>
          <select name="status" required>
            <option value="">Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <textarea name="notes" placeholder="Additional Notes..." rows="3"></textarea>
        <button type="submit" class="btn-submit">Save Appointment</button>
      </form>
    </div>
  </div>

  <div class="appointments-container">
    <div class="appointments-header">
      <h2>Appointments</h2>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search">
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="appointmentsTableBody"></tbody>
      </table>
    </div>
  </div>
    `;
};
export default appointments;


// Modal
export function initAppointmentModal() {
  const openBtn = document.getElementById("openAppointmentModal");
  const closeBtn = document.getElementById("closeAppointmentModal");
  const modal = document.getElementById("add-appointment-modal");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => (modal.style.display = "block"));
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// Form
export function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const appointmentData = {
      patient: form.patient.value,
      date: form.date.value,
      time: form.time.value,
      doctor: form.doctor.value,
      status: form.status.value,
      notes: form.notes.value,
    };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment saved successfully ✅");
    form.reset();

    renderAppointments();
  });
}


export function renderAppointments() {
  const tbody = document.getElementById("appointmentsTableBody");
  if (!tbody) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  tbody.innerHTML = "";

  appointments.forEach((a) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.patient || ""}</td>
      <td>${a.doctor || ""}</td>
      <td>${a.date || ""}</td>
      <td>${a.time || ""}</td>
      <td>${a.status || ""}</td>
      <td>${a.notes || ""}</td>
      <td>
        <i class="action-icon edit fas fa-edit"></i>
        <i class="action-icon delete fas fa-trash"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });
}