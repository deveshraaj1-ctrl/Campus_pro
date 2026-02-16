// Session protection
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('campusProUser'));
  if (!user || user.role !== 'student') {
    window.location.href = 'login.html';
    return;
  }
  
  initDashboard();
});

function initDashboard() {
  // Demo classes timeline
  const classesTimeline = document.getElementById('classesTimeline');
  const demoClasses = [
    { time: '09:00', subject: 'Math', room: 'A-101', active: true },
    { time: '10:30', subject: 'Physics', room: 'B-203' },
    { time: '12:00', subject: 'Chemistry', room: 'C-105' }
  ];
  
  classesTimeline.innerHTML = demoClasses.map(cls => `
    <div class="class-card ${cls.active ? 'active' : ''}">
      <div class="time">${cls.time}</div>
      <div class="subject">${cls.subject}</div>
      <div class="room">${cls.room}</div>
    </div>
  `).join('');
  
  // Load leave count from localStorage
  const leaves = JSON.parse(localStorage.getItem('studentLeaves') || '[]');
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  document.querySelector('.metric-value:nth-child(3)').textContent = pendingLeaves;
}
document.querySelector('.nav-item[data-tab="qr"]').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'qr-scanner.html';
});

// Show "NEW" badge for QR feature
// document.getElementById('qrBadge').style.display = 'block';

