// Select elements
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const balanceEl = document.getElementById("balance");
const goalForm = document.getElementById("goal-form");
const goalStatus = document.getElementById("goal-status");
const ctx = document.getElementById("expense-chart").getContext("2d");
const loginPopup = document.getElementById("login-popup");
const overlay = document.getElementById("overlay");
const profilePicContainer = document.getElementById("profile-pic-container");
const profileCard = document.getElementById("profile-card");
const logoutButton = document.getElementById("logout-button");

// Global state
let transactions = [];
let goals = { weekly: 0, monthly: 0, yearly: 0 };
let loggedInUserName = "Default Name";

// On page load
window.onload = function () {
  loadTransactions();
  loadGoals();
  updateGoalStatus();
  renderChart();
  showLoginPopup();
};

// Transactions
function addTransactionToList(transaction) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${transaction.description} - $${transaction.amount.toFixed(2)}
    <span class="${transaction.category}">${transaction.category}</span>
  `;
  transactionList.appendChild(li);
}

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!description || isNaN(amount) || !category) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const transaction = { id: Date.now(), description, amount, category };
  transactions.push(transaction);

  addTransactionToList(transaction);
  updateDashboard();
  saveTransactions();
  renderChart();
  transactionForm.reset();
});

function updateDashboard() {
  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.category === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  totalIncomeEl.textContent = `$${income.toFixed(2)}`;
  totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
  balanceEl.textContent = `$${balance.toFixed(2)}`;
}

function loadTransactions() {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = savedTransactions;
  transactions.forEach(addTransactionToList);
  updateDashboard();
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Goals
goalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const goalAmount = parseFloat(document.getElementById("goal-amount").value);
  const goalPeriod = document.getElementById("goal-period").value;

  if (isNaN(goalAmount) || goalAmount <= 0) {
    alert("Please enter a valid goal amount.");
    return;
  }

  goals[goalPeriod] = goalAmount;
  saveGoals();
  updateGoalStatus();
});

function updateGoalStatus() {
  goalStatus.innerHTML = `
    <p><strong>Weekly Goal:</strong> $${goals.weekly.toFixed(2)}</p>
    <p><strong>Monthly Goal:</strong> $${goals.monthly.toFixed(2)}</p>
    <p><strong>Yearly Goal:</strong> $${goals.yearly.toFixed(2)}</p>
  `;
}

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
  const savedGoals = JSON.parse(localStorage.getItem("goals"));
  if (savedGoals) goals = savedGoals;
}

// Chart
function renderChart() {
  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = transactions
    .filter((t) => t.category === "savings")
    .reduce((sum, t) => sum + t.amount, 0);

  if (window.expenseChart) window.expenseChart.destroy();

  window.expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Savings"],
      datasets: [
        {
          data: [income, savings],
          backgroundColor: ["#4CAF50", "#2196F3"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Income and Savings Overview" },
      },
    },
  });
}

// Login
function showLoginPopup() {
  overlay.classList.add("show");
  loginPopup.style.display = "block";
}

function hideLoginPopup() {
  overlay.classList.remove("show");
  loginPopup.style.display = "none";
}

// Hardcoded credentials for demo
const validUsername = "admin";
const validPassword = "password123";

// Login Button Event Handler
document.getElementById("login-button").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Check if username and password match
  if (username === validUsername && password === validPassword) {
    loggedInUserName = username;
    document.getElementById("user-info").textContent = `Welcome, ${loggedInUserName}!`;
    hideLoginPopup();
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Profile
profilePicContainer.addEventListener("click", () => {
  profileCard.classList.toggle("show");
});

logoutButton.addEventListener("click", () => {
  alert("Logging out...");
  profileCard.classList.remove("show");
  localStorage.clear();
  setTimeout(() => window.location.reload(), 300);
});
