// Select elements
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const balanceEl = document.getElementById("balance");
const goalForm = document.getElementById("goal-form");
const goalStatus = document.getElementById("goal-status");
const ctx = document.getElementById("expense-chart").getContext("2d");

// Initialize transaction array
let transactions = [];

// Initialize goals
let goals = {
  weekly: 0,
  monthly: 0,
  yearly: 0,
};

// Load transactions and goals from local storage on page load
window.onload = function () {
  showPopup("initial-popup");
  loadTransactions();
  loadGoals();
  updateGoalStatus();
  renderChart();
};

// Add transaction to the DOM
function addTransactionToList(transaction) {
  const li = document.createElement("li");
  li.dataset.id = transaction.id;
  li.innerHTML = `
    <span>${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.category})</span>
    <div>
        <button onclick="editTransaction(${transaction.id})">Edit</button>
        <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    </div>
  `;
  transactionList.appendChild(li);
}

// Add transaction
transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  const transaction = { id: Date.now(), description, amount, category };
  transactions.push(transaction);

  addTransactionToList(transaction);
  updateDashboard();
  saveTransactions();
  renderChart();
  transactionForm.reset();
});

// Update dashboard values
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

// Edit transaction
function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  document.getElementById("edit-description").value = transaction.description;
  document.getElementById("edit-amount").value = transaction.amount;
  document.getElementById("edit-category").value = transaction.category;
  document.getElementById("edit-transaction-id").value = transaction.id;

  showPopup("edit-transaction-popup");
}

// Save edited transaction
document.getElementById("edit-transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("edit-transaction-id").value);
  const description = document.getElementById("edit-description").value;
  const amount = parseFloat(document.getElementById("edit-amount").value);
  const category = document.getElementById("edit-category").value;

  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  transaction.description = description;
  transaction.amount = amount;
  transaction.category = category;

  
  saveTransactions();
  renderTransactions();
  updateDashboard();
  closePopup("edit-transaction-popup");
});

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateDashboard();
  saveTransactions();
  renderTransactions();
}

// Render transactions
function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(addTransactionToList);
}

// Load transactions from local storage
function loadTransactions() {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = savedTransactions;
  renderTransactions();
  updateDashboard();
}

// Save transactions to local storage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Goal functionality
goalForm.addEventListener("submit", function (event) {
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

// Update goal status display
function updateGoalStatus() {
  goalStatus.innerHTML = `
    <p><strong>Weekly Goal:</strong> $${goals.weekly.toFixed(2)}</p>
    <p><strong>Monthly Goal:</strong> $${goals.monthly.toFixed(2)}</p>
    <p><strong>Yearly Goal:</strong> $${goals.yearly.toFixed(2)}</p>
  `;
}

// Save goals to local storage
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

// Load goals from local storage
function loadGoals() {
  const savedGoals = localStorage.getItem("goals");
  if (savedGoals) {
    goals = JSON.parse(savedGoals);
  }
}

// Render pie chart
// Render pie chart for Income, Savings, and Expenses
function renderChart() {
  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = transactions
    .filter((t) => t.category === "savings")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.category === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Destroy the previous chart instance if it exists
  if (window.expenseChart) {
    window.expenseChart.destroy();
  }

  // Create a new pie chart
  window.expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Savings", "Expenses"],
      datasets: [
        {
          data: [income, savings, expenses],
          backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Income, Savings, and Expenses" },
      },
    },
  });
}

// Ensure `renderChart()` is called after any change to transactions
function updateDashboard() {
  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.category === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = transactions
    .filter((t) => t.category === "savings")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  totalIncomeEl.textContent = `$${income.toFixed(2)}`;
  totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
  balanceEl.textContent = `$${balance.toFixed(2)}`;

  // Update the pie chart
  renderChart();
}


// Popup management
function showPopup(id) {
  document.getElementById("overlay").classList.add("show");
  document.getElementById(id).classList.add("show");
}

function closePopup(id) {
  document.getElementById("overlay").classList.remove("show");
  document.getElementById(id).classList.remove("show");
}

