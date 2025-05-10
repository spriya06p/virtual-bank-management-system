function loadLoanSection() {
  fetch("/api/loans")
    .then(res => res.json())
    .then(loans => {
      let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>All Loans</h4>
          <button class="btn btn-success" onclick="showCreateLoanForm()">+ Create New</button>
        </div>
        <ul class="list-group">`;

      loans.forEach(loan => {
        html += `
          <li class="list-group-item d-flex justify-content-between align-items-center" id="loan-${loan.id}">
            <div><strong>${loan.type}</strong> - ₹${loan.amount} | Duration: ${loan.duration} months</div>
            <div>
              <button class="btn btn-sm btn-warning me-2" onclick="editLoan(${loan.id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteLoan(${loan.id})">Delete</button>
            </div>
          </li>`;
      });

      html += `</ul>`;
      document.getElementById("main-content").innerHTML = html;
    })
    .catch(err => alert("Error loading loans: " + err.message));
}

function deleteLoan(id) {
  if (confirm("Are you sure you want to delete this loan?")) {
    fetch(`/api/loans/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete loan");
        document.getElementById(`loan-${id}`).remove();
      })
      .catch(error => alert(`Error: ${error.message}`));
  }
}

function editLoan(id) {
  fetch(`/api/loans/${id}`)
    .then(res => res.json())
    .then(loan => {
      const html = `
        <h4>Edit Loan</h4>
        <form id="editLoanForm" class="mb-3">
          <input type="hidden" id="loanId" value="${loan.id}" />
          <input type="text" id="loanType" value="${loan.type}" class="form-control mb-2" placeholder="Loan type" required />
          <input type="number" id="loanAmount" value="${loan.amount}" class="form-control mb-2" placeholder="Amount" required />
          <input type="number" id="loanDuration" value="${loan.duration}" class="form-control mb-2" placeholder="Duration in months" required />
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-secondary ms-2" onclick="loadLoanSection()">Cancel</button>
        </form>
      `;
      document.getElementById("main-content").innerHTML = html;

      document.getElementById("editLoanForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const updatedLoan = {
          id: loan.id,
          type: document.getElementById("loanType").value,
          amount: document.getElementById("loanAmount").value,
          duration: document.getElementById("loanDuration").value
        };
        updateLoan(updatedLoan);
      });
    });
}

function updateLoan(loan) {
  fetch(`/api/loans/${loan.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loan),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update loan");
      return res.json();
    })
    .then(() => loadLoanSection())
    .catch(error => alert("Update failed: " + error.message));
}

function showCreateLoanForm() {
  const html = `
    <h4>Create New Loan</h4>
    <form id="createLoanForm" class="mb-3">
      <input type="text" id="newLoanType" placeholder="Loan type" class="form-control mb-2" required />
      <input type="number" id="newLoanAmount" placeholder="Amount" class="form-control mb-2" required />
      <input type="number" id="newLoanDuration" placeholder="Duration in months" class="form-control mb-2" required />
      <button type="submit" class="btn btn-success">Create</button>
      <button type="button" class="btn btn-secondary ms-2" onclick="loadLoanSection()">Cancel</button>
    </form>
  `;
  document.getElementById("main-content").innerHTML = html;

  document.getElementById("createLoanForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newLoan = {
      type: document.getElementById("newLoanType").value,
      amount: document.getElementById("newLoanAmount").value,
      duration: document.getElementById("newLoanDuration").value
    };
    fetch("/api/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLoan),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create loan");
        return res.json();
      })
      .then(() => loadLoanSection())
      .catch(err => alert("Error creating loan: " + err.message));
  });
}
