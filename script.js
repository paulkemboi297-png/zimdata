const packages = {
  Daily: [
    { data: "500MB", price: "$0.75" },
    { data: "1GB", price: "$1.25" },
    { data: "2GB", price: "$2.00" },
    { data: "3GB", price: "$3.00" }
  ],
  Weekly: [
    { data: "1GB", price: "$2.00" },
    { data: "2GB", price: "$3.50" },
    { data: "5GB", price: "$6.00" },
    { data: "10GB", price: "$10.00" }
  ],
  Monthly: [
    { data: "5GB", price: "$9.00" },
    { data: "10GB", price: "$15.00" },
    { data: "20GB", price: "$25.00" },
    { data: "30GB", price: "$35.00" }
  ],
  Hourly: [
    { data: "100MB", price: "$0.25" },
    { data: "250MB", price: "$0.50" },
    { data: "500MB", price: "$0.75" }
  ]
};

let selectedNetwork = "Econet";
let selectedValidity = "Daily";
let selectedPackage = null;

const packageBox = document.getElementById("packages");
const checkout = document.getElementById("checkout");
const selectedBox = document.getElementById("selectedPackage");
const message = document.getElementById("message");

function renderPackages() {
  packageBox.innerHTML = "";

  packages[selectedValidity].forEach((item) => {
    const card = document.createElement("div");
    card.className = "package";
    card.innerHTML = `
      <div>
        <strong>${item.data}</strong>
        <span>${selectedValidity} bundle • ${selectedNetwork}</span>
        <div class="price">${item.price}</div>
      </div>
      <button class="buy">Buy Now</button>
    `;

    card.querySelector(".buy").addEventListener("click", () => {
      selectedPackage = item;
      selectedBox.innerHTML =
        `<strong>${item.data} ${selectedValidity}</strong> — ${item.price}<br>${selectedNetwork}`;
      checkout.classList.remove("hidden");
      checkout.scrollIntoView({ behavior: "smooth", block: "start" });
      message.textContent = "";
    });

    packageBox.appendChild(card);
  });
}

document.querySelectorAll(".network").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".network").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedNetwork = button.dataset.network;
    renderPackages();
  });
});

document.querySelectorAll(".validity").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".validity").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedValidity = button.dataset.validity;
    renderPackages();
  });
});

document.getElementById("placeOrder").addEventListener("click", () => {
  const phone = document.getElementById("phone").value.trim();
  const reference = document.getElementById("reference").value.trim();

  if (!selectedPackage) {
    message.textContent = "Please choose a bundle first.";
    return;
  }

  if (!/^07\d{8}$/.test(phone)) {
    message.textContent = "Enter a valid Zimbabwe mobile number, e.g. 0771234567.";
    return;
  }

  if (!reference) {
    message.textContent = "Enter your EcoCash transaction/reference number.";
    return;
  }

  message.textContent =
    "Order received. Your payment will be checked manually. Do not share your EcoCash PIN.";
});

renderPackages();
