// ⚠️ APNA GOOGLE SCRIPT URL YAHAN PASTE KAREIN
const API_URL = "https://script.google.com/macros/s/AKfycbw8fqETtjnOQosqG4DKNS7iMswEZsTQmorirF0jixzoQki2IfZA4UEuJgGdO6RkwdxWmg/exec";

/* 🚀 LOGIN LOGIC */
function loginUser(){
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;
  const msg   = document.getElementById("msg");

  fetch(`${API_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`)
    .then(r=>r.json())
    .then(d=>{
      if(d.success){
        localStorage.setItem("user_id", d.user_id);
        localStorage.setItem("user_name", d.name || "User");
        // Role check karke sahi dashboard par bhejna
        location.href = (d.role === "admin") ? "admin/dashboard.html" : "dashboard.html";
      } else {
        msg.innerText = d.message || "Login Failed";
      }
    });
}

/* 📝 SIGNUP LOGIC */
function signup(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const pass = document.getElementById("password").value;
  const conf = document.getElementById("confirm_password").value;

  if(pass !== conf) return alert("Password match nahi ho raha!");

  const url = `${API_URL}?action=signup&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}&password=${encodeURIComponent(pass)}`;

  fetch(url)
    .then(r=>r.json())
    .then(d=>{
      alert(d.message);
      if(d.success) location.href = "index.html";
    });
}

/* 🚪 LOGOUT */
function logoutUser(){
  localStorage.clear();
  location.href = "index.html";
}

/* 📦 LOAD DASHBOARD SOFTWARES */
function loadMySoftwares(){
  const uid = localStorage.getItem("user_id");
  if(!uid) return location.href = "index.html";

  fetch(`${API_URL}?action=user_softwares&user_id=${uid}`)
    .then(r=>r.json())
    .then(list=>{
      const box = document.getElementById("list");
      box.innerHTML = list.length ? list.map(s => `
        <div class="card">
          <strong>${s.software_name}</strong><br>
          <small>Plan: ${s.plan}</small><br>
          <span class="badge ${s.status.toLowerCase()}">${s.status}</span><br><br>
          ${s.status === 'ACTIVE' ? `<button onclick="openSoftware('${s.software_id}')">OPEN</button>` : `<button disabled>EXPIRED</button>`}
        </div>
      `).join('') : "<p>Koi software assigned nahi hai.</p>";
    });
}

function openSoftware(id){
    // Software routing logic
    if(id === "S004") location.href = "apps/cash-calculator/index.html";
}
