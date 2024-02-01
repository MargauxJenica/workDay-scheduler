// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  //   C1     //
  //=============================================================================//
  //                                   DONE                                      //
  // TODO: Add code to display the current date in the header of the page.       //
  //=============================================================================//
  
  //    C3    //
  //=============================================================================//
  //                                   DONE                                      //
  // TODO: Add code to apply the past, present, or future class to each time     //
  // block by comparing the id to the current hour. HINTS: How can the id        //
  // attribute of each time-block be used to conditionally add or remove the     //
  // past, present, and future classes? How can Day.js be used to get the        //
  // current hour in 24-hour time?                                               //
  //=============================================================================//

  //    C5    //
  //=============================================================================//
  //                                   DONE                                      //
  // TODO: Add code to get any user input that was saved in localStorage and set //
  // the values of the corresponding textarea elements. HINT: How can the id     //
  // attribute of each time-block be used to do this?                            //
  //=============================================================================//
  
  //    C6    //
  //=============================================================================//
  //                                   DONE                                      //
  // TODO: Add a listener for click events on the save button. This code should  //
  // use the id in the containing time-block as a key to save the user input in  //
  // local storage. HINT: What does `this` reference in the click listener       //
  // function? How can DOM traversal be used to get the 'hour-x' id of the       //
  // time-block containing the button that was clicked? How might the id be      //
  // useful when saving the description in local storage?                        //
  //=============================================================================//
  


  //=============================================================================//
  //                                 my code                                     //
  //=============================================================================//

// $(document).ready(function(){} (vanilla JS of the function below)
$(function () { // this function ensures that the code won't run until browser is finished fully rendering the elements in the html 
  
  var blockHour;
  var eventText;
  var currentHour;

  //    C1    //
  $("#currentDay").text(dayjs().format("dddd, MMMM D")); // display current date

  //    C3    //
  function updateColors() { // color blocking function 

    currentHour = dayjs().hour(); // setting this variable to hold the value of the current hour

    console.log('this is the current hour ' + currentHour);

    $('.time-block').each(function () { // grabbing each element with the class time-block to color block accordingly

      blockHour = parseInt($(this).attr('id').split('-')[1]); // extracting the # from the id attribute 'hour-#' and converting it to a numeric format
      
      // testing 
      // if (blockHour < 12) {

      //   console.log('this is the block hour ' + blockHour + ' AM');

      // } else {
      //   if( blockHour === 12) {

      //     console.log('this is the block hour ' + blockHour + ' PM');

      //   } else if (blockHour > 12) {

      //     blockHour = blockHour - 12; 

      //     console.log('this is the block hour ' + blockHour + ' PM');

      //   }

      // };
      
      // I changed all the elements to only have future 
      // to make the code cleaner and easier
      if (blockHour < currentHour) {

        $(this).removeClass('future').addClass('past');

      } else if (blockHour === currentHour) {

        $(this).removeClass('future').addClass('present');

      } else {

        $(this).removeClass('past present').addClass('future');

      }

    });
  };

  //    C6    //
  function loadEvents() { // retrieving data from local storage

    $(".time-block").each(function () { // for each element with the class time-block

      blockHour = parseInt($(this).attr('id').split('-')[1]); 

      eventText = localStorage.getItem("event-" + blockHour); // retrieve the value in local storage assocaited with blockHour

      console.log(eventText);

      // find the element within the time-block class 
      // with the class named `description` 
      // and set its value to the value stored in eventText
      $(this).find(".description").val(eventText); 

    });

  };

  //    C5    //
  // event handler to save user's input
  // grabbing the element with the class of saveBtn 
  $('.saveBtn').on('click', function () {

    console.log ('saveBtn was clicked');

    // `this` for both blockHour and eventText refers to saveBtn
    // getting the immediate parent of the element with the `saveBtn` class
    // and grabbing the value of id at the second part [1] of 'hour-#'
    blockHour = $(this).parent().attr('id').split('-')[1];

    // gets all siblings element with the class 'description'
    // and grabbs the text within those siblings
    eventText = $(this).siblings('.description').val();

    // sets an item in the local storage with 
    // 'event-hour' ('event-9') and the value of the text
    localStorage.setItem('event-' + blockHour, eventText);

  });


  updateColors();
  loadEvents();

});
