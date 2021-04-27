

function getData(url, cb) {
    var xhr = new XMLHttpRequest(); //create a new instance object

    xhr.open("GET", url); //request the url from web server 

    xhr.send(); //send request 

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}


function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick ="writeToDocument('${prev}')">Previous</button>
        <button onclick ="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick ="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick ="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function (data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        }

        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function (item) {
            var dataRow = [];

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            //document.getElementById("data").innerHTML += "<p>" + item.name + "</p>";
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}

// setTimeout(function () {
// console.log(data);
// }, 500);    we can't always rely on timeouts as they will be depend on varying factors such as
//network speed and they will all be diffrent times. It is better to use a call back function 
// see line one

//if we try a standard console.log outside the xhrreadystatechange it will be undefined in our console as the xhrfunction is still running
//while the console log funciton is instant there is no data yet. We want to avoid having to put
//all of our code in the onreadystatechange method or everything will be messy. To achieve this 
//we use a seperate setData function()  //see line line.


// we can use a timout function to stall the console.log function until our xhr method is finished processeing


//this is the operation we want to take place.  we are asking to check if this.ready state of 4 
//has been achieve which means the operation is fully complete. When complete we are asking to return 
//a http status 200 code which means content has been delivered.
//Then we use DOM manipulation to change the inner html of our div with the id of "data" to the
//information that comes back from our xhr object.


//important to note the above code is not JSON but a returns a string that we can pass into 
//a JSON data structure method. Use the JSON.parse() method.