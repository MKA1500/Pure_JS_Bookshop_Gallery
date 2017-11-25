document.addEventListener('DOMContentLoaded', function () {


    function getBooks(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(xhr);
            }
        };
        xhr.open("GET", url, true);
        xhr.send('');
    }

    getBooks('books.json', function (xhr) {

        function saveCustomNumberOfPages() {
            if (typeof(Storage) !== "undefined") {
                window.localStorage.setItem("minPages", minPages.toString());
            } else {
                console.log('Niestety Twoja przeglądarka nie obsługuje Local Storage...');
            }
        }

        function restoreOriginal() {
            booksList = JSON.parse(xhr.responseText),
                minPages = 0;
            displayBooksList(minPages);
            saveCustomNumberOfPages();
            var radios = document.getElementsByTagName('input');
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked) {
                    radios[i].checked = false;
                }
            }
            inputHowManyPages.value = "";
            setInLocalStorage("no", "no", "no");
            addSortableValues();
            return booksList, minPages;
        }

        function hideBooksList() {
            while (orderedBooksList.hasChildNodes()) {
                orderedBooksList.removeChild(orderedBooksList.lastChild);
            }
        }

        function displayBooksList(minPages) {
            hideBooksList();
            var itemNumber = 1;
            var newDiv;
            for (var i = 0; i < listLength; i++) {
                if (booksList[i].pages > minPages) {
                    newDiv = document.createElement("div");
                    newDiv.className = "item";
                    newDiv.innerHTML =
                        "<h3 class='item-number'>" + itemNumber + "</h3>" +
                        "<div id='img-wrap-" + (i + 1) + "'>" +
                        "<img src='" + booksList[i].cover.small + "' class='small-image'>" +
                        "<div class='large-image'>" +
                        "<div class='close'></div>" +
                        "<img src='" + booksList[i].cover.large + "'>" +
                        "</div>" +
                        "</div>" +
                        "<div class='book-description'>" +
                        "<h3 class='book-title'>" + booksList[i].title + "</h3>" +
                        "<div class='red-bar'></div>" +
                        "<h4 class='author-name'>By " + booksList[i].author + "</h4>" +
                        "<table>" +
                        "<tr>" +
                        "<td class='left-td'>Release Date:</td>" +
                        "<td class='right-td'>" + booksList[i].releaseDate + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td class='left-td'>Pages:</td>" +
                        "<td class='right-td'>" + booksList[i].pages + "</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td class='left-td'>Link:</td>" +
                        "<td class='right-td'>" +
                        "<a href='" + booksList[i].link + "' target='_blank'>shop</a>" +
                        "</td>" +
                        "</tr>" +
                        "</table>" +
                        "</div>";

                    orderedBooksList.appendChild(newDiv);
                    itemNumber++;
                }
            }
        }

        function addSortableValues() {
            var sortableDate = "";
            for (var j = 0; j < listLength; j++) {
                sortableDate = booksList[j].releaseDate;
                sortableDate = sortableDate.split('/');
                sortableDate = sortableDate[1] + sortableDate[0];
                booksList[j].sortableDate = sortableDate;
                booksList[j].sortableAuthor = booksList[j].author.split(' ')[1];
            }
        }

        function setInLocalStorage(page, date, author) {
            if (typeof(Storage) !== "undefined") {
                window.localStorage.setItem("toSortByPage", page);
                window.localStorage.setItem("toSortByDate", date);
                window.localStorage.setItem("toSortByAuthor", author);
            } else {
                console.log('Niestety Twoja przeglądarka nie obsługuje Local Storage...');
            }
        }

        function dynamicSort(property, direction) {
            var sortOrder = 1;
            if (direction === "descending") {
                return function (a, b) {
                    var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            } else if (direction === "ascending") {
                return function (a, b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
            }
        }

        function sortByPage() {
            booksList.sort(dynamicSort("pages", "descending"));
            setInLocalStorage("yes", "no", "no");
            displayBooksList(minPages);
        }

        function sortByDate() {
            booksList.sort(dynamicSort("sortableDate", "descending"));
            setInLocalStorage("no", "yes", "no");
            displayBooksList(minPages);
        }

        function sortByAuthor() {
            booksList.sort(dynamicSort("sortableAuthor", "ascending"));
            setInLocalStorage("no", "no", "yes");
            displayBooksList(minPages);
        }

        function showWithMinPages() {
            numberAlert.textContent = "";
            if (!isNaN(inputHowManyPages.value)) {
                minPages = inputHowManyPages.value;
            } else {
                numberAlert.textContent = "Please type a number";
            }
            displayBooksList(minPages);
            saveCustomNumberOfPages();
        }

        function initialSorting() {
            if (typeof(Storage) !== "undefined") {
                var ifByPage = window.localStorage.getItem("toSortByPage"),
                    ifByDate = window.localStorage.getItem("toSortByDate"),
                    ifByAuthor = window.localStorage.getItem("toSortByAuthor"),
                    ifMinPages = window.localStorage.getItem("minPages");
            } else {
                console.log('Niestety Twoja przeglądarka nie obsługuje Local Storage...');
            }

            if (ifMinPages !== "undefined") {
                minPages = ifMinPages;
                if (minPages > 0) {
                    inputHowManyPages.value = minPages;
                }
            }

            if (ifByPage === "yes") {
                sortByPage();
                checkboxPages.checked = true;
            } else if (ifByDate === "yes") {
                sortByDate();
                checkboxDate.checked = true;
            } else if (ifByAuthor === "yes") {
                sortByAuthor();
                checkboxAuthor.checked = true;
            } else {
                displayBooksList(minPages);
            }
        }

        var booksList = JSON.parse(xhr.responseText),
            listLength = booksList.length,
            orderedBooksList = document.getElementById("bookshop-main-content"),
            checkboxPages = document.getElementById("sort-pages"),
            checkboxDate = document.getElementById("sort-date"),
            numberAlert = document.getElementById("alert"),
            checkboxAuthor = document.getElementById("sort-author"),
            inputHowManyPages = document.getElementById("input-pages"),
            cleanFilters = document.getElementById("clean-filters"),
            reloadPage = document.getElementById("reload-page"),
            minPages = 0;

        addSortableValues();
        initialSorting();

        checkboxPages.addEventListener("click", sortByPage);
        checkboxDate.addEventListener("click", sortByDate);
        checkboxAuthor.addEventListener("click", sortByAuthor);
        inputHowManyPages.addEventListener("keyup", showWithMinPages);
        cleanFilters.addEventListener("click", restoreOriginal);
        reloadPage.addEventListener("click", function(){
            location.reload();
        });

        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 82 && e.altKey) {
                restoreOriginal();
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target && e.target.className == 'small-image') {
                var parent = e.target.parentNode;
                parent.className = "modal";
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target && e.target.className == 'close') {
                var parent = e.target.parentNode.parentNode;
                parent.className = "";
            }
        });
    });
});