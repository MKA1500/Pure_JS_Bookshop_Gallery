document.addEventListener('DOMContentLoaded', function () {

    console.log('document ready!');

    var ar1 = Array(4);
    ar1[0] = "john";
    ar1[1] = "john1";
    ar1[2] = "john2";
    ar1[3] = "john3";

    console.log(ar1);

    function displayArray() {
        var n = ar1.length;
        console.log(n);
        var ResultsDiv = document.getElementById("ResultsDiv");

        for (var i = 0; i < n; i++) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = "item " +
                (i + 1).toString() + " of " +
                    n.toString() + " is " + ar1[i];
            ResultsDiv.appendChild(newDiv);
        }
    }

    var showArrayButton = document.getElementById("showArrayButton");
    showArrayButton.addEventListener("click", displayArray);

}, false);