/**
 * Memory
 */
function Memory() {
    this.newNumber = "";
    this.oldNumber = "";
    this.operator = "";
    this.result = "";
}

var memory = new Memory();

/**
 * core
 */
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
            calculator.display(memory.oldNumber, memory.operator, memory.newNumber);
                break;
            case "operator":
                memory.operator = event.target.getAttribute('value');
                if (memory.oldNumber == "") {
                    memory.oldNumber = memory.newNumber;
                    memory.newNumber = "";
                }
                calculator.display(memory.oldNumber, memory.operator, memory.newNumber);
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
                    calculator.clear();
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
            calculator.display(memory.oldNumber, memory.operator, memory.newNumber);
            memory.newNumber = "";
        }
        else {
            calculator.display(memory.oldNumber, memory.operator, memory.newNumber);
        }
    },
    clear: function () {
        ui.input.innerHTML = "";
        ui.output.innerHTML = "";
    },
    display: function (oldNumber, operator, newNumber) {
        ui.output.innerHTML = oldNumber + " " +  operator;
        ui.input.innerHTML =  newNumber;

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

    }
};

document.addEventListener('DOMContentLoaded', function() {
    ui.init();
});