// Optional: Clear all data (for debugging or resetting)
function clearAllData() {
  localStorage.removeItem("transactions");
  localStorage.removeItem("goals");
  transactions = [];
  goals = { weekly: 0, monthly: 0, yearly: 0 };
  transactionList.innerHTML = "";
  updateDashboard();
  updateGoalStatus();
  renderChart();
}

// Get references to the DOM elements
// Get references to the DOM elements
const loginButton = document.getElementById("login-button");
const closePopupButton = document.getElementById("close-popup");
const userInfo = document.getElementById("user-info");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginPopup = document.getElementById("login-popup");
const overlay = document.getElementById("overlay");

function showLoginPopup() {
  overlay.classList.add("show");
  loginPopup.style.display = "block";
}
function hidePopup() {
  overlay.classList.remove("show");
  loginPopup.style.display = "none";
}

// Handle Login/Register Choice
document.getElementById("login-choice").addEventListener("click", function () {
  closePopup("initial-popup"); // Close the initial popup
  showPopup("login-popup");    // Show the login popup
});

document.getElementById("register-choice").addEventListener("click", function () {
  closePopup("initial-popup"); // Close the initial popup
  showPopup("register-popup"); // Show the register popup
});

// Close the Login Popup
document.getElementById("close-login-popup").addEventListener("click", function () {
  closePopup("login-popup");
});

// Close the Register Popup
document.getElementById("close-register-popup").addEventListener("click", function () {
  closePopup("register-popup");
});

// Handle Form Submission (Login/Registration)
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Handle login logic (e.g., send login data to the server)

  // After successful login, close the popup
  closePopup("login-popup");
});

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Handle registration logic (e.g., send registration data to the server)

  // After successful registration, close the popup
  closePopup("register-popup");
});


// Attach event listener to the close button
closePopupButton.addEventListener("click", hidePopup);


// // Function to hide the login popup
function hideLoginPopup() {
  loginPopup.style.display = "none";
  overlay.style.display = "none";
  overlay.classList.remove("show");
}
//Hide the overlay when it's clicked
overlay.addEventListener("click", hidePopup);



// Event listener for the login button
loginButton.addEventListener("click", function () {
  const username = usernameInput.value;
  const password = passwordInput.value; // You can implement actual authentication here

  // Display the user's name
  if (username && password) {
    userInfo.textContent = `Welcome, ${username}!`;
    userInfo.textContent = `Welcome, ${username}!`;
    hideLoginPopup();
    // Optionally, clear the login form
    userInfo.style.color = "white";
    usernameInput.value = "";
    passwordInput.value = "";
  } else {
    alert("Please enter your name and password.");
  }
});


const profilePicContainer = document.getElementById('profile-pic-container');
const profileCard = document.getElementById('profile-card');
const logoutButton = document.getElementById('logout-button');

// Toggle profile card visibility when avatar is clicked
profilePicContainer.addEventListener('click', () => {
    if (profileCard.classList.contains('show')) {
        profileCard.classList.remove('show');
    } else {
        profileCard.classList.add('show');
    }
});

// Log out and reload the page to show the login screen
logoutButton.addEventListener('click', () => {
    alert('Logging out...');
    window.location.reload(); // Simulate logging out and reload page
});



// Assume the user name is entered during login
let loggedInUserName = ''; // Store the logged-in user's name


// Handle login process
function handleLogin() {
    const usernameInput = document.getElementById('login-username'); // Input field for username
    const passwordInput = document.getElementById('login-password'); // Input field for password

    if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Set the logged-in user's name and hide the login popup
    loggedInUserName = usernameInput.value.trim();
    document.getElementById('login-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Set the profile card's username to the logged-in username
    const userNameDisplay = document.getElementById('profile-info');
    userNameDisplay.textContent = `${loggedInUserName}!`;

    // Show the main content after login
    document.getElementById('main-content').style.display = 'block';
}


// Logout process
document.getElementById('logout-button').addEventListener('click', () => {
    alert('Logging out...');
    document.getElementById('profile-card').classList.remove('show');
    setTimeout(() => {
        window.location.reload(); // Reload the page to simulate logout
    }, 300); // Match the transition duration
});



// After successful login/register
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();


  closePopup("login-popup"); // Or close "register-popup" similarly
});


