export default function dashboard() {
    return `
    <div class="dashboard-container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="label">Total Patients</div>
                <div class="value" id="totalPatientsCount">0</div>
            </div>
            <div class="stat-card">
                <div class="label">Total Appointments</div>
                <div class="value" id="totalAppointmentsCount">0</div>
            </div>
            <div class="stat-card">
                <div class="label">Today’s Appointments</div>
                <div class="value" id="todaysAppointmentsCount">0</div>
            </div>
        </div>

        <div class="two-column">
            <div class="panel">
                <div class="panel-header">
                    <h3>Today’s Appointments</h3>
                </div>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody id="todaysAppointmentsTbody"></tbody>
                    </table>
                </div>
            </div>

            <div class="panel side">
                <div class="panel-header">
                    <h3>Today’s Recette</h3>
                </div>
                <div class="recette-amount" id="todaysRecetteAmount">$0.00</div>
            </div>
        </div>
    </div>
    `;
}

// Initialize dashboard numbers and table
export function initDashboard() {
    const patients = readLS('patients');
    const appts = readLS('appointments');

    const todayStr = getTodayStr();
    const todays = appts.filter(a => a && a.date === todayStr);

    // Top stats
    setText('totalPatientsCount', patients.length);
    setText('totalAppointmentsCount', appts.length);
    setText('todaysAppointmentsCount', todays.length);

    // Recette
    const totalRecette = todays.reduce((sum, a) => sum + (parseFloat(a.cost) || 0), 0);
    setText('todaysRecetteAmount', formatCurrency(totalRecette));

    // Table
    const tbody = document.getElementById('todaysAppointmentsTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (todays.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" style="text-align:center;color:#777;">No appointments today</td>`;
        tbody.appendChild(tr);
        return;
    }

    // Optional: sort by time
    todays.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    todays.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${a.patient || ''}</td>
            <td>${a.doctor || ''}</td>
            <td>${a.time || ''}</td>
            <td>${a.status || ''}</td>
            <td>${formatCurrency(a.cost)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Small helpers
function readLS(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
}

function getTodayStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function formatCurrency(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return '';
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(num);
}