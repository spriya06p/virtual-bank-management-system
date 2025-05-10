// js/dashboard.js

function loadSection(section) {
  switch (section) {
    case "user":
      loadUserSection();
      break;
    case "loan":
      loadLoanSection();
      break;
    case "branch":
      loadBranchSection();
      break;
    case "transaction":
      loadTransactionSection();
      break;
    default:
      document.getElementById("main-content").innerHTML = "<p>Section not found</p>";
  }
}
