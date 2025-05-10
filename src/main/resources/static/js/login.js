<script>
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Hardcoded credentials
  const validEmail = "admin@example.com";
  const validPassword = "admin123";

  if (email === validEmail && password === validPassword) {
    alert("Login successful!");
    window.location.href = 'dashboard.html';
  } else {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-3';
    errorMessage.textContent = 'Invalid email or password';
    const form = document.getElementById('loginForm');
    if (!document.querySelector('.alert-danger')) {
      form.parentElement.appendChild(errorMessage);
    }
  }
});
</script>