// Select elements
// const transactionForm = document.getElementById("transaction-form");
// const transactionList = document.getElementById("transaction-list");
// const totalIncomeEl = document.getElementById("total-income");
// const totalExpensesEl = document.getElementById("total-expenses");
// const balanceEl = document.getElementById("balance");
// const goalForm = document.getElementById("goal-form");
// const goalStatus = document.getElementById("goal-status");
// const ctx = document.getElementById("expense-chart").getContext("2d");

// // Initialize transaction array
// let transactions = [];

// // Initialize goals
// let goals = {
//   weekly: 0,
//   monthly: 0,
//   yearly: 0,
// };

// // Load transactions and goals from local storage on page load
// window.onload = function () {
//   showPopup("initial-popup");
//   resetTransactions(); // Reset transactions on page load
//   loadGoals(); // Load the goals
//   updateGoalStatus();
//   renderChart();
// };

// // Add transaction to the DOM
// function addTransactionToList(transaction) {
//   const li = document.createElement("li");
//   li.dataset.id = transaction.id;
//   li.innerHTML = `
//     <span>${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.category})</span>
//     <div>
//         <button onclick="editTransaction(${transaction.id})">Edit</button>
//         <button onclick="deleteTransaction(${transaction.id})">Delete</button>
//     </div>
//   `;
//   transactionList.appendChild(li);
// }

// // Add transaction
// transactionForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const description = document.getElementById("description").value;
//   const amount = parseFloat(document.getElementById("amount").value);
//   const category = document.getElementById("category").value;

//   const transaction = { id: Date.now(), description, amount, category };
//   transactions.push(transaction);

//   addTransactionToList(transaction);
//   updateDashboard();
//   saveTransactions();
//   renderChart();
//   transactionForm.reset();
// });

// // Update dashboard values
// function updateDashboard() {
//   const income = transactions
//     .filter((t) => t.category === "income")
//     .reduce((sum, t) => sum + t.amount, 0);
//   const expenses = transactions
//     .filter((t) => t.category === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);
//   const balance = income - expenses;

//   totalIncomeEl.textContent = `$${income.toFixed(2)}`;
//   totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
//   balanceEl.textContent = `$${balance.toFixed(2)}`;
// }

// // Edit transaction
// function editTransaction(id) {
//   const transaction = transactions.find((t) => t.id === id);
//   if (!transaction) return;

//   document.getElementById("edit-description").value = transaction.description;
//   document.getElementById("edit-amount").value = transaction.amount;
//   document.getElementById("edit-category").value = transaction.category;
//   document.getElementById("edit-transaction-id").value = transaction.id;

//   showPopup("edit-transaction-popup");
// }

// // Save edited transaction
// document.getElementById("edit-transaction-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const id = parseInt(document.getElementById("edit-transaction-id").value);
//   const description = document.getElementById("edit-description").value;
//   const amount = parseFloat(document.getElementById("edit-amount").value);
//   const category = document.getElementById("edit-category").value;

//   const transaction = transactions.find((t) => t.id === id);
//   if (!transaction) return;

//   transaction.description = description;
//   transaction.amount = amount;
//   transaction.category = category;

//   saveTransactions();
//   renderTransactions();
//   updateDashboard();
//   closePopup("edit-transaction-popup");
// });

// // Delete transaction
// function deleteTransaction(id) {
//   transactions = transactions.filter((t) => t.id !== id);
//   updateDashboard();
//   saveTransactions();
//   renderTransactions();
// }

// // Render transactions
// function renderTransactions() {
//   transactionList.innerHTML = "";
//   transactions.forEach(addTransactionToList);
// }

// // Reset transactions (clear localStorage and array)
// function resetTransactions() {
//   localStorage.removeItem("transactions"); // Remove transactions from localStorage
//   transactions = []; // Clear the transactions array
//   renderTransactions(); // Clear transaction list from the DOM
//   updateDashboard(); // Update dashboard with zero values
// }

// // Load goals from local storage
// function loadGoals() {
//   const savedGoals = localStorage.getItem("goals");
//   if (savedGoals) {
//     goals = JSON.parse(savedGoals);
//   }
// }

