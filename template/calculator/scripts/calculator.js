/**
 * core
 */
function Memory() {
    this.newNumber = "";
    this.oldNumber = "";
    this.operator = "";
    this.result = "";
}
var memory = new Memory();
/** Aufrufe der Objekte mit .this nicht möglich, da der Context nicht stimmt. .this bezieht sich auf das Element im DOM-Tree (fieldSet) **/
var calculator = {
    click: function (event) {
        var buttonClass = event.target.getAttribute("class");
        switch(buttonClass) {
            case "number":
                if (memory.newNumber >= 0) {
                memory.newNumber = 10 * memory.newNumber + parseInt(event.target.getAttribute('value'));
                }
                else {
                    memory.newNumber = 10* memory.newNumber - parseInt(event.target.getAttribute('value'));
                }
            ui.display(memory.oldNumber, memory.operator, memory.newNumber);
                break;
            case "operator":
                memory.operator = event.target.getAttribute('value');
                if (memory.oldNumber == "") {
                    memory.oldNumber = memory.newNumber;
                    memory.newNumber = "";
                }
                ui.display(memory.oldNumber, memory.operator, memory.newNumber);
                break;
            case "command":
                var command = event.target.getAttribute('id');
                if (command == "key-=") {
                    calculator.calculate();
                }
                else if (command == "key-c") {
                    memory.newNumber = "";
                    memory.oldNumber = "";
                    memory.operator = "";
                    memory.result = "";
                    ui.clear();
            }
                break;
        }
    },
    calculate: function (event) {
        switch(memory.operator) {
            case "+":
                memory.result = memory.oldNumber + memory.newNumber;
                break;
            case "-":
                memory.result = memory.oldNumber - memory.newNumber;
                break;
            case "/":
                if (memory.newNumber == 0) {
                    memory.result = "Division by Zero";
                }
                else {
                    memory.result = memory.oldNumber / memory.newNumber;
                }
                break;
            case "*":
                memory.result = memory.oldNumber * memory.newNumber;
                break;
        }
        memory.oldNumber = "";
        memory.newNumber = memory.result;
        memory.operator = "";
        if (memory.result == "Division by Zero") {
            ui.display(memory.oldNumber, memory.operator, memory.newNumber);
            memory.newNumber = "";
        }
        else {
            ui.display(memory.oldNumber, memory.operator, memory.newNumber);
        }
    }
};

/**
 * UI
 */
var ui = {
    init: function () {
        this.input = document.querySelector("#input");
        this.output = document.querySelector("#output");
        this.input.innerHTML = "Welcome";
        this.initKey = document.querySelectorAll("button[type=button]")[0].parentElement;
        this.buttons = ui.initKey;
        this.buttons.addEventListener('click', calculator.click);

    },
    clear: function () {
        this.input.innerHTML = "";
        this.output.innerHTML = "";
    },
    display: function (oldNumber, operator, newNumber) {
        this.output.innerHTML = oldNumber + " " +  operator;
        this.input.innerHTML =  newNumber;

    }
};

document.addEventListener('DOMContentLoaded', function() {
    ui.init();
});
