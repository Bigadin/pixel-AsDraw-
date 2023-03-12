const grid = document.querySelector("#grid");

const rows = grid.rows;

const genbtn = document.createElement("button");
const proc = document.createElement("h2");
proc.innerHTML = "proceeding ...";
genbtn.innerHTML = "generate";
genbtn.addEventListener("click", getData);
document.body.appendChild(proc);
document.body.appendChild(genbtn);
getData();
alert("proceeding ...");
 function createGrid(){
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 27; j++) {
        const cell = document.createElement("td");    

        row.appendChild(cell);
    }
    grid.appendChild(row);
  }
 }
createGrid();
let k = 0,kk = 0;
let g = 1;
let t = 1;
function getData() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const data = JSON.parse(this.responseText);

          for(let i = 0; i < data.length;i++){
            let color =({
              row : data[i].raw,
              col : data[i].col,
              colorH : data[i].colorHex
            });           
              if(i == (g * 81) ){
                 k += 9; 
                 g++;
                 
                if(g ==( t * 3) + 1){
                  k = 0;
                  createGrid();
                  kk += 9;
                  t++;
                }
              }   
            rows[parseInt(color.row) + kk].cells[parseInt(color.col) + k].style.backgroundColor = color.colorH;
            
            
          }
      }
  };
  xhr.open("GET", "https://d3fd-105-101-73-36.eu.ngrok.io/pixel/getElementOfDB.php", true);
  xhr.send();
}
