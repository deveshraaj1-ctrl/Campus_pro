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
  
  const formData = {
    id: 'REQ-' + Date.now().toString().slice(-6),
    fromDate: document.getElementById('fromDate').value,
    toDate: document.getElementById('toDate').value,
    leaveType: document.getElementById('leaveType').value,
    reason: document.getElementById('reason').value,
    status: 'pending',
    submittedAt: new Date().toLocaleString('en-IN'),
    studentEmail: JSON.parse(localStorage.getItem('campusProUser')).email
  };
  
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  
  setTimeout(() => {
    let leaves = JSON.parse(localStorage.getItem('studentLeaves') || '[]');
    leaves.unshift(formData);
    localStorage.setItem('studentLeaves', JSON.stringify(leaves));
    
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