// // Goal functionality
// goalForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const goalAmount = parseFloat(document.getElementById("goal-amount").value);
//   const goalPeriod = document.getElementById("goal-period").value;

//   if (isNaN(goalAmount) || goalAmount <= 0) {
//     alert("Please enter a valid goal amount.");
//     return;
//   }

//   goals[goalPeriod] = goalAmount;
//   saveGoals();
//   updateGoalStatus();
// });

// // Update goal status display
// function updateGoalStatus() {
//   goalStatus.innerHTML = `
//     <p><strong>Weekly Goal:</strong> $${goals.weekly.toFixed(2)}</p>
//     <p><strong>Monthly Goal:</strong> $${goals.monthly.toFixed(2)}</p>
//     <p><strong>Yearly Goal:</strong> $${goals.yearly.toFixed(2)}</p>
//   `;
// }

// // Save goals to local storage
// function saveGoals() {
//   localStorage.setItem("goals", JSON.stringify(goals));
// }

// // Render pie chart for Income, Savings, and Expenses
// function renderChart() {
//   const income = transactions
//     .filter((t) => t.category === "income")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const savings = transactions
//     .filter((t) => t.category === "savings")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const expenses = transactions
//     .filter((t) => t.category === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);

//   // Destroy the previous chart instance if it exists
//   if (window.expenseChart) {
//     window.expenseChart.destroy();
//   }

//   // Create a new pie chart
//   window.expenseChart = new Chart(ctx, {
//     type: "pie",
//     data: {
//       labels: ["Income", "Savings", "Expenses"],
//       datasets: [
//         {
//           data: [income, savings, expenses],
//           backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
//           borderColor: "#fff",
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: "top" },
//         title: { display: true, text: "Income, Savings, and Expenses" },
//       },
//     },
//   });
// }

// // Ensure `renderChart()` is called after any change to transactions
// function updateDashboard() {
//   const income = transactions
//     .filter((t) => t.category === "income")
//     .reduce((sum, t) => sum + t.amount, 0);
//   const expenses = transactions
//     .filter((t) => t.category === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);
//   const savings = transactions
//     .filter((t) => t.category === "savings")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const balance = income - expenses;

//   totalIncomeEl.textContent = `$${income.toFixed(2)}`;
//   totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;
//   balanceEl.textContent = `$${balance.toFixed(2)}`;

//   // Update the pie chart
//   renderChart();
// }

// // Popup management
// function showPopup(id) {
//   document.getElementById("overlay").classList.add("show");
//   document.getElementById(id).classList.add("show");
// }

// function closePopup(id) {
//   document.getElementById("overlay").classList.remove("show");
//   document.getElementById(id).classList.remove("show");
// }

// // Optional: Clear all data (for debugging or resetting)
// function clearAllData() {
//   localStorage.removeItem("transactions");
//   localStorage.removeItem("goals");
//   transactions = [];
//   goals = { weekly: 0, monthly: 0, yearly: 0 };
//   transactionList.innerHTML = "";
//   updateDashboard();
//   updateGoalStatus();
//   renderChart();
// }

// // Get references to the DOM elements
// const loginButton = document.getElementById("login-button");
// const closePopupButton = document.getElementById("close-popup");
// const userInfo = document.getElementById("user-info");
// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");
// const loginPopup = document.getElementById("login-popup");
// const overlay = document.getElementById("overlay");

// function showLoginPopup() {
//   overlay.classList.add("show");
//   loginPopup.style.display = "block";
// }
// function hidePopup() {
//   overlay.classList.remove("show");
//   loginPopup.style.display = "none";
// }
// function login() {
//   const username = usernameInput.value;
//   const password = passwordInput.value;

//   // Basic validation
//   if (username && password) {
//     // Save username to sessionStorage
//     sessionStorage.setItem("username", username);

//     userInfo.textContent = `Welcome, ${username}`;
//     hidePopup();
//     showPopup("initial-popup");
//   } else {
//     alert("Please enter both username and password");
//   }
// }

// loginButton.addEventListener("click", showLoginPopup);
// closePopupButton.addEventListener("click", hidePopup);

