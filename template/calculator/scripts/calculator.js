/**
 * core
 */
var newNumber = "";
var oldNumber = "";
var operator = "";
var result = "";

var calculator = {

    click: function (event) {
        var buttonClass = event.target.getAttribute("class");
        if (buttonClass == "number") {
            newNumber = parseInt(event.target.getAttribute('value'));
            ui.display(oldNumber, operator, newNumber);
        }
        if (buttonClass == "operator") {
            operator = event.target.getAttribute('value');
            ui.display(oldNumber, operator, newNumber);
        }
        if (buttonClass == "command") {
            var command = event.target.getAttribute('id');
            if (command == "key-=") {
                calculator.calculate();
            }
            if (command == "key-c") {
                ui.clear();
            }
        }
    },
    calculate: function (event) {
        if (operator == "+") {
            result = oldNumber + newNumber;
        }
        if (operator == "-") {
            result = oldNumber - newNumber;
        }
        if (operator == "/") {
            result = oldNumber / newNumber;
        }
        if (operator == "*") {
            result = oldNumber * newNumber;
        }
        oldNumber = "";
        newNumber = result;
        operator = "";
        ui.display(oldNumber, operator, newNumber);
    }
};

/**
 * UI
 */
var ui = {
    init: function () {
        this.input = document.querySelector(".input");
        this.output = document.querySelector("output");
        this.keys = document.querySelectorAll(".button");
        this.buttons = ui.keys.parentNode.className;
        this.buttons.on('click', calculator.click());

    },
    clear: function () {
        this.input.text("");
        this.output.text("");
    },
    display: function (oldNumber, operator, newNumber) {
        this.output.text(oldNumber, operator);
        this.input.text(newNumber);

    }
};

$(function () {
    ui.init();
});
