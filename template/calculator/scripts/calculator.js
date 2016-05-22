/**
 * core
 */

document.calculator = {
    newNumber: "",
    oldNumber: "",
    operator: "",
    result: "",

    click: function (event) {
        var buttonClass = event.target.getAttribute("class");
        if (buttonClass == "number") {
            document.calculator.newNumber = 10 * document.calculator.newNumber + parseInt(event.target.getAttribute('value'));
            document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
        }
        if (buttonClass == "operator") {
            document.calculator.operator = event.target.getAttribute('value');
            if (document.calculator.oldNumber == "") {
                document.calculator.oldNumber = document.calculator.newNumber;
                document.calculator.newNumber = "";
            }
            document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
        }
        if (buttonClass == "command") {
            var command = event.target.getAttribute('id');
            if (command == "key-=") {
                document.calculator.calculate();
            }
            if (command == "key-c") {
                document.calculator.newNumber = "";
                document.calculator.oldNumber = "";
                document.calculator.operator = "";
                document.calculator.result = "";
                document.ui.clear();
            }
        }
    },
    calculate: function (event) {
        if (document.calculator.operator == "+") {
            document.calculator.result = document.calculator.oldNumber + document.calculator.newNumber;
        }
        if (document.calculator.operator == "-") {
            document.calculator.result = document.calculator.oldNumber - document.calculator.newNumber;
        }
        if (document.calculator.operator == "/") {
            if (document.calculator.newNumber == 0) {
                document.calculator.result = "Division by Zero";
            }
            else {
                document.calculator.result = document.calculator.oldNumber / document.calculator.newNumber;
            }
        }
        if (document.calculator.operator == "*") {
            document.calculator.result = document.calculator.oldNumber * document.calculator.newNumber;
        }
        document.calculator.oldNumber = "";
        document.calculator.newNumber = document.calculator.result;
        document.calculator.operator = "";
        if (document.calculator.result == "Division by Zero") {
            document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
            document.calculator.newNumber = "";
        }
        else {
            document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
        }
    }
};

/**
 * UI
 */
document.ui = {
    init: function () {
        this.input = document.querySelector("#input");
        this.output = document.querySelector("#output");
        this.input.innerHTML = "Welcome";
        this.keys = document.querySelectorAll("button[type=button]");
        this.buttons = document.ui.keys[0].parentElement;
        this.buttons.addEventListener('click', document.calculator.click);

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
    document.ui.init();
});
