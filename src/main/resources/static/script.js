document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  if (username === "admin" && password === "admin123") {
    document.querySelector(".login-box").style.animation = "fadeOut 0.8s forwards";

    setTimeout(() => {
      window.location.href = "dashboard.html"; // Redirect to dashboard
    }, 800);
  } else {
    errorMsg.textContent = "Invalid username or password!";
  }
});

// Optional fade out animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeOut {
    from {opacity: 1; transform: translateY(0);}
    to {opacity: 0; transform: translateY(30px);}
  }
`, styleSheet.cssRules.length);
