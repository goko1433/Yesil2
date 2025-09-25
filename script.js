// GİRİŞ / KAYIT SİSTEMİ (localStorage demo)
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const authView = document.getElementById("auth-view");
const appView = document.getElementById("app-view");
const registerBox = document.getElementById("register-box");

showRegister.addEventListener("click", () => {
  document.querySelector(".auth-box").style.display = "none";
  registerBox.style.display = "block";
});
showLogin.addEventListener("click", () => {
  registerBox.style.display = "none";
  document.querySelector(".auth-box").style.display = "block";
});

registerBtn.addEventListener("click", () => {
  const user = document.getElementById("register-username").value;
  const pass = document.getElementById("register-password").value;
  if (user && pass) {
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    alert("Kayıt başarılı!");
  }
});

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;
  if (user === localStorage.getItem("user") && pass === localStorage.getItem("pass")) {
    authView.classList.remove("active-view");
    appView.classList.add("active-view");
  } else {
    alert("Hatalı giriş!");
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  appView.classList.remove("active-view");
  authView.classList.add("active-view");
});

// MODAL İŞLEMLERİ
let currentType = null;
function openModal(type) {
  currentType = type;
  document.getElementById("modal-title").textContent = (type === "birikim" ? "Birikim Güncelle" : "Borç Güncelle");
  document.getElementById("modal-input").value = "";
  document.getElementById("modal-overlay").style.display = "flex";
  document.getElementById("modal-box").style.display = "block";
}
document.getElementById("modal-cancel").addEventListener("click", closeModal);
document.getElementById("modal-save").addEventListener("click", () => {
  const value = document.getElementById("modal-input").value;
  if (value) updateValue(currentType, value);
  closeModal();
});
function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("modal-box").style.display = "none";
}

// ZAMAN KAYDI + ELAPSED TIME
function updateValue(type, value) {
  const now = Date.now();
  localStorage.setItem(type + "_value", value);
  localStorage.setItem(type + "_time", now);

  document.getElementById(type + "-tutar").textContent = value;
  updateElapsedTime(type, now);
}
function updateElapsedTime(type, savedTime) {
  if (!savedTime) {
    document.getElementById(type + "-sure").textContent = "Henüz güncellenmedi";
    return;
  }
  const diff = Date.now() - savedTime;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let text = "";
  if (days > 0) text = `${days} gün önce`;
  else if (hours > 0) text = `${hours} saat önce`;
  else if (minutes > 0) text = `${minutes} dk önce`;
  else text = `${seconds} sn önce`;
  document.getElementById(type + "-sure").textContent = "Son güncelleme: " + text;
}

// SAYFA AÇILDIĞINDA VERİLERİ YÜKLE
["birikim", "borc"].forEach(type => {
  const value = localStorage.getItem(type + "_value");
  const time = localStorage.getItem(type + "_time");
  if (value) document.getElementById(type + "-tutar").textContent = value;
  if (time) updateElapsedTime(type, parseInt(time));
});

// SÜREYİ PERİYODİK GÜNCELLE
setInterval(() => {
  ["birikim", "borc"].forEach(type => {
    const time = localStorage.getItem(type + "_time");
    if (time) updateElapsedTime(type, parseInt(time));
  });
}, 30000);
