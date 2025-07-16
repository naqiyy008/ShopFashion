// Theme toggle
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;
const navbar = document.getElementById("navbar");

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    navbar.classList.remove("navbar-light", "bg-body-tertiary");
    navbar.classList.add("navbar-dark", "bg-dark");
    toggleThemeBtn.textContent = "🌞";
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    navbar.classList.remove("navbar-dark", "bg-dark");
    navbar.classList.add("navbar-light", "bg-body-tertiary");
    toggleThemeBtn.textContent = "🌙";
  }
}

let currentTheme = localStorage.getItem("theme") || "light";
setTheme(currentTheme);

toggleThemeBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
});

// Saat halaman dimuat, set tema berdasarkan localStorage
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});



// Form Validation
const form = document.querySelector("form");
const emailInput = form.querySelector("input[type='email']");
const popup = document.getElementById("popupLangganan");
const closeBtn = document.getElementById("closePopup");
const loadingSpinner = document.getElementById("loadingSpinner");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("inputName")?.value.trim();
  const lastName = document.getElementById("inputLastName")?.value.trim();
  const email = emailInput?.value.trim();
  const password = document.getElementById("inputPassword3")?.value;

  if (firstName && (firstName.length < 3 || firstName.length > 20)) {
    return Swal.fire({ icon: 'error', title: 'Validasi Gagal', text: 'First Name harus 5-20 karakter.' });
  }

  if (lastName && (lastName.length < 3 || lastName.length > 20)) {
    return Swal.fire({ icon: 'error', title: 'Validasi Gagal', text: 'Last Name harus 5-20 karakter.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Swal.fire({ icon: 'error', title: 'Email Tidak Valid', text: 'Masukkan format email yang benar.' });
  }

  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (password && !passwordValid.test(password)) {
    return Swal.fire({
      icon: 'error',
      title: 'Password Tidak Valid',
      html: 'Password harus:<br>✔ Minimal 8 karakter<br>✔ Ada huruf besar<br>✔ Ada huruf kecil<br>✔ Ada angka'
    });
  }

  loadingSpinner.classList.remove("d-none");

  setTimeout(() => {
    loadingSpinner.classList.add("d-none");
    popup.classList.remove("d-none");

    setTimeout(() => {
      window.location.href = 'HOME.html';
    }, 2000);
  }, 1500);
});

closeBtn.addEventListener("click", function () {
  popup.classList.add("d-none");
});


//popup for gambahr
function addToCart() {
  const title = document.getElementById('modal-title').textContent;
  const price = document.getElementById('modal-price').textContent;

  const warnaBtn = document.querySelector('#warna-options .option-btn.active');
  const ukuranBtn = document.querySelector('#ukuran-options .option-btn.active');

  if (!warnaBtn || !ukuranBtn) {
    alert('Silakan pilih warna dan ukuran terlebih dahulu.');
    return;
  }

  const color = warnaBtn.textContent;
  const size = ukuranBtn.textContent;

  let cart = getCart();

  const existingIndex = cart.findIndex(item =>
    item.title === title && item.color === color && item.size === size
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ title, price, color, size, qty: 1 });
  }

  saveCart(cart);

  alert('Produk berhasil dimasukkan ke keranjang!');
  closeModal();
}
