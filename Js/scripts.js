/*** 
   Treehouse FSJS Techdegree 

   Project 5 - Public API Requests
***/

//  NAME: Precious Chukwuemeka


// Grabbing information for 12 random “Employees”, Using the Random User Generator API "(https://randomuser.me/)".

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  }
});