document.addEventListener("DOMContentLoaded", () => {
    let counterValue = 0;
    let maxValue = null; // inizialmente non ci sono restrizioni per i valori del contatore

    // Referenze ai vari elementi HTML
    const startCountInput = document.getElementById("startCount");
    const maxCountInput = document.getElementById("maxCount");
    const showAppBtn = document.getElementById("showAppBtn");
    const myAppContainer = document.querySelector(".myApp-counterSetting");
    const buttonContainer = document.getElementById("buttonContainer");

    // Creazione dinamica JS del contatore 
    const sectionContainer = document.createElement("section");
    sectionContainer.textContent = "0";
    sectionContainer.classList.add("counter");
    myAppContainer.insertBefore(sectionContainer, myAppContainer.firstChild);

    // Creazione dinamica dei pulsanti ciclando un array contenente le classi associate ai simboli del CDN CSS "font-awesome"
    const buttonSymbols = ['fa-minus', 'fa-plus', 'fa-trash-can'];
    buttonSymbols.forEach((symbolClass, index) => {
        const button = document.createElement("button");
        button.classList.add("fa-solid", symbolClass);
        button.id = `button${index + 1}`;

        // Se la classe è 'fa-trash-can' (icona del cestino), aggiungi oltre al simbolo anche il testo a "RESET"
        if (symbolClass === 'fa-trash-can') {
            button.textContent = " RESET";
        }
        buttonContainer.appendChild(button);
    });

    // Gestore dell'evento iniziale che al click mostra il contatore interattivo e le sue impostazioni 
    showAppBtn.addEventListener("click", () => {
        myAppContainer.style.display = "flex";
        buttonContainer.style.display = "flex";
        showAppBtn.style.display = "none"; // Nascondi il bottone di avvio
    });

    // Implementazione della logica dell'Event Delegation grazie a cui intercetto l'elemento che ha scatenato l'evento
    buttonContainer.addEventListener("click", (event) => {
        const targetId = event.target.id;

        switch (targetId) {
            case "button1": // Decrementa
                if (counterValue > 0) {
                    counterValue--;
                    updateCounterDisplay();
                    updateButtonState();
                }
                break;

            case "button2": // Incrementa
                if (maxValue === null || counterValue < maxValue) {
                    counterValue++;
                    updateCounterDisplay();
                    updateButtonState();
                }
                break;

            case "button3": // Azzera
                counterValue = 0;
                maxValue = null;
                startCountInput.value = 0;
                maxCountInput.value = 0;
                updateCounterDisplay();
                updateButtonState();
                break;
        }
    });

    startCountInput.addEventListener("change", (e) => {
        const startValue = parseInt(e.target.value);
        handleInputChange(startValue);
    });

    maxCountInput.addEventListener("change", (e) => {
        const newMaxValue = parseInt(e.target.value);
        handleInputChange(newMaxValue, true);
    });

    // Implementazione della logica di gestione dell'input sulla base dei valori forniti con le impostazioni
    function handleInputChange(value, isMaxValue = false) {
        if (isNaN(value)) {
            window.alert("Attenzione: sono accettati solo valori numerici!");
        } else {
            if (isMaxValue) {
                maxValue = value;
            } else {
                let adjustedValue = value;
                if (maxValue !== null && value > maxValue) {
                    adjustedValue = maxValue;
                }
                counterValue = adjustedValue;
            }

            updateCounterDisplay();
            updateButtonState();
        }
    }

    function updateCounterDisplay() {
        sectionContainer.textContent = counterValue;
    }

    // Per garantire robustezza all'app, si impedisce con disabilitazione pulsanti, valori negativi o maggiori del massimo indicato in impostazioni
    function updateButtonState() {
        const incrementBtn = document.getElementById("button2");
        const decrementBtn = document.getElementById("button1");

        if (maxValue !== null && counterValue >= maxValue) {
            incrementBtn.disabled = true;
        } else {
            incrementBtn.disabled = false;
        }

        if (counterValue <= 0) {
            decrementBtn.disabled = true;
        } else {
            decrementBtn.disabled = false;
        }
    }
});
