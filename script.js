const navToggle = document.querySelector(".nav-toggle");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
if (navToggle) {
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.checked = false;
    });
  });
}

const leadForm = document.querySelector(".lead-form");
const formStatus = document.querySelector(".form-status");

if (leadForm && formStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "已收到報名資料，後續可串接 LINE 或 CRM 表單。";
    leadForm.reset();
  });
}
