const HOut = 27.12;
const HInt = 9.51;
const eOut = 0.3;
const eInt = 0.2;


let Result = document.getElementById("result");

function calR(Load1, Load2, NoLoad1, NoLoad2) {

    let AveLoad = (Load1 + Load2) / 2;
    let AveNoLoad = (NoLoad1 + NoLoad2) / 2;

    return AveLoad - AveNoLoad;
}

function calculateInt() {

    let Load1 = parseFloat(document.getElementById("value1").value);
    let Load2 = parseFloat(document.getElementById("value2").value);
    let NoLoad1 = parseFloat(document.getElementById("value3").value);
    let NoLoad2 = parseFloat(document.getElementById("value4").value);

    let Load3 = parseFloat(document.getElementById("value5").value);
    let Load4 = parseFloat(document.getElementById("value6").value);
    let NoLoad3 = parseFloat(document.getElementById("value7").value);
    let NoLoad4 = parseFloat(document.getElementById("value8").value);

    let R1 = calR(Load1, Load2, NoLoad1, NoLoad2);
    let R2 = calR(Load3, Load4, NoLoad3, NoLoad4);

    let M = (R1 + R2) / 2;
    let Tol = HInt + (M - eInt);

    Result.innerHTML = `Intermediate Endplay = ${Tol.toFixed(2)}`;
}

function calculateOut() {

    let Load1 = parseFloat(document.getElementById("value1").value);
    let Load2 = parseFloat(document.getElementById("value2").value);
    let NoLoad1 = parseFloat(document.getElementById("value3").value);
    let NoLoad2 = parseFloat(document.getElementById("value4").value);

    let Load3 = parseFloat(document.getElementById("value5").value);
    let Load4 = parseFloat(document.getElementById("value6").value);
    let NoLoad3 = parseFloat(document.getElementById("value7").value);
    let NoLoad4 = parseFloat(document.getElementById("value8").value);

    let H2 = parseFloat(document.getElementById("H2").value);

    let R1 = calR(Load1, Load2, NoLoad1, NoLoad2);
    let R2 = calR(Load3, Load4, NoLoad3, NoLoad4);

    let M = (R1 + R2) / 2;
    let Tol = HOut - H2  + (M - eOut);

    Result.innerHTML = `Output Endplay = ${Tol.toFixed(2)}`;
 
}
function resetForm() {

    document.getElementById("value1").value = "";
    document.getElementById("value2").value = "";
    document.getElementById("value3").value = "";
    document.getElementById("value4").value = "";
    document.getElementById("value5").value = "";
    document.getElementById("value6").value = "";
    document.getElementById("value7").value = "";
    document.getElementById("value8").value = "";
    document.getElementById("H2").value = "";

    document.getElementById("result").innerHTML = "Result";
    document.getElementById("status").innerHTML = "";
}