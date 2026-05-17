const out_button = document.getElementById("out-btn");
const int_button = document.getElementById("int-btn");
const h2_input = document.querySelector(".H2-input-group");
const Result = document.getElementById("result");
const statusEl = document.getElementById("status"); // Fixed: was missing const

const HOut = 27.12;
const HInt = 9.51;
const eOut = 0.3;
const eInt = 0.2;

let mode = "int";

// Input validation helper
const getValidInputs = (ids) => {
    const values = ids.map(id => parseFloat(document.getElementById(id)?.value));
    return values.every(v => !isNaN(v) && v !== null);
};

int_button.addEventListener("click", () => {
    mode = "int";
    int_button.classList.add("active");
    out_button.classList.remove("active");
    h2_input.classList.add("hidden");
});

out_button.addEventListener("click", () => {
    mode = "out";
    out_button.classList.add("active");
    int_button.classList.remove("active");
    h2_input.classList.remove("hidden");
});

function calR(Load1, Load2, NoLoad1, NoLoad2) {
    let AveLoad = (Load1 + Load2) / 2;
    let AveNoLoad = (NoLoad1 + NoLoad2) / 2;
    return AveLoad - AveNoLoad;
}

function calculateInt() {
    const commonIds = ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8"];
    
    if (!getValidInputs(commonIds)) {
        showStatus("⚠️ Please fill all 8 measurement fields", "error");
        return;
    }

    let Load1 = parseFloat(document.getElementById("value1").value);
    let Load2 = parseFloat(document.getElementById("value2").value);
    let NoLoad1 = parseFloat(document.getElementById("value3").value);
    let NoLoad2 = parseFloat(document.getElementById("value4").value);
    let Load3 = parseFloat(document.getElementById("value5").value);
    let Load4 = parseFloat(document.getElementById("value6").value);
    let NoLoad3 = parseFloat(document.getElementById("value7").value);
    let NoLoad4 = parseFloat(document.getElementById("value8").value);

    let R1 = calR(Load1, Load2, NoLoad1, NoLoad2);
    let R2 = calR(Load3, Load4, NoLoad3, NoLoad4);
    let M = (R1 + R2) / 2;
    let Tol = HInt + (M - eInt);

    Result.innerHTML = `<strong>Intermediate Endplay = ${Tol.toFixed(2)}</strong>`;
    showStatus(`✅ R1=${R1.toFixed(2)}, R2=${R2.toFixed(2)}, M=${M.toFixed(2)}`, "success");
}

function calculateOut() {
    const allIds = ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "H2"];
    
    if (!getValidInputs(allIds)) {
        showStatus("⚠️ Please fill all 8 measurement fields + H2 value", "error");
        return;
    }

    let Load1 = parseFloat(document.getElementById("value1").value);
    let Load2 = parseFloat(document.getElementById("value2").value);
    let NoLoad1 = parseFloat(document.getElementById("value3").value);
    let NoLoad2 = parseFloat(document.getElementById("value4").value);
    let Load3 = parseFloat(document.getElementById("value5").value);
    let Load4 = parseFloat(document.getElementById("value6").value);
    let NoLoad3 = parseFloat(document.getElementById("value7").value);
    let NoLoad4 = parseFloat(document.getElementById("value8").value);
    let H2 = parseFloat(document.getElementById("H2").value);

    let R1 = calR(Load1, Load2, NoLoad1, NoLoad2);
    let R2 = calR(Load3, Load4, NoLoad3, NoLoad4);
    let M = (R1 + R2) / 2;
    let Tol = HOut - H2 + (M - eOut);

    Result.innerHTML = `<strong>Output Endplay = ${Tol.toFixed(2)}</strong>`;
    showStatus(`✅ R1=${R1.toFixed(2)}, R2=${R2.toFixed(2)}, M=${M.toFixed(2)}`, "success");
}

function showStatus(message, type = "info") {
    if (statusEl) {
        statusEl.innerHTML = message;
        statusEl.className = `status ${type}`;
    }
}

function resetForm() {
    const ids = ["value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "H2"];
    ids.forEach(id => document.getElementById(id).value = "");
    
    Result.innerHTML = "Result";
    if (statusEl) {
        statusEl.innerHTML = "";
        statusEl.className = "status";
    }
}

document.getElementById("calc-btn").addEventListener("click", () => {
    if (mode === "int") {
        calculateInt();
    } else {
        calculateOut();
    }
});

document.getElementById("reset-button").addEventListener("click", resetForm);

// Bonus: Enter key support
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
        document.getElementById("calc-btn").click();
    }
});