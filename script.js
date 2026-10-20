// Check that both email boxes match when Submit is clicked.
document.getElementById("emailForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const confirmEmail = document.getElementById("confirmEmail").value.trim();
  const result = document.getElementById("emailResult");

  if (!email || !confirmEmail) {
    showResult(result, "Please enter your email in both boxes.", false);
  } else if (!document.getElementById("email").checkValidity() ||
             !document.getElementById("confirmEmail").checkValidity()) {
    showResult(result, "Please enter a valid email address.", false);
  } else if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
    showResult(result, "The email addresses do not match.", false);
  } else {
    showResult(result, "Email addresses match!", true);
  }
});

// Update the pizza picture as options are selected.
function updatePizza() {
  document.getElementById("pepperoniImage").hidden =
    !document.getElementById("pepperoni").checked;
  document.getElementById("sausageImage").hidden =
    !document.getElementById("sausage").checked;
  document.getElementById("mushroomsImage").hidden =
    !document.getElementById("mushrooms").checked;

  const size = document.querySelector('input[name="size"]:checked');
  const scale = size?.value === "Small" ? 0.7 : size?.value === "Medium" ? 0.85 : 1;
  document.getElementById("pizzaPreview").style.transform = `scale(${scale})`;
}

document.querySelectorAll('input[name="size"], .topping').forEach(function (input) {
  input.addEventListener("change", updatePizza);
});

// Show the selected order when Submit Order is pressed.
document.getElementById("pizzaForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const result = document.getElementById("orderResult");
  const selectedSize = document.querySelector('input[name="size"]:checked');

  if (!selectedSize) {
    showResult(result, "Please choose a pizza size.", false);
    return;
  }

  const toppings = Array.from(document.querySelectorAll(".topping:checked"), function (input) {
    return input.value;
  });
  const toppingText = toppings.length > 0 ? toppings.join(", ") : "no extra toppings";

  showResult(result, `You ordered a ${selectedSize.value} pizza with ${toppingText}.`, true);
});

function showResult(element, message, success) {
  element.textContent = message;
  element.className = "result-message mt-2 " + (success ? "success" : "error");
}

updatePizza();
