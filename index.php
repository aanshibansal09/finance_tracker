<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Finance Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div id="header-left">
            <h1><b>MIND YOUR FINANCE!!!</b></h1>
        </div>
        <div id="header-right">
            <nav>
                <a href="#dashboard">Dashboard</a>
                <a href="#transactions">Transactions</a>
                <a href="#goals">Goals</a>
                <a href="#reports">Reports</a>
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
            </nav>
        </div>
    </header>
    

    <!-- Dashboard Section -->
    <section id="dashboard">
        <h2>Dashboard</h2>
        <div class="stats">
            <div class="stat">
                <h3>Total Income</h3>
                <p id="total-income">$0.00</p>
            </div>
            <div class="stat">
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
                <option value="savings">Savings</option>
            </select>
            <button type="submit">Add Transaction</button>
        </form>
        <ul id="transaction-list"></ul>
    </section>

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

    <!-- Reports Section -->
    <section id="reports">
        <h2>Reports</h2>
        <canvas id="expense-chart"></canvas>
    </section>

    <!-- JavaScript -->
    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</body>
</html>
