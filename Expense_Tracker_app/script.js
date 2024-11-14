
const expenseList = document.getElementById('expenseList');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const addExpenseBtn = document.getElementById('addExpenseBtn');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name} - $${expense.amount}</span>
            <div>
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

function addExpense() {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);

    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        renderExpenses();
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    deleteExpense(index);
}

addExpenseBtn.addEventListener('click', addExpense);
renderExpenses();
