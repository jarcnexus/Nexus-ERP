// --- NexusERP Interactive Application Logic ---

// Mock Initial Data: Transactions
let transactions = [
    { id: "TXN-94021", dept: "Supply Chain", desc: "Global Logistics Freight Q3", amount: "$42,500.00", status: "Completed", date: "Oct 20, 2026" },
    { id: "TXN-94020", dept: "R&D", desc: "Cloud Server Cluster Upgrade", amount: "$18,200.50", status: "Pending", date: "Oct 19, 2026" },
    { id: "TXN-94019", dept: "Finance", desc: "Q3 Software Licensing Renewal", amount: "$124,000.00", status: "Completed", date: "Oct 18, 2026" },
    { id: "TXN-94018", dept: "Operations", desc: "Warehouse Facility Maintenance", amount: "$9,450.00", status: "Processing", date: "Oct 18, 2026" },
    { id: "TXN-94017", dept: "Marketing", desc: "Enterprise Global Summit Ads", amount: "$31,000.00", status: "Completed", date: "Oct 17, 2026" }
];

// Mock Initial Data: Users & RBAC
let users = [
    { name: "Sarah Jenkins", email: "s.jenkins@enterprise.com", dept: "Executive", role: "Administrator", status: "Active", lastActive: "Just now" },
    { name: "Marcus Thorne", email: "m.thorne@enterprise.com", dept: "Finance", role: "Financial Controller", status: "Active", lastActive: "12 mins ago" },
    { name: "Elena Rostova", email: "e.rostova@enterprise.com", dept: "Supply Chain", role: "Supply Chain Manager", status: "Active", lastActive: "1 hour ago" },
    { name: "David Chen", email: "d.chen@enterprise.com", dept: "Engineering", role: "Standard Viewer", status: "Idle", lastActive: "3 hours ago" },
    { name: "Aisha Patel", email: "a.patel@enterprise.com", dept: "Legal & Compliance", role: "Administrator", status: "Active", lastActive: "5 mins ago" }
];

// Render tables on DOM load
document.addEventListener("DOMContentLoaded", function() {
    renderTransactions(transactions);
    renderUsers(users);
    initCharts();
    calculateROI();
});

