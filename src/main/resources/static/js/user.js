function loadUserSection() {
  fetch("/api/users")
    .then(res => res.json())
    .then(users => {
      let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>All Users</h4>
          <button class="btn btn-success" onclick="showCreateUserForm()">+ Create New</button>
        </div>
        <ul class="list-group">`;

      users.forEach(user => {
        html += `
          <li class="list-group-item d-flex justify-content-between align-items-center" id="user-${user.id}">
            <div><strong>${user.name}</strong> (${user.email})</div>
            <div>
              <button class="btn btn-sm btn-warning me-2" onclick="editUser(${user.id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </div>
          </li>`;
      });

      html += `</ul>`;
      document.getElementById("main-content").innerHTML = html;
    })
    .catch(err => alert("Error loading users: " + err.message));
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete user");
        document.getElementById(`user-${id}`).remove();
      })
      .catch(error => alert(`Error: ${error.message}`));
  }
}

function editUser(id) {
  fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(user => {
      const html = `
        <h4>Edit User</h4>
        <form id="editUserForm" class="mb-3">
          <input type="hidden" id="userId" value="${user.id}" />
          <input type="text" id="userName" value="${user.name}" class="form-control mb-2" required />
          <input type="email" id="userEmail" value="${user.email}" class="form-control mb-2" required />
          <input type="password" id="userPassword" placeholder="Enter new password (optional)" class="form-control mb-2" />
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-secondary ms-2" onclick="loadUserSection()">Cancel</button>
        </form>
      `;
      document.getElementById("main-content").innerHTML = html;

      document.getElementById("editUserForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const updatedUser = {
          id: user.id,
          name: document.getElementById("userName").value,
          email: document.getElementById("userEmail").value,
          password: document.getElementById("userPassword").value || user.password, // Only update password if provided
        };
        updateUser(updatedUser);
      });
    });
}

function updateUser(user) {
  fetch(`/api/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    })
    .then(() => loadUserSection())
    .catch(error => alert("Update failed: " + error.message));
}

function showCreateUserForm() {
  const html = `
    <h4>Create New User</h4>
    <form id="createUserForm" class="mb-3">
      <input type="text" id="newUserName" placeholder="Enter name" class="form-control mb-2" required />
      <input type="email" id="newUserEmail" placeholder="Enter email" class="form-control mb-2" required />
      <input type="password" id="newUserPassword" placeholder="Enter password" class="form-control mb-2" required />
      <button type="submit" class="btn btn-success">Create</button>
      <button type="button" class="btn btn-secondary ms-2" onclick="loadUserSection()">Cancel</button>
    </form>
  `;
  document.getElementById("main-content").innerHTML = html;

  document.getElementById("createUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newUser = {
      name: document.getElementById("newUserName").value,
      email: document.getElementById("newUserEmail").value,
      password: document.getElementById("newUserPassword").value, // Ensure password is included
    };
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create user");
        return res.json();
      })
      .then(() => loadUserSection())
      .catch(err => alert("Error creating user: " + err.message));
  });
}
