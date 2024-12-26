let expenses = [];
let total = 0;

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    const transactionType = document.getElementById('transaction-type').value;

    if (name && !isNaN(amount) && amount > 0 && date) {
        // Adjust total based on the transaction type
        if (transactionType === 'debit') {
            expenses.push({ name, amount, date, type: 'Debit' });
            total -= amount;  // Subtract from total for debit
        } else if (transactionType === 'credit') {
            expenses.push({ name, amount, date, type: 'Credit' });
            total += amount;  // Add to total for credit
        }

        updateExpenseList();
        updateTotal();

        // Clear the input fields
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-date').value = '';
        document.getElementById('transaction-type').value = 'debit';  // Default to debit
    } else {
        alert('Please enter valid expense details.');
    }
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';  // Clear current list

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        
        // Add classes based on transaction type
        const transactionClass = expense.type.toLowerCase();  // 'debit' or 'credit'
        li.classList.add(transactionClass);

        li.innerHTML = `${expense.name}: $${expense.amount.toFixed(2)} (Date: ${expense.date}) [${expense.type}] <button onclick="removeExpense(${index})">Remove</button>`;
        expenseList.appendChild(li);
    });
}

function removeExpense(index) {
    const removedExpense = expenses[index];
    
    if (removedExpense.type === 'Debit') {
        total += removedExpense.amount;  // Add back for debit
    } else if (removedExpense.type === 'Credit') {
        total -= removedExpense.amount;  // Subtract back for credit
    }

    expenses.splice(index, 1);

    updateExpenseList();
    updateTotal();
}

function updateTotal() {
    document.getElementById('total-expense').textContent = total.toFixed(2);
}
