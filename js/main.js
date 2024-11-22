addEventstoinputs(); // Roept de functie aan die keyup-events toevoegt aan inputvelden.
changeTitleToInput(); // Roept de functie aan die klikevents toevoegt aan headers om ze aanpasbaar te maken.

function addEventstoinputs() {
    var taskInput = document.getElementsByClassName("toDo__input"); // Selecteert alle elementen met de class "toDo__input".
    for (var i = 0; i < taskInput.length; i++) { // Loopt door alle geselecteerde input-elementen.
        taskInput[i].onkeyup = function (event) { // Voegt een keyup-eventlistener toe aan elk input-element.
            newTask(event); // Wanneer een toets wordt losgelaten, wordt de functie newTask aangeroepen.
        }
    }
}

function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header"); // Selecteert alle elementen met de class "toDo__header".
    for (var i = 0; i < headers.length; i++) { // Loopt door alle geselecteerde headers.
        headers[i].onclick = function () { // Voegt een klik-eventlistener toe aan elke header.
            var oldTitle = this.children[0].innerText; // Haalt de tekst van het eerste kind (de <h2> header) op.
            this.children[0].remove(); // Verwijdert de huidige header (<h2> element).
            var newInput = document.createElement("input"); // Creëert een nieuw input-element.
            newInput.classList = "toDo__headerInput"; // Voegt een class toe aan het nieuwe input-element.
            newInput.value = oldTitle; // Zet de oude headertekst als waarde van het input-element.
            this.appendChild(newInput); // Voegt het input-element toe aan de huidige header.
            newInput.focus(); // Zet de focus op het nieuwe input-element, zodat de gebruiker meteen kan typen.

            newInput.onkeyup = function (event) { // Voegt een keyup-eventlistener toe aan het input-element.
                if (event.key === "Enter") { // Als de Enter-toets wordt ingedrukt...
                    var newTitle = event.target.value; // Haalt de waarde (tekst) van het input-element op.
                    var newHeading = document.createElement("h2"); // Creëert een nieuw <h2> element.
                    event.target.parentElement.appendChild(newHeading); // Voegt het nieuwe <h2> element toe aan de parent van het input-element.
                    newHeading.innerText = newTitle; // Zet de tekst van de nieuwe <h2> naar de ingevoerde waarde.
                    newHeading.classList = "toDo__heading"; // Voegt een class toe aan het nieuwe <h2> element.
                    this.remove(); // Verwijdert het input-element.
                }
            }
        }
    }
}

function newTask(event) {
    if (event.key === "Enter") { // Als de Enter-toets wordt ingedrukt...
        var tasks = event.target.parentElement.parentElement.children[1].children[0]; // Selecteert de ul-lijst die bij de taak hoort.
        var newTask = document.createElement("li"); // Creëert een nieuw <li> element voor de taak.
        newTask.innerText = event.target.value; // Zet de tekst van de nieuwe taak naar de ingevoerde waarde.
        newTask.classList = "toDo__task"; // Voegt een class toe aan de nieuwe taak.
        newTask.dataset.running = "false"; // Voegt een dataset toe om bij te houden of de timer voor deze taak actief is.
        tasks.appendChild(newTask); // Voegt de nieuwe taak toe aan de ul-lijst.
        event.target.value = ""; // Leegt het inputveld na het toevoegen van de taak.
        newTask.onclick = function (event) { // Voegt een klik-eventlistener toe aan de nieuwe taak.
            setOrClearTimer(event); // Roept de functie aan om de timer te starten of te stoppen.
        }
    }
}

var tasks = document.getElementsByClassName("toDo__task"); // Selecteert alle bestaande taken (li-elementen met de class "toDo__task").
var timer = null; // Variabele om de timer op te slaan.

for (var i = 0; i < tasks.length; i++) { // Loopt door alle bestaande taken.
    tasks[i].onclick = function (event) { // Voegt een klik-eventlistener toe aan elke taak.
        setOrClearTimer(event); // Roept de functie aan om de timer te starten of te stoppen.
    }
}

