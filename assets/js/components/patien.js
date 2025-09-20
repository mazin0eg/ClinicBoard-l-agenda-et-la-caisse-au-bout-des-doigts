// patient.js
const patient = () => {
  return `
  <!-- Add Patient Button -->
  <div class="page-top-actions">
    <a class="btn-add" id="openPatientModal" href="javascript:void(0)">+ Add Patient</a>
  </div>

  <!-- Modal -->
  <div id="add-patient-modal" class="modal">
    <div class="modal-content">
      <span class="close" id="closePatientModal">&times;</span>
      <h2>Add Patient</h2>
      <form id="patientForm">
        <label>Full Name:</label>
        <input type="text" name="fullname" required>

        <label>Gender:</label>
        <select name="gender" required>
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Treatment:</label>
        <input type="text" name="treatment" required>

        <label>Mobile:</label>
        <input type="tel" name="mobile" required>

        <label>Admission Date:</label>
        <input type="date" name="admission_date" required>

        <label>Address:</label>
        <textarea name="address" required></textarea>

        <button type="submit">Save Patient</button>
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

  <!-- Modal CSS -->
  <style>
    .modal {
      display: none; 
      position: fixed; 
      z-index: 1000; 
      left: 0; top: 0;
      width: 100%; height: 100%; 
      background-color: rgba(0,0,0,0.5); 
    }

    .modal-content {
      background: #fff; 
      margin: 10% auto; 
      padding: 20px; 
      border-radius: 8px;
      width: 400px;
    }

    .close {
      float: right; 
      font-size: 22px; 
      cursor: pointer;
    }
  </style>
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
