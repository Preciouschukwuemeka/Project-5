/*** 
    Treehouse FSJS Techdegree 

    Project 5 - Public API Requests
***/

//  NAME: Precious Chukwuemeka




//Defining Users Variable//


let users = {
    cell: "cellphone",

    dob: {
        date: "Birthday",
        age: 45
    },

    email: "Email",

    location: {
        street: "Street",
        city: "City",
        state: "State",
        postcode: 12345
    },

    name: {
        title: "Mr/Mrs",
        first: "John",
        last: "Doe"
    },

    picture: {
        medium: "https://placehold.it/90x90"
    }
};




// Declaring other Global Variables.

let modal = "";
let cardNr = 0;
let cardsVis = []; // Array of index of Visible cards.
let indexOfClicked = 0; // Index of card clicked on




//  Retrieving data for 12 random “Employees”, Using the Random User Generator API "(https://randomuser.me/)",
//  Also including functions to return various function calls on success.


$.ajax({
    url: "https://randomuser.me/api/?results=12&nat=us",
    dataType: "json",
    success: function (data) {

        createList(data.results); // Calling Create list function.
        setModalData(users).insertAfter("#gallery").hide(); // Calling and hiding setModalData function initially.
        modalButton(); //Calling close modal button function.
        toggle(); // Add toggle button
        UserArray(data.results); // Save array to variable
        addSearch(); // Add search box
    }
});



function UserArray(data) { // Save data to separate array.
    users = data;
}




/** "Create list" Function that Writes user data to website  **/

function createList(users) {
    let listItem = "";

    $.each(users, function (index, item) {

        listItem +=
            `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
    </div>`;

        cardsVis.push(index); // array of visible card index before search
    });

    $("#gallery").html(listItem); // Insert into #gallery
}





/*** Creating modal Window ***/


function setModalData(item) {

    modal =
        `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${item.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${item.name.title} ${item.name.first} ${item.name.last}</h3>
            <p class="modal-text">${item.email}</p>
            <p class="modal-text cap">${item.location.city}</p>
            <hr>
            <p class="modal-text">${item.cell}</p>
            <p class="modal-text">${item.location.street}, ${item.location.city}, ${item.location.state} ${item.location.indexOfClickedtcode}</p>
            <p class="modal-text">Birthday: ${item.dob.date}</p>
        </div>
    
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    return $(modal);
}





//    Creating Function that updates UserData in Modal  //  


function updateData(nr) {
    let item = users[nr];

    $(".modal-img").attr("src", `${item.picture.medium}`);
    $(".modal-name").html(`${item.name.title} ${item.name.first} ${item.name.last}`);
    $(".modal-text").eq(0).html(`${item.email}`);
    $(".modal-text").eq(1).html(`${item.location.city}`);
    $(".modal-text").eq(2).html(`${item.cell}`);
    $(".modal-text").eq(3).html(`${item.location.street}, 
    ${item.location.city}, ${item.location.state} ${item.location.postcode}`);
    $(".modal-text").eq(4).html(`Birthday: ${item.dob.date.split("T")[0]}`); // Split TS to only get Date
}






//   Opening modal with right information //


$("#gallery").on("click", ".card", function () {

    cardNr = $(this).index(); // Get current card index
    indexOfClicked = cardsVis.indexOf(cardNr); // Get index within visible Cards

    // Get data
    updateData(cardNr);

    if (cardsVis.length === 1) {
        $(".modal-btn-container").hide(); // Hide prev/next if only one search result
    } else {
        $(".modal-btn-container").show();
    }

    $(".modal-container").show(); // Show modal

});



// Creating Function for Modal Close Button.

function modalButton() {
    $("#modal-close-btn").on("click", () => {
        $(".modal-container").hide();
    });
}







/**  EXTRA CREDIT **/



// Creating Search Bar //

function addSearch() {
    $(".search-container").html(`
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`);



//  Search functionality // 
    
    $(document).on("submit", "form", e => {
        e.preventDefault();

        let searchValue = $("#search-input").val().toLowerCase();
        cardsVis = [];

        $(".card").hide(); // hide all cards again before showing them

        // Search in firstname and lastname for search string
        if (searchValue === "") {
            $(".card").show();
        } else {
            $(".card").hide();

            $.each(users, function (index, value) {
                if (value.name.first.toLowerCase().indexOf(searchValue) != -1 || value.name.last.toLowerCase().indexOf(searchValue) != -1) {
                    $(".card").eq(index).show();
                }
            });
        }

    });

}




//  Toggle through modal //    

function toggle() {
    $(".modal-btn-container").on("click", ".btn", function () {
        // If button next then
        if ($(this).attr("id") === "modal-next") {
            if (indexOfClicked < cardsVis.length - 1) {
                // increase index within visible Cards and get index within users array
                indexOfClicked += 1;
                cardNr = cardsVis[indexOfClicked];
            } else {
                // jump to first visible if at endposition
                indexOfClicked = 0;
                cardNr = cardsVis[indexOfClicked];
            }
        } else if ($(this).attr("id") === "modal-prev") {
            // If button prev then
            if (indexOfClicked > 0) {
                indexOfClicked -= 1;
                cardNr = cardsVis[indexOfClicked];
            } else {
                // jump to last visible if at startposition
                indexOfClicked = cardsVis.length - 1;
                cardNr = cardsVis[indexOfClicked];
            }
        }
        updateData(cardNr);
    });
}
