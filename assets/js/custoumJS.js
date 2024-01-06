
const counterDiv = document.querySelector(".counter");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");
const startCountInput = document.getElementById("startCount");
const maxCountInput = document.getElementById("maxCount");

//----------------------//
let counterValue = 0;
let maxValue = null; // inizialmente non ci sono restrizioni per i valori del contatore

document.addEventListener("DOMContentLoaded", () => {
    updateCounterDisplay();
    updateButtonState();
});

incrementBtn.addEventListener("click", () => {
    if (maxValue === null || counterValue < maxValue) {
        counterValue++;

        updateCounterDisplay();
        updateButtonState();
    }
});

decrementBtn.addEventListener("click", () => {
    if (counterValue > 0) {
        counterValue--;

        updateCounterDisplay();
        updateButtonState();
    }
});

resetBtn.addEventListener("click", () => {
    counterValue = 0;
    maxValue = null;
    startCountInput.value = 0;
    maxCountInput.value = 0;

    updateCounterDisplay();
    updateButtonState();
});


startCountInput.addEventListener("change", (e) => {
    const startValue = parseInt(e.target.value);

    if (isNaN(startValue)) {
        // Mostra un alert se il valore non è un numero
        window.alert("Attenzione: sono accettati solo valori numerici!");
    } else {
        let adjustedValue = startValue; // Imposta il valore massimo consentito

        // Se il valore massimo è definito, il contatore non deve superarlo
        if (maxValue !== null) {
            if (startValue > maxValue) {
                adjustedValue = maxValue;
            }
        }

        // Imposta il contatore al nuovo valore (eventualmente regolato)
        counterValue = adjustedValue;

        updateCounterDisplay();
        updateButtonState();
    }
});

maxCountInput.addEventListener("change", (e) => {
    const newMaxValue = parseInt(e.target.value);

    if (isNaN(newMaxValue)) {
        window.alert("Attenzione: sono accettati solo valori numerici!");
    } else {
        maxValue = newMaxValue;

        updateCounterDisplay();
        updateButtonState();
    }
});


function updateCounterDisplay() {
    counterDiv.textContent = counterValue;
}

function updateButtonState() {

    if (maxValue !== null && counterValue >= maxValue) {
        incrementBtn.disabled = true;
    } else {
        incrementBtn.disabled = false;
    }
    // Se maxValue è definito e il valore del contatore (counterValue) raggiunge o supera 
    // maxValue, disabilitiamo il pulsante di incremento. Questo evita che 
    // l'utente superi il valore massimo consentito.

    if (counterValue <= 0) {
        decrementBtn.disabled = true;
    } else {
        decrementBtn.disabled = false;
    }
    // Se il valore del contatore è già zero o meno, disabilitiamo il pulsante di decremento.
    // Questo previene che il contatore diventi negativo.
}
