document.addEventListener('DOMContentLoaded', function () {

    console.log('document ready!');

    var ar1 = Array(4);
    ar1[0] = "john";
    ar1[1] = "john1";
    ar1[2] = "john2";
    ar1[3] = "john3";

    console.log(ar1);
    var arrayLength = ar1.length;
    console.log(arrayLength);

    var itemsCounter = document.getElementById("itemsCounter");

    function updateItemsCounter() {
        itemsCounter.innerHTML = "Number of items in the Array: " + arrayLength;
    }

    function displayArray() {
        var ResultsDiv = document.getElementById("ResultsDiv");
        var i = ResultsDiv.getElementsByTagName('div').length;
        console.log(i);
        for (i; i < arrayLength; i++) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = "item " +
                (i + 1).toString() + " of " +
                arrayLength.toString() + " is " + ar1[i];
            newDiv.className = "element_" + i;
            ResultsDiv.insertBefore(newDiv, ResultsDiv.firstChild);
        }
    }

    function addItemToExistingList() {
        ar1[arrayLength] = document.getElementById("textValue").value;
        arrayLength++;
        document.getElementById("textValue").value = "";
        console.log(ar1);

        updateItemsCounter();
    }

    updateItemsCounter();

    var showArrayButton = document.getElementById("showArrayButton");
    showArrayButton.addEventListener("click", displayArray);

    var addToArray = document.getElementById("addToArray");
    addToArray.addEventListener("click", addItemToExistingList);

}, false);