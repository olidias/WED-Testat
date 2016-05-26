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
    numberHandler: function(number) {
        if (number >= 0 && memory.operator != "-") {
            memory.newNumber = 10 * memory.newNumber + number;
            return memory.newNumber;
        }
        else {
            memory.newNumber = 10* memory.newNumber + number;
            return memory.newNumber;
        }
    },
    operatorHandler: function(newOperator) {
        if (memory.oldNumber == "") {
            memory.oldNumber = memory.newNumber;
            memory.newNumber = "";
        }
        memory.operator = newOperator;
        var returnArray = [];
        returnArray[0] = memory.oldNumber;
        returnArray[1] = memory.operator;
        returnArray[2] = memory.newNumber;
        return returnArray;
    },
    commandHandler: function(command) {
        var returnArray = [];
        if (command == "key-=") {
            calculator.calculate();
            returnArray[0] = memory.oldNumber;
            returnArray[1] = memory.operator;
            returnArray[2] = memory.oldNumber;
            returnArray[4] = memory.result;
            return returnArray;
        }
        else if (command == "key-c") {
            memory.newNumber = "";
            memory.oldNumber = "";
            memory.operator = "";
            memory.result = "";
            returnArray[0] = memory.oldNumber;
            returnArray[1] = memory.operator;
            returnArray[2] = memory.oldNumber;
            returnArray[4] = memory.result;
            return command;
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
            memory.newNumber = "";
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
        this.buttons.addEventListener('click', ui.click);
    },
        click: function (event) {
            var buttonClass = event.target.getAttribute("class");
            switch(buttonClass) {
                case "number":
                    this.number = parseInt(event.target.getAttribute('value'));
                    this.numberReturn = calculator.numberHandler(this.number);
                    ui.display();
                    break;
                case "operator":
                    this.operator = event.target.getAttribute('value');
                    this.operatorReturn = calculator.operatorHandler(this.operator);
                    ui.display();
                    break;
                case "command":
                    this.command = event.target.getAttribute('id');
                    calculator.commandHandler(this.command);
                    if (this.command == "key-c") {
                        ui.clear();
                    }
                    else if (this.command == "key-=") {

                        ui.display();

                    }
                    break;
            }
    },
    clear: function () {
        ui.input.innerHTML = "";
        ui.output.innerHTML = "";
    },
    display: function () {
        ui.output.innerHTML = memory.oldNumber + " " + memory.operator;
        ui.input.innerHTML = memory.newNumber;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    ui.init();
});
