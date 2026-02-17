// Enhanced Campus Pro Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedAdminDashboard();
});

function initEnhancedAdminDashboard() {
    populateAdminTasks();
    initLiveIndicator();
    startLiveUpdates();
    initActionHandlers();
    initNavigation();
    showWelcomeNotification();
}

function populateAdminTasks() {
    const timeline = document.getElementById('adminTimeline');
    const tasks = [
        { icon: '✅', title: 'Leave Request - Rahul S. (Class X-A)', time: '10 mins ago', color: '#4facfe' },
        { icon: '➕', title: 'New enrollment: Priya Patel', time: '25 mins ago', color: '#43e97b' },
        { icon: '📢', title: 'Notice published: PTM on 20th', time: '1 hour ago', color: '#fa709a' },
        { icon: '📊', title: 'Unit Test 1 results uploaded', time: '2 hours ago', color: '#a8edea' },
        { icon: '📱', title: 'QR Generated - Period 3', time: '3 hours ago', color: '#ffd93d' }
    ];

    timeline.innerHTML = tasks.map(task => `
        <div class="timeline-item" style="--bg-color: ${task.color}">
            <div class="timeline-icon" style="background: ${task.color}20">${task.icon}</div>
            <div class="timeline-content">
                <h4>${task.title}</h4>
                <div class="timeline-time">${task.time}</div>
            </div>
        </div>
    `).join('');
}

function initActionHandlers() {
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            handleAdminAction(action);
        });
    });
}

function handleAdminAction(action) {
    const actions = {
        'approve-leaves': () => {
            showNotification('✅ Opening Leave Approval (5 pending)', 'success');
            // Navigate to leave approval page
        },
        'enroll-student': () => {
            showNotification('➕ Open Student Enrollment Form', 'info');
        },
        'share-results': () => {
            showNotification('📊 Publishing Unit Test 1 Results', 'success');
        },
        'send-notice': () => {
            showNotification('📢 Notice Composer Opened', 'info');
        },
        'upload-timetable': () => {
            showNotification('📅 Timetable Upload Interface', 'info');
        },
        'generate-qr': () => {
            showNotification('📱 QR Code Generator for Attendance', 'success');
            // Could open QR modal here
        }
    };

    actions[action]?.() || showNotification(`🚀 ${action.replace('-', ' ').toUpperCase()}`, 'info');
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.nav-item.active')?.classList.remove('active');
            this.classList.add('active');
            
            const tab = this.getAttribute('data-tab');
            handleTabNavigation(tab);
        });
    });
}

function handleTabNavigation(tab) {
    const tabHandlers = {
        'qr-attendance': () => {
            showNotification('📱 QR Scanner LIVE - Scan for Attendance', 'success');
        },
        'quick-tools': () => {
            showNotification('⚡ Quick Tools: Bulk SMS, Bulk Email, Reports', 'info');
        },
        'analytics': () => {
            showNotification('📈 Full Analytics Dashboard', 'info');
        }
    };
    
    tabHandlers[tab]?.();
}

function startLiveUpdates() {
    setInterval(() => {
        // Update pending counts
        document.getElementById('pendingLeaves').textContent = 3 + Math.floor(Math.random() * 3);
        document.getElementById('pendingResults').textContent = 8 + Math.floor(Math.random() * 5);
        document.getElementById('noticesDraft').textContent = 1 + Math.floor(Math.random() * 2);
    }, 8000);
}

function showWelcomeNotification() {
    setTimeout(() => {
        showNotification('🎉 Welcome back Admin! 5 leaves pending approval', 'success');
    }, 1000);
}

function showNotifications() {
    showNotification('🔔 Notifications: 2 leaves, 1 fee reminder, PTM notice draft');
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;margin-left:auto;">×</button>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(67, 233, 123, 0.95)' : 'rgba(52, 152, 219, 0.95)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        z-index: 10000;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 0.8rem;
        max-width: 320px;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.transform = 'translateX(0)');
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}
function handleTabNavigation(tab) {
    const tabHandlers = {
        'generate-qr': () => {
            showNotification('📱 QR Code Generated for Attendance - Ready to Scan!', 'success');
            // Simulate QR generation
            setTimeout(() => {
                showNotification('✅ QR Code active for 30 minutes', 'success');
            }, 1500);
        },
        'more': () => {
            showNotification('☰ More: Settings, Reports, Staff, Students', 'info');
        }
        // home does nothing (already active)
    };
    
    tabHandlers[tab]?.();
}

