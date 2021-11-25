var numbers = document.querySelectorAll(".number");
var operationBtns = document.querySelectorAll(".operator");
var decimalBtn = document.getElementById("decimal");
var clearBtns = document.querySelectorAll(".clear-btn");
var dispaly = document.getElementById("display");
var signChangeBtn = document.getElementById("+/-");
var MemoryCurrentNumber = 0;
var MemoryNewNumber = false;
var MemoryPendingOperation = "";
var NumberWillBeRaisedToPower = null;

for (var i = 0; i < numbers.length; i++){
  var number = numbers[i];
  number.addEventListener("click", function (e){
    numberPress(e.target.textContent);
  });
};

for (var i = 0; i < operationBtns.length; i++){
  var operationBtn = operationBtns[i];
  operationBtn.addEventListener("click", function (e){
    operation(e.target.textContent);
  });
};

for (var i = 0; i < clearBtns.length; i++){
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e){
    clear(e.srcElement.id);
  });
};

decimalBtn.addEventListener("click", function (e){
  decimal(e.target.textContent);
});

signChangeBtn.addEventListener("click", function (e){
  changeSign();
});

function numberPress(number){
  if (!MemoryNewNumber && display.value !== "Error"){
    if (dispaly.value === "0"){
      dispaly.value = number;
    } else {
      display.value += number;
    };
  } else {
    if (NumberWillBeRaisedToPower !== null){
      display.value = round(Math.pow(NumberWillBeRaisedToPower, number));
      NumberWillBeRaisedToPower = null;
      MemoryNewNumber = false;
      return;
    };
    dispaly.value = number;
    MemoryNewNumber = false;
  };
};

function operation(op){
  var localOperationMemory = display.value;
  if(display.value === "Error"){
    MemoryCurrentNumber = 0;
    localOperationMemory = 0;
  }
  if (op === "√"){
    if (parseFloat(display.value) < 0){
      display.value = "Error";
      MemoryCurrentNumber = 0;
      return;
    } else {
      display.value = round(Math.sqrt(localOperationMemory));
      return;
    };
  };
  if (op === "xy"){
    if (NumberWillBeRaisedToPower === null){
      NumberWillBeRaisedToPower = localOperationMemory;
      MemoryNewNumber = true;
      return;
    }
  };
  if (MemoryNewNumber && MemoryPendingOperation !== "="){
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+"){
      MemoryCurrentNumber += parseFloat(localOperationMemory);
      MemoryCurrentNumber = round(MemoryCurrentNumber);
    } else if (MemoryPendingOperation === "-"){
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
      MemoryCurrentNumber = round(MemoryCurrentNumber);
    } else if (MemoryPendingOperation === "*"){
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
      MemoryCurrentNumber = round(MemoryCurrentNumber);
    } else if (MemoryPendingOperation === "/"){
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
      MemoryCurrentNumber = round(MemoryCurrentNumber);
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
      MemoryCurrentNumber = round(MemoryCurrentNumber);
    };
    dispaly.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  };
};

function decimal(argument){
  var localDecimalMemory = display.value;
  if (!MemoryNewNumber && display.value !== "Error") {
    if (localDecimalMemory.indexOf(".") === -1){
      localDecimalMemory += ".";
    };
  } else {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  };
  display.value = localDecimalMemory;
};

function clear(id){
  if (id === "ce"){
    dispaly.value = "0";
    MemoryNewNumber = true;
  } else if(id === "←"){
    var arr = display.value.split("");
    if(arr.length < 2){
      display.value = "0";
    } else {
      arr.splice(arr.length - 1, 1);
      display.value = arr.join("");
    };
  } else {
    dispaly.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
    NumberWillBeRaisedToPower = null;
  };
};

function changeSign(){
    if (display.value === "Error"){
      dispaly.value = "0";
    } else {
      dispaly.value = -parseFloat(dispaly.value);
    };
};

function round(number){
  number = number.toFixed(16);
  var arr = number.split("");
  while (arr[arr.length - 1] === "0"){
    arr.splice(arr.length - 1, 1);
  };
  number = arr.join("");
  return Number(number);
};