// Render Transactions Table
function renderTransactions(data) {
    const tbody = document.getElementById("transactionTableBody");
    tbody.innerHTML = "";
    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-500">No transactions found.</td></tr>`;
        return;
    }
    data.forEach(tx => {
        let statusClass = "bg-brand-950 text-brand-400 border-brand-800/60";
        if(tx.status === "Completed") statusClass = "bg-emerald-950 text-emerald-400 border-emerald-800/60";
        if(tx.status === "Pending") statusClass = "bg-amber-950 text-amber-400 border-amber-800/60";
        if(tx.status === "Processing") statusClass = "bg-blue-950 text-blue-400 border-blue-800/60";

        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
            <td class="py-4 px-6 font-mono text-xs font-semibold text-brand-400">${tx.id}</td>
            <td class="py-4 px-6 text-slate-300 font-medium">${tx.dept}</td>
            <td class="py-4 px-6 text-slate-300">${tx.desc}</td>
            <td class="py-4 px-6 font-semibold text-white">${tx.amount}</td>
            <td class="py-4 px-6"><span class="px-2.5 py-1 rounded-full text-xs font-semibold border ${statusClass}">${tx.status}</span></td>
            <td class="py-4 px-6 text-right text-slate-400 text-xs">${tx.date}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Filter Transactions
function filterTransactions() {
    const query = document.getElementById("txSearch").value.toLowerCase();
    const filtered = transactions.filter(tx => 
        tx.id.toLowerCase().includes(query) || 
        tx.dept.toLowerCase().includes(query) || 
        tx.desc.toLowerCase().includes(query)
    );
    renderTransactions(filtered);
}

// Render Users Table
function renderUsers(data) {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";
    data.forEach((u, index) => {
        let roleBadge = "bg-slate-800 text-slate-300 border-slate-700";
        if(u.role === "Administrator") roleBadge = "bg-brand-950 text-brand-300 border-brand-800";
        if(u.role === "Financial Controller") roleBadge = "bg-purple-950 text-purple-300 border-purple-800";
        if(u.role === "Supply Chain Manager") roleBadge = "bg-blue-950 text-blue-300 border-blue-800";

        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-800/40 transition-colors";
        tr.innerHTML = `
            <td class="py-4 px-6">
                <div class="font-bold text-white">${u.name}</div>
                <div class="text-xs text-slate-400">${u.email}</div>
            </td>
            <td class="py-4 px-6 text-slate-300">${u.dept}</td>
            <td class="py-4 px-6"><span class="px-2.5 py-1 rounded text-xs font-semibold border ${roleBadge}">${u.role}</span></td>
            <td class="py-4 px-6">
                <span class="inline-flex items-center space-x-1.5 text-xs font-medium ${u.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}">
                    <span class="w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
                    <span>${u.status}</span>
                </span>
            </td>
            <td class="py-4 px-6 text-xs text-slate-400">${u.lastActive}</td>
            <td class="py-4 px-6 text-right">
                <button onclick="toggleUserStatus(${index})" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors">Toggle Status</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filter Users
function filterUsers() {
    const query = document.getElementById("userSearch").value.toLowerCase();
    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query) || 
        u.dept.toLowerCase().includes(query)
    );
    renderUsers(filtered);
}

// Toggle User Status
function toggleUserStatus(index) {
    users[index].status = users[index].status === "Active" ? "Idle" : "Active";
    renderUsers(users);
}

// Add New User Modal (Prompt simulation)
function openAddUserModal() {
    const name = prompt("Enter Employee Name:");
    if(!name) return;
    const email = prompt("Enter Work Email:", name.toLowerCase().replace(/\s+/g, '.') + "@enterprise.com");
    if(!email) return;
    const dept = prompt("Enter Department (e.g. Finance, Supply Chain, IT):", "Finance");
    if(!dept) return;
    const role = prompt("Enter Role (Administrator, Financial Controller, Supply Chain Manager, Standard Viewer):", "Standard Viewer");
    
    users.unshift({ name, email, dept, role: role || "Standard Viewer", status: "Active", lastActive: "Just now" });
    renderUsers(users);
}

// Add New Transaction Modal
function addNewTransactionModal() {
    const dept = prompt("Enter Department (Supply Chain, Finance, R&D, Operations):", "Supply Chain");
    if(!dept) return;
    const desc = prompt("Enter Description:", "Enterprise Hardware Procurement");
    if(!desc) return;
    const amountNum = prompt("Enter Amount ($):", "15000");
    if(!amountNum) return;

    const newId = "TXN-" + Math.floor(10000 + Math.random() * 90000);
    const formattedAmount = "$" + Number(amountNum).toLocaleString('en-US', {minimumFractionDigits: 2});
    
    transactions.unshift({ id: newId, dept, desc, amount: formattedAmount, status: "Processing", date: "Today" });
    renderTransactions(transactions);
}

// Refresh Dashboard Data Animation
function refreshDashboardData() {
    const icon = document.getElementById("refreshIcon");
    icon.classList.add("fa-spin");
    setTimeout(() => {
        icon.classList.remove("fa-spin");
        document.getElementById("metricRevenue").innerText = "$" + (4285420 + Math.floor(Math.random() * 10000)).toLocaleString();
        document.getElementById("metricExpenses").innerText = "$" + (1142800 + Math.floor(Math.random() * 2000)).toLocaleString();
        document.getElementById("metricFulfillment").innerText = (98.0 + Math.random() * 0.8).toFixed(1) + "%";
        alert("Dashboard telemetry successfully synchronized with global ERP nodes.");
    }, 800);
}

// --- Chart.js Initializations ---
let financialChartInstance, budgetChartInstance, supplyChainChartInstance, serverLoadChartInstance;

function initCharts() {
    // 1. Financial Chart (Line)
    const ctxFin = document.getElementById('financialChart').getContext('2d');
    financialChartInstance = new Chart(ctxFin, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
                {
                    label: 'Revenue ($)',
                    data: [310000, 340000, 390000, 420000, 410000, 460000, 490000, 520000, 540000, 580000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Expenses ($)',
                    data: [120000, 130000, 125000, 140000, 135000, 145000, 150000, 155000, 160000, 165000],
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.05)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 2. Budget Allocation Chart (Doughnut)
    const ctxBudget = document.getElementById('budgetChart').getContext('2d');
    budgetChartInstance = new Chart(ctxBudget, {
        type: 'doughnut',
        data: {
            labels: ['Supply Chain', 'R&D', 'Operations', 'Marketing'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#a855f7'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '70%'
        }
    });

    // 3. Supply Chain Chart (Bar)
    const ctxSupply = document.getElementById('supplyChainChart').getContext('2d');
    supplyChainChartInstance = new Chart(ctxSupply, {
        type: 'bar',
        data: {
            labels: ['North America', 'EMEA', 'APAC', 'LATAM', 'Oceania'],
            datasets: [{
                label: 'Throughput (k units)',
                data: [42, 38, 51, 24, 19],
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 4. Server Load Chart (Line)
    const ctxServer = document.getElementById('serverLoadChart').getContext('2d');
    serverLoadChartInstance = new Chart(ctxServer, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'CPU Load (%)',
                data: [28, 22, 45, 78, 65, 42],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.3,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' }, max: 100 }
            }
        }
    });
}

// Update Chart Period switch simulation
function updateChartPeriod(period) {
    document.getElementById('btnMonthly').className = period === 'monthly' ? 'px-4 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold transition-all' : 'px-4 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold transition-all';
    document.getElementById('btnQuarterly').className = period === 'quarterly' ? 'px-4 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold transition-all' : 'px-4 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold transition-all';
    document.getElementById('btnYearly').className = period === 'yearly' ? 'px-4 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold transition-all' : 'px-4 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold transition-all';

    if(period === 'monthly') {
        financialChartInstance.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        financialChartInstance.data.datasets[0].data = [310, 340, 390, 420, 410, 460, 490, 520, 540, 580].map(v => v * 1000);
    } else if(period === 'quarterly') {
        financialChartInstance.data.labels = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
        financialChartInstance.data.datasets[0].data = [1040, 1280, 1420, 1580, 1620, 1790, 1850, 1980].map(v => v * 1000);
    } else {
        financialChartInstance.data.labels = ['2022', '2023', '2024', '2025', '2026 (Est.)'];
        financialChartInstance.data.datasets[0].data = [3100, 3800, 4500, 5200, 6400].map(v => v * 1000);
    }
    financialChartInstance.update();
}

// --- ROI Calculator Logic ---
function calculateROI() {
    const employees = parseInt(document.getElementById("sliderEmployees").value);
    const wage = parseInt(document.getElementById("sliderWage").value);
    const hours = parseInt(document.getElementById("sliderHours").value);
    const system = document.getElementById("selectSystem").value;

    document.getElementById("sliderEmployeesVal").innerText = employees;
    document.getElementById("sliderWageVal").innerText = "$" + wage;
    document.getElementById("sliderHoursVal").innerText = hours + " hrs";

    // Efficiency multiplier based on legacy system
    let efficiencyFactor = 0.85; // 85% savings on manual hours
    if(system === 'sap_old') efficiencyFactor = 0.70;
    if(system === 'custom') efficiencyFactor = 0.90;

    // Calculation: 52 weeks * hours * wage * employees * efficiencyFactor
    const annualSavings = Math.round(52 * hours * wage * employees * efficiencyFactor);
    
    // Software cost estimation ($15 per employee per month)
    const annualCost = employees * 15 * 12;
    const multiplier = ((annualSavings / annualCost) * 100).toFixed(0);
    const paybackMonths = ((annualCost / (annualSavings / 12))).toFixed(1);

    document.getElementById("roiSavings").innerText = "$" + annualSavings.toLocaleString();
    document.getElementById("roiMultiplier").innerText = multiplier + "%";
    document.getElementById("roiPayback").innerText = paybackMonths + " Months";
}

// --- Modal Controls ---
function openDemoModal() {
    document.getElementById("demoModal").classList.remove("hidden");
}
function closeDemoModal() {
    document.getElementById("demoModal").classList.add("hidden");
}
function handleDemoSubmit(e) {
    e.preventDefault();
    alert("Demo request successfully submitted! An enterprise solutions architect will contact you within 2 hours.");
    closeDemoModal();
}
