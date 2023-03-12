const drawingWall = document.querySelector("#drawing-wall");
const box = document.querySelector("#container");
const grid = document.createElement("table");
grid.style.borderCollapse = "collapse";

const xhr = new XMLHttpRequest();

const rows = grid.rows;
const colors = [];
const colorPicker = document.querySelector("#color-picker");

const sendBtn = document.getElementById("add-button");
const wallBtn = document.getElementById("go-regen");
const deletBtn = document.createElement("button");
const clear = document.getElementById("clear-draw");


sendBtn.innerHTML = "Submit";
wallBtn.innerHTML = "See wall";
clear.innerHTML = "Clear";
deletBtn.innerHTML ="Delete all colums";

sendBtn.addEventListener("click", send);
deletBtn.addEventListener("click",DeleteData);
clear.addEventListener("click",ClearAll);

sendBtn.classList.add("add-drawing-btn");

box.appendChild(sendBtn);
box.appendChild(wallBtn);
box.appendChild(clear);
document.body.appendChild(deletBtn);

//regenerate the color

function ClearAll(){

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].cells.length; j++) {
      let cell = rows[i].cells[j];
      cell.style.backgroundColor = "#FFFFFF";
    }

  }
}

//delete all colums
function DeleteData(){
  if (confirm("Are you sure you want to delete all columns?")) {
    // make an AJAX request to the server to delete the columns
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://11b6-105-99-59-27.eu.ngrok.io/pixel/delete_colums_test.php", true);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert("Columns deleted successfully");
      }
    }
  }
}

//fonction send file
function send() {

    for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
          let cell = rows[i].cells[j];
          let color = ({
            row: i,
            col: j,
            color: cell.style.backgroundColor
          });
          colors.push(color);

        }

      }
      
      //--------- Client side -------------------//
      const params = new URLSearchParams(window.location.search);
const username = params.get('username');
const password = params.get('password');
console.log(username);

const data = { username: username, password: password, colors: colors };
xhr.open("POST","https://11b6-105-99-59-27.eu.ngrok.io/pixel/ServerMode.php", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log("Data inserted successfully");
    document.getElementById("response").innerHTML = xhr.responseText;
  }
};
xhr.send(JSON.stringify(data));
sendBtn.removeEventListener("click", send);

setTimeout(function() {
  location.reload();
}, 5000);
}

wallBtn.addEventListener("click", function() {
  // Redirigez l'utilisateur vers la nouvelle URL
  window.location.href = "https://11b6-105-99-59-27.eu.ngrok.io/pixel/Regen.html";
});


//-----------------------------------------//

for (let i = 0; i < 9; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < 9; j++) {
    const cell = document.createElement("td");
    cell.style.border = "1px solid black";
    cell.style.width = "50px";
    cell.style.height = "50px";
    cell.addEventListener("click", function() {

      this.previousColor = this.style.backgroundColor;
      this.style.backgroundColor = colorPicker.value;
    });

    cell.addEventListener("contextmenu", function(event) {
      event.preventDefault();
      if (this.previousColor) {
        this.style.backgroundColor = this.previousColor;
        this.previousColor = null;
      } else {
        this.style.backgroundColor = "";
      }
    });
    cell.addEventListener("mousedown", function(event) {
      if (event.buttons === 4) {
        colorPicker.value = window.getComputedStyle(this).getPropertyValue("background-color");
      }
    });
    row.appendChild(cell);
  }
  grid.appendChild(row);
}
drawingWall.appendChild(grid);

