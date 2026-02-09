const maxLimit = 1500;
let total = 0;

function addExpense() {
    const desc = document.getElementById("desc").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (!desc) {
        alert("Description cannot be empty");
        return;
    }

    if (desc.length < 3) {
        alert("Description must be at least 3 characters");
        return;
    }

    if (!/[a-zA-Z]/.test(desc)) {
        alert("Description must contain letters");
        return;
    }

    if (amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (total + amount > maxLimit) {
        alert("Monthly limit exceeded!");
    }

    document.getElementById("emptyText").style.display = "none";

    const li = document.createElement("li");
    li.innerHTML = `
        <div class="expense-info">
            <span>${desc}</span>
            <strong>₹${amount}</strong>
        </div>
        <button class="delete-btn" onclick="removeExpense(this, ${amount})">✕</button>
    `;

    document.getElementById("expenseList").appendChild(li);

    total += amount;
    updateTotal();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function removeExpense(btn, amount) {
    btn.parentElement.remove();
    total -= amount;
    updateTotal();

    if (total === 0) {
        document.getElementById("emptyText").style.display = "block";
    }
}

function updateTotal() {
    document.getElementById("totalAmount").textContent = "₹" + total;

    const percent = Math.min((total / maxLimit) * 100, 100);
    const bar = document.getElementById("progressBar");
    bar.style.width = percent + "%";

    if (percent < 60) bar.style.background = "green";
    else if (percent < 85) bar.style.background = "orange";
    else bar.style.background = "red";
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") addExpense();
});