function toDone(event) {
    timer = setTimeout(function () { // Zet een timer die na 3 seconden afgaat.
        var doneTask = document.createElement("li"); // Creëert een nieuw <li> element voor de voltooide taak.
        doneTask.classList = "toDo__task toDo__task--done"; // Voegt de classes toe voor een voltooide taak.
        doneTask.innerText = event.target.innerText; // Zet de tekst van de voltooide taak gelijk aan de originele taak.
        document.getElementById("js--done").appendChild(doneTask); // Voegt de voltooide taak toe aan de lijst van voltooide taken.
        event.target.remove(); // Verwijdert de originele taak uit de lijst van lopende taken.
    }, 3000); // Stelt de timer in op 3 seconden.
}

function setOrClearTimer(event) {
    if (event.target.dataset.running === "false") { // Controleert of de timer niet actief is.
        event.target.classList.toggle("toDo__task--done"); // Wisselt de 'done' class (zodat de taak visueel verandert).
        event.target.dataset.running = "true"; // Zet de status van de timer op 'actief'.
        toDone(event); // Roept de functie aan om de taak na 3 seconden te voltooien.
    }
    else if (event.target.dataset.running === "true") { // Als de timer actief is...
        event.target.classList.toggle("toDo__task--done"); // Wisselt de 'done' class uit (om de visuele verandering ongedaan te maken).
        clearTimeout(timer); // Stopt de actieve timer.
        event.target.dataset.running = "false"; // Zet de status van de timer op 'inactief'.
    }
}

var fab = document.getElementById("js--fab"); // Selecteert de floating action button (fab).
fab.onclick = function () { // Voegt een klik-eventlistener toe aan de fab.
    makeNewCard(); // Roept de functie aan om een nieuwe to-do card te maken.
}

function makeNewCard() {
    /* Make the card */
    var newTodo = document.createElement("article"); // Creëert een nieuw <article> element voor de to-do card.
    newTodo.classList = "toDo"; // Voegt een class toe aan het artikel.

    /* Make the header */
    var newHeader = document.createElement("header"); // Creëert een nieuw <header> element voor de card.
    newHeader.classList = "toDo__header"; // Voegt een class toe aan de header.

    /* Make the Heading */
    var newHeading = document.createElement("h2"); // Creëert een nieuw <h2> element voor de titel van de card.
    newHeading.classList = "toDo__heading"; // Voegt een class toe aan de heading.
    newHeading.innerText = "Default"; // Zet de standaard tekst voor de titel.

    /*Make the Section */
    var newSection = document.createElement("section"); // Creëert een nieuw <section> element voor de body van de card.
    newSection.classList = "toDo__body"; // Voegt een class toe aan de section.

    /*Make the UL */
    var newList = document.createElement("ul"); // Creëert een nieuw <ul> element voor de takenlijst in de card.
    newList.classList = "toDo__tasks"; // Voegt een class toe aan de ul-lijst.

    /* Make the Footer */
    var newFooter = document.createElement("footer"); // Creëert een nieuw <footer> element voor de onderkant van de card.
    newFooter.classList = "toDo__footer"; // Voegt een class toe aan de footer.

    /* Make the Input */
    var newInput = document.createElement("input"); // Creëert een nieuw <input> element voor het toevoegen van taken.
    newInput.classList = "toDo__input"; // Voegt een class toe aan het input-element.
    newInput.type = "text"; // Zet het type van het input-element op "text".
    newInput.placeholder = "Enter a task..."; // Zet een placeholder tekst in het inputveld.

    newFooter.appendChild(newInput); // Voegt het input-element toe aan de footer.
    newSection.appendChild(newList); // Voegt de ul-lijst toe aan de section.
    newHeader.appendChild(newHeading); // Voegt de heading toe aan de header.
    newTodo.appendChild(newHeader); // Voegt de header toe aan de card.
    newTodo.appendChild(newSection); // Voegt de section toe aan de card.
    newTodo.appendChild(newFooter); // Voegt de footer toe aan de card.

    document.getElementsByTagName("body")[0].appendChild(newTodo); // Voegt de nieuwe card toe aan de body van het document.
    addEventstoinputs(); // Voegt de eventlisteners toe aan het input-element van de nieuwe card.
    changeTitleToInput(); // Voegt de mogelijkheid toe om de titel van de nieuwe card aan te passen.
}
