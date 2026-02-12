export function initDealerForm() {
  const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbxMe0mQNVKBSIS7bFWYdd6kXr3_3No_sXeVb3HmbDSOknuu8XMtf37OX3SJhsAGLtbLcw/exec";

  const form = document.querySelector("#dealerForm");
  const msg = document.querySelector("#formMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"], button');
    if (btn) btn.disabled = true;

    try {
      msg.textContent = "Submitting...";

      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.source = location.href;

      // honeypo 
      if (payload.website && String(payload.website).trim() !== "") {
        form.reset();
        msg.textContent = "Thanks — we’ll reach out shortly.";
        return;
      }

      // client-side validation
      const digits = String(payload.phone || "").replace(/\D/g, "");
      if (digits.length < 10) {
        msg.textContent = "Enter a valid phone (10 digits).";
        return;
      }
      if (!String(payload.email || "").includes("@")) {
        msg.textContent = "Enter a valid email.";
        return;
      }

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        form.reset();
        msg.textContent = "Thanks — we’ll reach out shortly.";
      } else {
        msg.textContent = "Something went wrong. Try again.";
      }
    } catch (err) {
      msg.textContent = "Something went wrong. Try again.";
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}
