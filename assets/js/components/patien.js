export default function patient() {
  return `
  <div class="page-top-actions">
    <a id="openPatientModal" class="btn-add" href="#add-patient-modal">+ Add Patient</a>
  </div>

  <div id="add-patient-modal" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <a href="#" id="closePatientModal" class="close">&times;</a>
      <h2>Add Patient</h2>
      <form id="patientForm">
        <div class="form-grid">
          <input type="text" name="fullname" placeholder="Full Name" required>
          <input type="tel" name="mobile" placeholder="Mobile" required>
          <input type="text" name="address" placeholder="Address" required>
          <select name="gender" required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select name="status" required>
            <option value="">status</option>
            <option value="at appointment">at an appointment</option>
            <option value="was held">was held</option>
          </select>
          <input type="text" name="treatment" placeholder="Treatment" required>
          <input type="date" name="admission_date" required>
        </div>
        <textarea name="notes" placeholder="Additional Notes..." rows="3"></textarea>
        <button type="submit" class="btn-submit">Save Patient</button>
      </form>
    </div>
  </div>

  <div class="patients-container">
    <div class="patients-header">
      <h2>Patients</h2>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search">
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Treatment</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Admission Date</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="patientsTableBody"></tbody>
      </table>
    </div>
  </div>
  `;
}

// Modal
export function initPatientModal() {
  const openBtn = document.getElementById("openPatientModal");
  const closeBtn = document.getElementById("closePatientModal");
  const modal = document.getElementById("add-patient-modal");
  const overlay = modal ? modal.querySelector('.modal-overlay') : null;

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => (modal.style.display = "flex"));
  closeBtn.addEventListener("click", () => modal.style.display = "none");

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  if (overlay) {
    overlay.addEventListener('click', () => (modal.style.display = 'none'));
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
}

// Form
export function initPatientForm() {
  const patientForm = document.getElementById("patientForm");
  if (!patientForm) return;

  patientForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const patientData = {
      fullname: patientForm.fullname.value,
      mobile: patientForm.mobile.value,
      address: patientForm.address.value,
      gender: patientForm.gender.value,
      status: patientForm.status.value,
      treatment: patientForm.treatment.value,
      admission_date: patientForm.admission_date.value,
      notes: patientForm.notes.value,
    };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(patientData);
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Patient saved successfully ✅");
    patientForm.reset();

    // Close modal after save
    const modal = document.getElementById("add-patient-modal");
    if (modal) modal.style.display = "none";

    renderPatients();
  });
}

export function renderPatients() {
  const tbody = document.getElementById("patientsTableBody");
  if (!tbody) return;

  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  tbody.innerHTML = "";

  patients.forEach(p => {
    const initials = (p.fullname || "")
      .split(" ")
      .map(n => n[0] ? n[0].toUpperCase() : "")
      .join("");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="patient-initials">${initials}</span> ${p.fullname || ""}</td>
      <td>${p.treatment || ""}</td>
      <td><span class="gender-tag ${p.gender ? p.gender.toLowerCase() : ""}">${p.gender || ""}</span></td>
      <td><i class="fas fa-phone"></i> ${p.mobile || ""}</td>
      <td>${p.admission_date || ""}</td>
      <td><i class="fas fa-map-marker-alt"></i> ${p.address || ""}</td>
      <td><i class="fas fa-map-marker-alt"></i> ${p.status || ""}</td>
      <td>
        <i class="action-icon edit fas fa-edit"></i>
        <i class="action-icon delete fas fa-trash"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
  