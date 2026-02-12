export function initDealerForm() {

    const ENDPOINT =
      "https://script.google.com/macros/s/AKfycbxMe0mQNVKBSIS7bFWYdd6kXr3_3No_sXeVb3HmbDSOknuu8XMtf37OX3SJhsAGLtbLcw/exec";

    const form = document.querySelector("#dealerForm");
    const msg = document.querySelector("#formMsg");

    if (!form || !msg) return;

    form.addEventListener("submit",async (e) => {
        e.preventDefault();
        msg.textContent = "Submitting...";

        const fd = new FormData(form);
        const payload = Object.fromEntries(fd.entries());
        payload.source = location.href;

        const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            form.reset();
            msg.textContent = "Thanks - we'll reach out shortly.";
        } else {
            msg.textContent = "Something went wrong. Try again.";
        }
    });
}
