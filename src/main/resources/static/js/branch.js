function loadBranchSection() {
  fetch("/api/branches")
    .then(res => res.json())
    .then(branches => {
      let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>All Branches</h4>
          <button class="btn btn-success" onclick="showCreateBranchForm()">+ Create New</button>
        </div>
        <ul class="list-group">`;

      branches.forEach(branch => {
        html += `
          <li class="list-group-item" id="branch-${branch.id}">
            <div>
              <strong>${branch.branchName}</strong> - ${branch.city}
            </div>
            <div>
              <button class="btn btn-warning btn-sm me-2" onclick="editBranch(${branch.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteBranch(${branch.id})">Delete</button>
            </div>
          </li>`;
      });

      html += `</ul>`;
      document.getElementById("branch-content").innerHTML = html;
    })
    .catch(err => alert("Error loading branches: " + err.message));
}

function showCreateBranchForm() {
  const html = `
    <h4>Create New Branch</h4>
    <form id="createBranchForm" class="mb-3">
      <input type="text" id="branchName" placeholder="Branch Name" class="form-control mb-2" required />
      <input type="text" id="branchCity" placeholder="City" class="form-control mb-2" required />
      <button type="submit" class="btn btn-success">Create</button>
      <button type="button" class="btn btn-secondary ms-2" onclick="loadBranchSection()">Cancel</button>
    </form>
  `;
  document.getElementById("branch-content").innerHTML = html;

  document.getElementById("createBranchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newBranch = {
      branchName: document.getElementById("branchName").value,
      city: document.getElementById("branchCity").value
    };

    fetch("/api/branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBranch)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create branch");
        return res.json();
      })
      .then(() => loadBranchSection())
      .catch(err => alert("Error: " + err.message));
  });
}

function editBranch(id) {
  fetch(`/api/branches/${id}`)
    .then(res => res.json())
    .then(branch => {
      const html = `
        <h4>Edit Branch</h4>
        <form id="editBranchForm" class="mb-3">
          <input type="hidden" id="branchId" value="${branch.id}" />
          <input type="text" id="branchName" value="${branch.branchName}" class="form-control mb-2" required />
          <input type="text" id="branchCity" value="${branch.city}" class="form-control mb-2" required />
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary ms-2" onclick="loadBranchSection()">Cancel</button>
        </form>
      `;
      document.getElementById("branch-content").innerHTML = html;

      document.getElementById("editBranchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const updatedBranch = {
          id: branch.id,
          branchName: document.getElementById("branchName").value,
          city: document.getElementById("branchCity").value
        };

        fetch(`/api/branches/${branch.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBranch)
        })
          .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
          })
          .then(() => loadBranchSection())
          .catch(err => alert("Error: " + err.message));
      });
    });
}

function deleteBranch(id) {
  if (confirm("Are you sure you want to delete this branch?")) {
    fetch(`/api/branches/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        document.getElementById(`branch-${id}`).remove();
      })
      .catch(err => alert("Error: " + err.message));
  }
}
