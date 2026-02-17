document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('campusProUser'));
  if (!user || user.role !== 'student') {
    alert('Please login as student first!');
    window.location.href = 'login.html';
    return;
  }
  
  initLeaveForm();
});

function initLeaveForm() {
  const form = document.getElementById('leaveForm');
  const fromDate = document.getElementById('fromDate');
  const toDate = document.getElementById('toDate');
  
  const today = new Date().toISOString().split('T')[0];
  fromDate.value = today;
  
  fromDate.addEventListener('change', validateDates);
  toDate.addEventListener('change', validateDates);
  form.addEventListener('submit', handleSubmit);
}

function validateDates() {
  const from = document.getElementById('fromDate').value;
  const to = document.getElementById('toDate').value;
  
  if (from && to && new Date(to) < new Date(from)) {
    alert('❌ To date must be after From date');
    document.getElementById('toDate').value = '';
    return false;
  }
  return true;
}

function handleSubmit(e) {
  e.preventDefault();
  
  if (!validateDates()) return;
  
  const user = JSON.parse(localStorage.getItem('campusProUser'));
  const formData = {
    id: 'REQ-' + Date.now().toString().slice(-6),
    studentName: user.name || 'CSE001 - John Doe',
    studentId: user.id || 'CSE001',
    studentEmail: user.email || 'student@campus.com',
    fromDate: document.getElementById('fromDate').value,
    toDate: document.getElementById('toDate').value,
    leaveType: document.getElementById('leaveType').value,
    reason: document.getElementById('reason').value,
    status: 'pending',
    submittedAt: new Date().toLocaleString('en-IN')
  };
  
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  
  setTimeout(() => {
    // ✅ SHARED STORAGE - Admin sees this
    let allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    allRequests.unshift(formData);
    localStorage.setItem('leaveRequests', JSON.stringify(allRequests));
    
    // ✅ Student copy (your existing)
    let studentLeaves = JSON.parse(localStorage.getItem('studentLeaves') || '[]');
    studentLeaves.unshift(formData);
    localStorage.setItem('studentLeaves', JSON.stringify(studentLeaves));
    
    document.getElementById('requestId').textContent = formData.id;
    document.getElementById('successModal').classList.add('show');
    
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }, 1500);
}


function goBack() {
  window.history.back();
}

function goToHome() {
  window.location.href = 'student.html';
}
