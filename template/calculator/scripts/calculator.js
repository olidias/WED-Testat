/**
 * core
 */
/** Aufrufe der Objekte mit .this nicht möglich, da der Context nicht stimmt. .this bezieht sich auf das Element im DOM-Tree (fieldSet) **/
document.calculator = {
    newNumber: "",
    oldNumber: "",
    operator: "",
    result: "",

    click: function (event) {
        var buttonClass = event.target.getAttribute("class");
        switch(buttonClass){
            case "number":
            document.calculator.newNumber = 10 * document.calculator.newNumber + parseInt(event.target.getAttribute('value'));
            document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
                break;
            case "operator":
                document.calculator.operator = event.target.getAttribute('value');
                if (document.calculator.oldNumber == "") {
                    document.calculator.oldNumber = document.calculator.newNumber;
                    document.calculator.newNumber = "";
                }
                document.ui.display(document.calculator.oldNumber, document.calculator.operator, document.calculator.newNumber);
                break;
            case "command":
                var command = event.target.getAttribute('id');
                if (command == "key-=") {
                    document.calculator.calculate();
                }
                else if (command == "key-c") {
                    document.calculator.newNumber = "";
                    document.calculator.oldNumber = "";
                    document.calculator.operator = "";
                    document.calculator.result = "";
                    document.ui.clear();
            }
                break;
        }
    },
    calculate: function (event) {
        switch(document.calculator.operator) {
            case "+":
                document.calculator.result = document.calculator.oldNumber + document.calculator.newNumber;
                break;
            case "-":
                document.calculator.result = document.calculator.oldNumber - document.calculator.newNumber;
                break;
            case "/":
                if (document.calculator.newNumber == 0) {
                    document.calculator.result = "Division by Zero";
                }
                else {
                    document.calculator.result = document.calculator.oldNumber / document.calculator.newNumber;
                }
                break;
            case "*":
                document.calculator.result = document.calculator.oldNumber * document.calculator.newNumber;
                break;
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
        this.initKey = document.querySelectorAll("button[type=button]")[0].parentElement;
        this.buttons = document.ui.initKey;
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
