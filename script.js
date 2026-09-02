// ============================================================
// BACKEND / FORM SUBMISSION API
// ============================================================
// Google Apps Script / Firebase / Supabase API URL এখানে বসাবেন.
// এখন খালি রাখা হয়েছে। API না থাকলে ফর্মটি বাস্তবে কোনো তথ্য
// সংরক্ষণ করবে না এবং ভুয়া "সফল" বার্তা দেখাবে না.
const API_URL = "";

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// মোবাইল নম্বর ও Transaction ID যাচাইয়ের জন্য বাংলা/ইংরেজি সংখ্যা গ্রহণ।
function normalizeDigits(value) {
  const bn = "০১২৩৪৫৬৭৮৯";
  return value.replace(/[০-৯]/g, d => String(bn.indexOf(d)));
}

function validBangladeshPhone(value) {
  const digits = normalizeDigits(value).replace(/\D/g, "");
  return /^01[3-9]\d{8}$/.test(digits);
}

// Copy button
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      const oldText = button.textContent;
      button.textContent = "কপি হয়েছে ✓";
      setTimeout(() => button.textContent = oldText, 1500);
    } catch {
      alert("নম্বর কপি করা যায়নি। অনুগ্রহ করে নম্বরটি নিজে কপি করুন।");
    }
  });
});

