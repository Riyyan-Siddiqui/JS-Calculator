"use strict";

let $ = (id) => {
  return document.getElementById(id);
};

//Accessing DOM elements

let keys = document.querySelectorAll(".keys");
let screen = $("screen");
let inputScreen = document.querySelectorAll("#screen p")[1];
let outputScreen = document.querySelectorAll("#screen p")[0];
let operation;
let input = [];
let output = [];
let result,
  count = 0;

keys.forEach((key) => {
  key.addEventListener("click", (evt) => {
    displayOnScreen(evt.target);
  });
});

const displayOnScreen = (el) => {
  const id = el.getAttribute("id");
  //for clearing both the input and the output screen completely
  if (el.innerText === "C") {
    input = [];
    output = [];

    inputScreen.innerText = "";
    outputScreen.innerText = "";
    return;
  }
  //for deleting one number from the end.
  else if (el.innerText === "Del") {
    input.pop();
  }

  //for adding or removing - sign.
  else if (el.getAttribute("class") === "fa-solid fa-plus-minus") {
    if (input[0] === "-") {
      input.shift();
      output.shift();
    } else {
      input.unshift("-");
      output.unshift("-");
    }
  } else if (["+", "-", "*", "/"].includes(id)) {

    
    if (input.length > 0 && input[input.length - 1] != isNaN()) {
      if (count == 1) {
        const expression = output.join("").trim();
        let answer = eval(expression);
        output = [answer];
      }
      output.push(` ${id} `);
      console.log(output);
      input = [];
      outputScreen.innerText = output.join("");
      inputScreen.innerText = "";
      count = 1;
    }
    else if (input[input.length - 1] != isNaN()) {
      output.pop();
      output.push(` ${id} `);
      outputScreen.innerText = output.join(""); 
    }
  } else if (id == "=") {
    const expression = output.join("").trim();
    result = eval(expression);
    console.log(result.toFixed(2));
    input = [result];
    output = [result];
    outputScreen.innerText = "";
  } else {
    input.push(el.innerText);
    output.push(el.innerText);
  }
  inputScreen.innerText = input.join("");
};
