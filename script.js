const inputValue = document.querySelector("#input-value");
const firstRate = document.querySelector("#first-rate");
const secondRate = document.querySelector("#second-rate");
const conclusionP = document.querySelector("#conclusion-p");
const calculationButton = document.querySelector("#calculation-button");

runEventListeners();

async function runEventListeners() {

    await document.addEventListener("DOMContentLoaded", fetchApi);
    await calculationButton.addEventListener("click", calculation);

}

function fetchApi() {

    fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FMlkRzBygmSlVCvQc1zKcCEf4X6Mw590cYWemyAD")
        .then((res) => res.json())
        .then((value) => {
            const valueArray = Object.keys(value.data);
            addFirstRateUI(valueArray);
            addSecondRateUI(valueArray);

        })
        .catch((err) => console.log(err));

}

function addFirstRateUI(valArray) {

    Array.from(valArray).forEach(element => {

        const option = document.createElement("option");
        firstRate.appendChild(option);
        option.innerHTML = element;
        option.setAttribute("value", element);

    });

}

function addSecondRateUI(valArray) {

    Array.from(valArray).forEach(element => {

        const option = document.createElement("option");
        secondRate.appendChild(option);
        option.innerHTML = element;
        option.setAttribute("value", element);

    });

}


function calculation(e) {

    const firstRateValue = firstRate.value;
    const SecondRateValue = secondRate.value;
    
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FMlkRzBygmSlVCvQc1zKcCEf4X6Mw590cYWemyAD&base_currency=${firstRateValue}`)
        .then((res) => res.json())
        .then((value) => {

            let inputData = Number(inputValue.value);
            let conclusionValue = (inputData * ((value.data[SecondRateValue]).toFixed(2))).toFixed(2);
            conclusionP.innerText = conclusionValue;

        })
        .catch((err) => console.log(err));

    e.preventDefault();
}

function formatNumber(number, decimalPlaces) {

    const factor = Math.pow(10, decimalPlaces);
    const roundedNumber = Math.round(number * factor) / factor;
    return roundedNumber.toFixed(decimalPlaces);

}