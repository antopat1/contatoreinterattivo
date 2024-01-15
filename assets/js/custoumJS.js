document.addEventListener("DOMContentLoaded", () => {
    let counterValue = 0;
    let maxValue = null; // Valore massimo del contatore, inizialmente non limitato

    // Referenze agli elementi HTML
    const startCountInput = document.getElementById("startCount");
    const maxCountInput = document.getElementById("maxCount");
    const showAppBtn = document.getElementById("showAppBtn"); // Bottone per mostrare l'app
    const settingsContainer = document.querySelector(".myApp-counterSetting");
    const buttonContainer = document.getElementById("buttonContainer");

    // Referenza all'elemento radice che racchiude l'intera applicazione ed intercetta eventi da ogni TAG child
    const generalEventDelegateElement = document.querySelector(".myApp-container");

    // Creazione dinamica del contatore come elemento DOM
    const sectionContainer = createDOMElement("section", "counter", "0"); // Crea un elemento sezione per il contatore
    settingsContainer.insertBefore(sectionContainer, settingsContainer.firstChild); // Inserisce il contatore nel contenitore principale

    // Creazione dinamica dei pulsanti utilizzando un array di classi
    const buttonSymbols = ['fa-minus', 'fa-plus', 'fa-trash-can'];
    buttonSymbols.forEach((symbolClass, index) => {
        const button = createDOMElement("button", `fa-solid ${symbolClass}`, null); // Crea un elemento button con classi specificate
        button.id = `button${index + 1}`; // Assegna un ID univoco a ciascun pulsante

        // Se la classe è 'fa-trash-can' (icona del cestino), aggiunge anche il testo "RESET"
        if (symbolClass === 'fa-trash-can') {
            button.textContent = " RESET";
        }

        buttonContainer.appendChild(button);
    });

    generalEventDelegateElement.addEventListener("click", (event) => {
        const targetId = event.target.id; // Ottiene l'ID dell'elemento cliccato

        switch (targetId) {
            case "showAppBtn": // Gestore dell'evento click per mostrare l'app
                settingsContainer.style.display = "flex"; // Mostra il contenitore principale
                buttonContainer.style.display = "flex"; // Mostra il contenitore dei pulsanti
                showAppBtn.style.display = "none"; // Nasconde il bottone di avvio
                break;

            case "button1": // Pulsante di decremento
                if (counterValue > 0) {
                    counterValue--;
                    updateCounterDisplay(); // Aggiorna la visualizzazione del contatore
                    updateButtonState(); // Aggiorna lo stato dei pulsanti
                }
                break;

            case "button2": // Pulsante di incremento
                if (maxValue === null || counterValue < maxValue) {
                    counterValue++;
                    updateCounterDisplay();
                    updateButtonState();
                }
                break;

            case "button3": // Pulsante di reset
                counterValue = 0;
                maxValue = null;
                startCountInput.value = 0;
                maxCountInput.value = 0;
                updateCounterDisplay();
                updateButtonState();
                break;
        }
    });

    // Accorpamento del Gestore degli eventi change per l'input del valore iniziale e massimo nelle impostazioni
    generalEventDelegateElement.addEventListener("change", (event) => {
        const targetId = event.target.id;

        switch (targetId) {
            case "startCount":
                handleInputChange(parseInt(event.target.value));
                break;

            case "maxCount":
                handleInputChange(parseInt(event.target.value), true);
                break;
        }
    });



    // Funzione per gestire il cambiamento di input
    function handleInputChange(value, isMaxValue = false) {
        if (isNaN(value)) {
            window.alert("Attenzione: sono accettati solo valori numerici!"); // Avvisa se il valore non è numerico
        } else {
            if (isMaxValue) {
                maxValue = value; // Imposta il valore massimo
            } else {
                let adjustedValue = value;
                if (maxValue !== null && value > maxValue) {
                    adjustedValue = maxValue; // Imposta il valore corretto rispetto al massimo
                }
                counterValue = adjustedValue; // Imposta il valore del contatore
            }

            updateCounterDisplay();
            updateButtonState();
        }
    }

    // Funzione per aggiornare la visualizzazione del contatore
    function updateCounterDisplay() {
        sectionContainer.textContent = counterValue;
    }

    // Funzione per aggiornare lo stato dei pulsanti
    function updateButtonState() {
        const incrementBtn = document.getElementById("button2");
        const decrementBtn = document.getElementById("button1");

        // Utilizzo dell'operatore ternario per semplificare le condizioni
        incrementBtn.disabled = (maxValue !== null && counterValue >= maxValue) ? true : false;
        decrementBtn.disabled = (counterValue <= 0) ? true : false;

    }

    // Funzione per creare un elemento DOM con tagname, classe e innerHTML specificati
    function createDOMElement(tagname, className, innerHTML) {
        const element = document.createElement(tagname); // Crea un nuovo elemento
        element.className = className; // Imposta la classe dell'elemento

        if (innerHTML) {
            element.innerHTML = innerHTML; // Imposta il contenuto HTML dell'elemento se fornito
        }

        return element; // Restituisce l'elemento creato
    }
});