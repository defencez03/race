function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

// Инициализация игрового поля
function initMatrix(){
    let table = document.getElementById("matrix");
    for(let i = 0; i < 20; i++){
        let row = table.insertRow(i);
        for(let j = 0; j < 10; j++){
            let cell = row.insertCell(j);
            cell.id = String(i)+"-"+String(j);
            cell.style.width = "25px";
            cell.style.height = "25px";
            cell.style.background = "black";
        }
    }
    for(let i = 0; i < 20; i++){
        if((i + 1) % 4 != 0){
            document.getElementById(String(i)+"-"+String(0)).style.background = "red";
            document.getElementById(String(i)+"-"+String(9)).style.background = "red";
        }
    }
}

// Отоброжение игрового поля со спрайтами(автомобилями)
function dynamicCar(){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            document.getElementById(String(i)+"-"+String(j)).style.background = "black";
        }
    }
    for(let i = 0; i < 20; i++){
        if((i + 1) % 4 != 0){
            document.getElementById(String(i)+"-"+String(0)).style.background = "red";
            document.getElementById(String(i)+"-"+String(9)).style.background = "red";
        }
    }
    for(let i = 0; i < carPlayerX.length; i++){
        for(let j = 0; j < allX.length; j++){
            if(carPlayerX[i] == allX[j] && carPlayerY[i] == allY[j]){
                alert("Вы попали в ДТП...");
                y1 = 0, y2 = 0, y3 = 0, xVar1 = 0, xVar2 = 0, xVar3 = 0;
                allY = [], allX = [], carY1 = [], carX1 = [];
                carY2 = [], carX2 = [], carY3 = [], carX3 = [];
                clearInterval(timerID);
                startGame();
            }
        }
    }
    for(let i = 0; i < allX.length; i++){
        if(document.getElementById(String(allY[i])+"-"+String(allX[i])) != null){
            document.getElementById(String(allY[i])+"-"+String(allX[i])).style.background = "red";
        }
    }
    for(let i = 0; i < carPlayerX.length; i++){
        if(document.getElementById(String(carPlayerY[i])+"-"+String(carPlayerX[i])) != null){
            document.getElementById(String(carPlayerY[i])+"-"+String(carPlayerX[i])).style.background = "orange";
        }
    }
    return;
}

// Инициализация массива с координатами встречного массива
function initCar(y, xVar, carY, carX){
    carY.length = 0;
    carX.length = 0;
    if(y - 3 < 20){
        carY.push(y);
        carX.push(xVar);
        for(let x = xVar - 1; x < xVar + 2; x++){
            carY.push(y-1);
            carX.push(x);
        }
        carY.push(y-2);
        carX.push(xVar);
        for(let x = xVar - 1; x < xVar + 2; x = x + 2){
            carY.push(y-3);
            carX.push(x);
        }
        y++;
    } else y = -1; 
    return y;
}

// Определение стороны, с который выйдет авто
function startCar(y, xVar, carX, carY){
    if(y == -1){
        y = 0;
        startCar(y, xVar, carX, carY);
    }
    if(y == 0){
        let variant = getRandInt(0, 1);
        if(variant == 0) xVar = 3;
        else xVar = 6;
    }
    y = initCar(y, xVar, carY, carX);
    return [y, xVar];
}

// Объединение координат всез встречных машин
function allCars(){
    allX.length = 0;
    allY.length = 0;
    let values = startCar(y1, xVar1, carX1, carY1);
    y1 = values[0];
    xVar1 = values[1];
    allX = allX.concat(carX1);
    allY = allY.concat(carY1);
    if(y1 >= 9 || y2 > 1){
        values = startCar(y2, xVar2, carX2, carY2);
        y2 = values[0];
        xVar2 = values[1];
        allX = allX.concat(carX2);
        allY = allY.concat(carY2);
        if(y1 >= 17 || y3 > 1){ 
            values = startCar(y3, xVar3, carX3, carY3);
            y3 = values[0];
            xVar3 = values[1];
            allX = allX.concat(carX3);
            allY = allY.concat(carY3);
        }
    } 
}

// Инициализация массива с координатами автомобиля игрока
function carPlayer(xVarPlayer){
    let y = 19;
    carPlayerY.length = 0;
    carPlayerX.length = 0;
    carPlayerY.push(y-3);
    carPlayerX.push(xVarPlayer);
    for(let x = xVarPlayer - 1; x < xVarPlayer + 2; x++){
        carPlayerY.push(y-2);
        carPlayerX.push(x);
    }
    carPlayerY.push(y-1);
    carPlayerX.push(xVarPlayer);
    for(let x = xVarPlayer - 1; x < xVarPlayer + 2; x = x + 2){
        carPlayerY.push(y);
        carPlayerX.push(x);
    }
}

// Начало игры
function startGame(){
    carPlayer(3);
    timerID = setInterval(() => { 
        allCars(); 
        dynamicCar();}, 200);
    window.addEventListener("keydown", function(event){ 
        switch(event.keyCode){
            case 68: 
                carPlayer(6);
                break;
            case 65: 
                carPlayer(3);
                break;
            case 87:
                if(event.repeat == false){
                    this.clearInterval(timerID);
                    timerID = setInterval(() => { 
                        allCars(); 
                        dynamicCar();}, 100);
                }
                break;
            case 83: 
                if(event.repeat == false){
                    this.clearInterval(timerID);
                    timerID = setInterval(() => { 
                        allCars(); 
                        dynamicCar();}, 300);
                }
                break;
        }
    });
    window.addEventListener("keyup", function(event) {
        if(event.keyCode == 87 || event.keyCode == 83){
            this.clearInterval(timerID);
                timerID = setInterval(() => { 
                    allCars(); 
                    dynamicCar();}, 200);
        }
    });
}

let y1 = 0, y2 = 0, y3 = 0, xVar1 = 0, xVar2 = 0, xVar3 = 0;
let allY = [], allX = [], carY1 = [], carX1 = [],  carY2 = [], carX2 = [], carY3 = [], carX3 = [];
let carPlayerX = [], carPlayerY = [];
let timerID = null;

initMatrix();
startGame();