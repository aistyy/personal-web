const form = document.getElementById("my-form");
const successMessage = "Ačiū už Jūsų laišką! Netrukus susisieksime.";
const errorMessage = "Atsiprašome, įvyko klaida. Bandykite dar kartą.";

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("my-form-status");
  const data = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: event.target.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerHTML = successMessage;
      event.target.reset();
    } else {
      const responseData = await response.json();
      if (responseData.errors) {
        status.innerHTML = responseData.errors
          .map((error) => error.message)
          .join(", ");
      } else {
        status.innerHTML = errorMessage;
      }
    }
  } catch (error) {
    status.innerHTML = errorMessage;
  }
}
form.addEventListener("submit", handleSubmit);

const getCurrentYear = () => new Date().getFullYear();
document.getElementById("footer-year").textContent = getCurrentYear();

const textarea = document.getElementById("message");
const charCount = document.getElementById("char-count");

textarea.addEventListener("input", () => {
  charCount.textContent = `Simbolių skaičius: ${textarea.value.length}`;
});
