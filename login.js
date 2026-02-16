// Demo credentials
const demoUsers = {
  student: {
    email: 'student@campus.com',
    password: '123456',
    role: 'student',
    name: 'John Doe',
    nextPage: 'student.html'  // Your Campus Pro V4
  },
  admin: {
    email: 'admin@campus.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    nextPage: 'admin.html'  // Admin dashboard (future)
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const roleBtns = document.querySelectorAll('.role-btn');
  
  // Role toggle
  roleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      roleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Login handler
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value.trim().toLowerCase();
    const password = this.querySelector('input[type="password"]').value;
    const activeRoleBtn = document.querySelector('.role-btn.active');
    const role = activeRoleBtn.dataset.role;
    
    const user = demoUsers[role];
    
    if (email === user.email && password === user.password) {
      // Save user session
      localStorage.setItem('campusProUser', JSON.stringify({
        email,
        role,
        name: user.name,
        loggedIn: true
      }));
      
      // Remember me
      const rememberMe = document.getElementById('rememberMe').checked;
      if (rememberMe) {
        localStorage.setItem('campusProRemember', 'true');
      }
      
      // Redirect to role-specific dashboard
      const nextPage = user.nextPage;
      window.location.href = nextPage;
      
    } else {
      // Shake animation + error
      this.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
      
      alert(`❌ Invalid credentials for ${role.toUpperCase()}!\n\n${role}: ${user.email} / ${user.password}`);
    }
  });
});
