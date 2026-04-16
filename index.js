const output = document.getElementById("output");
const history = document.getElementById("history");
const buttons = document.querySelector(".buttons");

let current = "";
let previous = "";

// Handle button clicks
buttons.addEventListener("click", (e) => {
    const target = e.target;

    if (!target.matches("button")) return;

    const value = target.dataset.value;
    const action = target.dataset.action;

    if (value) appendValue(value);
    if (action) handleAction(action);
});

function appendValue(value) {
    current += value;
    updateDisplay();
}

function handleAction(action) {
    switch (action) {
        case "clear":
            current = "";
            previous = "";
            break;

        case "delete":
            current = current.slice(0, -1);
            break;

        case "equals":
            calculate();
            break;
    }

    updateDisplay();
}

function calculate() {
    try {
        previous = current;
        current = eval(current).toString();
    } catch {
        current = "Error";
    }
}

function updateDisplay() {
    output.value = current;
    history.textContent = previous;
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        appendValue(e.key);
    }

    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") handleAction("delete");
    if (e.key === "Escape") handleAction("clear");
});