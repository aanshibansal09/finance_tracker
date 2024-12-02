<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Finance Tracker</title>
    <link rel="stylesheet" href="aab.css">
</head>
<body>
    
   
<div id="profile-pic-container">
    <a href="#" id="profile-pic-link" onclick="toggleUserDetails(event)">
        <img src="https://cdn.vectorstock.com/i/500p/83/12/creative-of-default-avatar-vector-21118312.jpg" alt="User Avatar" id="profile-pic">
    </a>
</div>

<!-- Avatar Popup (Profile Card) -->
<div id="profile-card">
    <img id="profile-avatar" src="https://cdn.vectorstock.com/i/500p/83/12/creative-of-default-avatar-vector-21118312.jpg" alt="Profile Avatar">
    <div id="profile-info">
        <p id="profile-name">Default Name</p>
        <button id="logout-button">Log Out</button>
    </div>
</div>



    <header>
     
      
        <h1>Personal Finance Tracker</h1>
        <nav>
            <a href="#dashboard">Dashboard</a>
            <a href="#transactions">Transactions</a>
            <a href="#budgets">Budgets</a>
            <a href="#goals">Goals</a>
            <a href="#reports">Reports</a>
        </nav>
    </header>

    <!-- Dashboard Section -->
    <section id="dashboard">
        <h2>Dashboard</h2>
        <div class="stats">
            <div class="stat">
                <h3>Total Income</h3>
                <p id="total-income">$0.00</p>
            </div>
            <div class="stat" width="150px">
                <h3>Total Expenses</h3>
                <p id="total-expenses">$0.00</p>
            </div>
            <div class="stat">
                <h3>Balance</h3>
                <p id="balance">$0.00</p>
            </div>
        </div>
    </section>

    <!-- Transactions Section -->
    <section id="transactions">
        <h2>Transactions</h2>
        <form id="transaction-form">
            <input type="text" id="description" placeholder="Description" required>
            <input type="number" id="amount" placeholder="Amount" required>
            <select id="category">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="savings">savings</option>
            </select>
            <button type="submit">Add Transaction</button>
        </form>
        <ul id="transaction-list"></ul>
    </section>

    <!-- Edit Transaction Popup -->
<div id="edit-transaction-popup" class="popup">
    <h2>Edit Transaction</h2>
    <form id="edit-transaction-form">
        <input type="hidden" id="edit-transaction-id"> <!-- Hidden ID field -->
        <input type="text" id="edit-description" placeholder="Description" required>
        <input type="number" id="edit-amount" placeholder="Amount" required>
        <select id="edit-category">
            <option value="income">Income</option>
            <option value="savings">Savings</option>
            <option value="expense">Expense</option>
        </select>
        <button type="submit">Save</button>
    </form>
    <button class="close-popup" onclick="closePopup('edit-transaction-popup')">Close</button>
</div>

<!-- ///////////////////////////////////////////////////////////// -->

    <!-- Goals Section -->
    <section id="goals">
        <h2>Financial Goals</h2>
        <form id="goal-form">
            <label for="goal-amount">Goal Amount:</label>
            <input type="number" id="goal-amount" placeholder="Enter amount" required>

            <label for="goal-period">Time Period:</label>
            <select id="goal-period">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <button type="submit">Set Goal</button>
        </form>
        <div id="goal-status">
            <p><strong>Weekly Goal:</strong> $0.00</p>
            <p><strong>Monthly Goal:</strong> $0.00</p>
            <p><strong>Yearly Goal:</strong> $0.00</p>
        </div>
    </section>
   <!-- login Section -->

<!-- Overlay for background dimming -->
<div id="overlay"></div>

<!-- Initial Popup: Ask for Login or Register -->
<div id="initial-popup" class="popup">
    <h2>Welcome! Please choose:</h2>
    <button id="login-choice">Login</button>
    <button id="register-choice">Register</button>
</div>

<!-- Login Popup -->
<div id="login-popup" class="popup">
    <h2>Login</h2>
    <form id="login-form" method="POST" action="login.php">
        <input type="text" name="username" placeholder="Username or Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
    <div id="login-error" class="error-message"></div>
    <button id="close-login-popup" class="close-popup">Close</button>
</div>

<!-- Register Popup -->
<div id="register-popup" class="popup">
    <h2>Register</h2>
    <form id="register-form" action="register.php" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
    </form>
    <div id="register-error" class="error-message"></div>
    <button id="close-register-popup" class="close-popup">Close</button>
</div>

   <div id="user-info"></div>

  
    <!-- Reports Section -->
    <section id="reports">
        <h2>Reports</h2>
        <!-- Place for charts/graphs -->
        <canvas id="expense-chart"></canvas>

    </section>



    <!-- JavaScript -->
    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</body>
</html> 