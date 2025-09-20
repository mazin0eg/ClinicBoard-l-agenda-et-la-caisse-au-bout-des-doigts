// patient.js
const patient = () => {
  return `
  <!-- Add Patient Button -->
  <!-- Add Patient Button -->
<div class="page-top-actions">
  <a class="btn-add" href="#add-patient-modal">+ Add Patient</a>
</div>

<!-- Modal -->
<div id="add-patient-modal" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <a href="#" class="close">&times;</a>
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
        <input type="text" name="treatment" placeholder="Treatment" required>
        <input type="date" name="admission_date" required>
      </div>
      <textarea name="notes" placeholder="Additional Notes..." rows="3"></textarea>
      <button type="submit" class="btn-submit">Save Patient</button>
    </form>
  </div>
</div>


  <!-- Patients Table -->
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
        <tbody>
          <tr>
            <td><span class="patient-initials">AC</span> Ashton Cox</td>
            <td>Malaria</td>
            <td><span class="gender-tag male">male</span></td>
            <td><i class="fas fa-phone"></i> 1234567...</td>
            <td>01/15/2024</td>
            <td><i class="fas fa-map-marker-alt"></i> 11, Shya...</td>
            <td>Recovered</td>
            <td><i class="action-icon edit fas fa-edit"></i> <i class="action-icon delete fas fa-trash"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

 
  `;
};

export default patient;

// attach modal events after rendering
export function initPatientModal() {
  const openBtn = document.getElementById("openPatientModal");
  const closeBtn = document.getElementById("closePatientModal");
  const modal = document.getElementById("add-patient-modal");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


 export function initPatientForm() {
  const patientForm = document.getElementById("patientForm");
  if (!patientForm) return; // safety check

  patientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const patientData = {
      fullname: patientForm.fullname.value,
      mobile: patientForm.mobile.value,
      address: patientForm.address.value,
      gender: patientForm.gender.value,
      treatment: patientForm.treatment.value,
      admission_date: patientForm.admission_date.value,
      notes: patientForm.notes.value,
    };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(patientData);
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Patient saved successfully ✅");
    patientForm.reset();
  });
}
