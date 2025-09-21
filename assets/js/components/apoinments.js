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
					<select name="patient" id="appointmentPatientSelect" required>
						<option value="">Select Patient</option>
					</select>
					<input type="date" name="date" required>
					<input type="time" name="time" required>
					<input type="text" name="doctor" placeholder="Doctor" required>
					<input type="number" name="cost" placeholder="Cost" min="0" step="0.01" required>
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
						<th>Cost</th>
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
	const overlay = modal ? modal.querySelector('.modal-overlay') : null;

	if (!openBtn || !closeBtn || !modal) return;

	// Use simple named helpers for clarity
	openBtn.addEventListener("click", showAppointmentModal);
	closeBtn.addEventListener("click", hideAppointmentModal);

	window.addEventListener("click", (e) => {
		if (e.target === modal) modal.style.display = "none";
	});

	if (overlay) {
		overlay.addEventListener('click', hideAppointmentModal);
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') hideAppointmentModal();
	});
}

// Form
export function initAppointmentForm() {
	const form = document.getElementById("appointmentForm");
	if (!form) return;

	// Ensure select has current patients when page loads
	populatePatientSelect();

	// Simple named handler to keep logic easy to follow
	form.addEventListener("submit", handleAddAppointmentSubmit);
}

export function renderAppointments() {
	const tbody = document.getElementById("appointmentsTableBody");
	if (!tbody) return;

		// Get appointments from localStorage
		const list = getAppointments();
	tbody.innerHTML = "";

	list.forEach((a, idx) => {
			// Create nice initials from patient name
			const initials = formatInitials(a.patient);

		const tr = document.createElement("tr");
		tr.innerHTML = `
			<td><span class="patient-initials">${initials}</span> ${a.patient || ""}</td>
			<td><i class="fas fa-user-md"></i> ${a.doctor || ""}</td>
			<td>${formatCurrency(a.cost)}</td>
			<td><i class="far fa-calendar-alt"></i> ${a.date || ""}</td>
			<td><i class="far fa-clock"></i> ${a.time || ""}</td>
			<td><span class="status-tag ${a.status ? a.status.toLowerCase() : ''}">${a.status || ""}</span></td>
			<td>${a.notes || ""}</td>
			<td>
					<div class="row-actions">
						<button type="button" class="table-btn btn-edit" title="Edit">Edit</button>
						<button type="button" class="table-btn btn-delete" title="Delete" data-id="${a.id ?? ''}" data-index="${idx}">Delete</button>
					</div>
			</td>
		`;
		tbody.appendChild(tr);
	});

	
		attachAppointmentTableClickHandler();
}

	// Attach one simple delegated click handler for delete actions
	function attachAppointmentTableClickHandler() {
		const tbody = document.getElementById('appointmentsTableBody');
		if (!tbody) return;

		// Overwrite any previous handler to keep it simple
		tbody.onclick = (e) => {
			if (handleDeleteAppointmentClick(e)) {
				// After delete, re-render to reflect changes
				renderAppointments();
			}
		};
	}


function populatePatientSelect() {
	const select = document.getElementById('appointmentPatientSelect');
	if (!select) return;

	select.innerHTML = '<option value="">Select Patient</option>';

	const patients = getPatients();
	if (patients.length === 0) {
		const opt = document.createElement('option');
		opt.value = '';
		opt.textContent = 'No patients found — add one first';
		opt.disabled = true;
		select.appendChild(opt);
	} else {
		patients.forEach(p => {
			const name = p.fullname || '';
			if (!name) return;
			const opt = document.createElement('option');
			opt.value = name;
			opt.textContent = name;
			select.appendChild(opt);
		});
	}
}


const STORAGE_KEYS = { appointments: 'appointments', patients: 'patients' };

function getAppointments() {
	return JSON.parse(localStorage.getItem(STORAGE_KEYS.appointments)) || [];
}

function saveAppointments(list) {
	localStorage.setItem(STORAGE_KEYS.appointments, JSON.stringify(list));
}

function addAppointment(appt) {
	const list = getAppointments();
	list.push(appt);
	saveAppointments(list);
}

function deleteAppointment(id, index) {
	const list = getAppointments();
	let next = list;
	if (id) {
		next = list.filter(a => String(a.id) !== String(id));
	} else if (typeof index === 'number' && !Number.isNaN(index)) {
		next = list.filter((_, i) => i !== index);
	}
	saveAppointments(next);
}

function getPatients() {
	return JSON.parse(localStorage.getItem(STORAGE_KEYS.patients)) || [];
}

function formatInitials(name) {
	return (name || '')
		.split(' ')
		.map(n => (n[0] ? n[0].toUpperCase() : ''))
		.join('');
}

function formatCurrency(value) {
	const num = Number(value);
	if (Number.isNaN(num)) return '';
	return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(num);
}

function showAppointmentModal() {
	populatePatientSelect();
	const modal = document.getElementById('add-appointment-modal');
	if (modal) modal.style.display = 'flex';
}

function hideAppointmentModal() {
	const modal = document.getElementById('add-appointment-modal');
	if (modal) modal.style.display = 'none';
}

function handleAddAppointmentSubmit(e) {
	e.preventDefault();
	const form = e.target;

	const appointmentData = {
		id: Date.now().toString(),
		patient: form.patient.value,
		date: form.date.value,
		time: form.time.value,
		doctor: form.doctor.value,
		cost: form.cost.value,
		status: form.status.value,
		notes: form.notes.value,
	};

	addAppointment(appointmentData);
	alert('Appointment saved successfully ✅');
	form.reset();
	hideAppointmentModal();
	renderAppointments();
}

	function handleDeleteAppointmentClick(e) {
	const delBtn = e.target.closest('.btn-delete');
	if (!delBtn) return false;

	const id = delBtn.getAttribute('data-id');
	const idxAttr = delBtn.getAttribute('data-index');
	if (!confirm('Are you sure you want to delete this appointment?')) return false;

	deleteAppointment(id, idxAttr ? parseInt(idxAttr, 10) : null);
	return true;
}

