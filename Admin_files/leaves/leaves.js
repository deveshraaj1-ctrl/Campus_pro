// Campus Pro Admin - Leaves Management
document.addEventListener('DOMContentLoaded', function() {
    loadLeaveRequests();
    setupEventListeners();
    updateMetrics();
});

// Load and display leave requests
function loadLeaveRequests() {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const tbody = document.getElementById('leavesTableBody');
    
    tbody.innerHTML = '';
    
    requests.forEach((request, index) => {
        const row = createLeaveRow(request, index);
        tbody.appendChild(row);
    });
    
    updateMetrics();
}

// Create table row for each leave request
function createLeaveRow(request, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>
            <div class="student-info">
                <span class="student-id">${request.studentId}</span>
                <span class="student-name">${request.studentName}</span>
            </div>
        </td>
        <td>${new Date(request.date).toLocaleDateString()}</td>
        <td><span class="leave-type">${request.type}</span></td>
        <td>${request.reason}</td>
        <td>
            <span class="status ${request.status.toLowerCase()}">${request.status}</span>
        </td>
        <td>
            ${request.status === 'pending' ? 
                `<div class="action-buttons">
                    <button class="btn-approve" onclick="approveLeave(${index})" title="Approve">✅</button>
                    <button class="btn-reject" onclick="rejectLeave(${index})" title="Reject">❌</button>
                </div>` : 
                `<span class="action-complete">${request.status}</span>`
            }
        </td>
    `;
    return row;
}

// Approve leave request
function approveLeave(index) {
    updateLeaveStatus(index, 'approved');
    showNotification('Leave approved successfully!', 'success');
}

// Reject leave request
function rejectLeave(index) {
    updateLeaveStatus(index, 'rejected');
    showNotification('Leave rejected!', 'error');
}

// Update leave status
function updateLeaveStatus(index, status) {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    requests[index].status = status;
    requests[index].adminActionDate = new Date().toISOString();
    
    localStorage.setItem('leaveRequests', JSON.stringify(requests));
    loadLeaveRequests();
}

// Update metrics dashboard
function updateMetrics() {
    const requests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;
    const total = requests.length;

    document.getElementById('totalRequests').textContent = total;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('approvedCount').textContent = approved;
    document.getElementById('rejectedCount').textContent = rejected;
}

// Event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filterTable(e.target.value);
    });

    // Check admin role
    const user = JSON.parse(localStorage.getItem('campusProUser') || '{}');
    if (!user || user.role !== 'admin') {
        window.location.href = '../login.html';
    }
}

// Search/filter table
function filterTable(query) {
    const rows = document.querySelectorAll('#leavesTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
