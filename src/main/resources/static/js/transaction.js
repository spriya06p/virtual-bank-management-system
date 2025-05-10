// Function to load the transactions into the page
function loadTransactionSection() {
  const userIdFilter = document.getElementById("searchUserId").value.trim();
  const typeFilter = document.getElementById("filterType").value;

  fetch("/api/transactions")
    .then(res => res.json())
    .then(transactions => {
      if (userIdFilter) {
        transactions = transactions.filter(txn => txn.userId == userIdFilter);
      }
      if (typeFilter) {
        transactions = transactions.filter(txn => txn.type.toLowerCase() === typeFilter.toLowerCase());
      }

      let html = '<ul class="list-group">';
      transactions.forEach(txn => {
        html += `
          <li class="list-group-item" id="txn-${txn.id}">
            <div>
              <strong>${txn.type.toUpperCase()}</strong> of ₹${txn.amount} on ${txn.date} (User ID: ${txn.userId})
            </div>
            <div>
              <button class="btn btn-warning btn-sm me-2" onclick="editTransaction(${txn.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${txn.id})">Delete</button>
            </div>
          </li>`;
      });
      html += '</ul>';
      document.getElementById("transaction-content").innerHTML = html;
    })
    .catch(err => alert("Error loading transactions: " + err.message));
}

// Function to show the "Create New Transaction" form
function showCreateTransactionForm() {
  const html = `
    <h4>Create New Transaction</h4>
    <form id="createTransactionForm" class="mb-3">
      <select id="txnType" class="form-select mb-2" required>
        <option value="">Select Type</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
      </select>
      <input type="number" id="txnAmount" placeholder="Amount" class="form-control mb-2" required />
      <input type="text" id="txnDate" placeholder="Date (YYYY-MM-DD)" class="form-control mb-2" required />
      <input type="number" id="txnUserId" placeholder="User ID" class="form-control mb-2" required />
      <button type="submit" class="btn btn-success">Create</button>
      <button type="button" class="btn btn-secondary ms-2" onclick="loadTransactionSection()">Cancel</button>
    </form>
  `;
  document.getElementById("transaction-content").innerHTML = html;

  document.getElementById("createTransactionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const transaction = {
      type: document.getElementById("txnType").value,
      amount: parseFloat(document.getElementById("txnAmount").value),
      date: document.getElementById("txnDate").value,
      userId: parseInt(document.getElementById("txnUserId").value)
    };

    fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create transaction");
        return res.json();
      })
      .then(() => {
        loadTransactionSection();  // Reload transactions
        downloadCSV();  // Immediately trigger download after reload
      })
      .catch(err => alert("Error: " + err.message));
  });
}

// Function to edit a transaction (existing function)
function editTransaction(id) {
  fetch(`/api/transactions/${id}`)
    .then(res => res.json())
    .then(txn => {
      const html = `
        <h4>Edit Transaction</h4>
        <form id="editTransactionForm" class="mb-3">
          <select id="txnType" class="form-select mb-2" required>
            <option value="">Select Type</option>
            <option value="deposit" ${txn.type === 'deposit' ? 'selected' : ''}>Deposit</option>
            <option value="withdrawal" ${txn.type === 'withdrawal' ? 'selected' : ''}>Withdrawal</option>
          </select>
          <input type="number" id="txnAmount" value="${txn.amount}" class="form-control mb-2" required />
          <input type="text" id="txnDate" value="${txn.date}" class="form-control mb-2" required />
          <input type="number" id="txnUserId" value="${txn.userId}" class="form-control mb-2" required />
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary ms-2" onclick="loadTransactionSection()">Cancel</button>
        </form>
      `;
      document.getElementById("transaction-content").innerHTML = html;

      document.getElementById("editTransactionForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const updatedTxn = {
          id: txn.id,
          type: document.getElementById("txnType").value,
          amount: parseFloat(document.getElementById("txnAmount").value),
          date: document.getElementById("txnDate").value,
          userId: parseInt(document.getElementById("txnUserId").value)
        };

        fetch(`/api/transactions/${txn.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTxn)
        })
          .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
          })
          .then(() => loadTransactionSection())
          .catch(err => alert("Error: " + err.message));
      });
    });
}

// Function to delete a transaction (existing function)
function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    fetch(`/api/transactions/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        document.getElementById(`txn-${id}`).remove();
      })
      .catch(err => alert("Error: " + err.message));
  }
}

// Function to download the CSV file (existing function)
function downloadCSV() {
  fetch("/api/transactions")
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        alert("No transactions to download.");
        return;
      }

      const headers = ["ID", "Type", "Amount", "Date", "User ID"];
      const rows = data.map(txn => [txn.id, txn.type, txn.amount, txn.date, txn.userId]);

      let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => alert("CSV download error: " + err.message));
}

// Initial load of transactions
window.onload = loadTransactionSection;
