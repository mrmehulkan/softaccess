const API_URL = "APNA_GOOGLE_SCRIPT_URL_YAHAN_PASTE_KAREIN";

function loginUser(){
  const id = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  fetch(`${API_URL}?action=login&email=${encodeURIComponent(id)}&password=${encodeURIComponent(pass)}`)
    .then(r=>r.json())
    .then(d=>{
      if(d.success){
        localStorage.setItem("user_id", d.user_id);
        localStorage.setItem("user_name", d.name);
        location.href = (d.role === "admin") ? "admin/dashboard.html" : "dashboard.html";
      } else {
        msg.innerText = d.message;
      }
    });
}

function signup(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const pass = document.getElementById("password").value;
  const conf = document.getElementById("confirm_password").value;

  if(pass !== conf) return alert("Password match nahi ho raha!");

  fetch(`${API_URL}?action=signup&name=${name}&email=${email}&mobile=${mobile}&password=${pass}`)
    .then(r=>r.json())
    .then(d=>{
      alert(d.message);
      if(d.success) location.href = "index.html";
    });
}

function logoutUser(){
  localStorage.clear();
  location.href = "index.html";
}