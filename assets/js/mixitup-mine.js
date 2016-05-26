$(function(){
  $('#FilteredSet').mixItUp({
    selectors: {
        target: '.filterable'
    }
  });

  //======================
  // Search box code:
  var inputText;
  var $matching = $();

  // Delay function
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $("#input").keyup(function(){
    // Delay function invoked to make sure user stopped typing
    delay(function(){
      inputText = $("#input").val().toLowerCase();
      
      // Check to see if input field is empty
      if ((inputText.length) > 0) {            
        $( '.filterable').each(function() {
          $this = $("this");
          
          // add item to be filtered out if input text matches title or authors
          if($(this).children('a').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else if($(this).children('authors').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else if($(this).children('tag').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $("#FilteredSet").mixItUp('filter', $matching);
      }

      else {
        // resets the filter to show all item if input is empty
        $("#FilteredSet").mixItUp('filter', 'all');
      }
    }, 200 );
  });
  //======================
  //Stuff below is not working
  //======================
  

  $("tag").click( function(event) {
    event.stopPropagation();
    console.log($(this).text());
  });

  $("div.gist").click( function() {
    console.log("gist clicked!");
  });

  $(".gist.filterable").click( function() {
    console.log("tag clicked!");
  });

});

$(window).bind("load", function() {
  $("#FilteredSet").mixItUp('filter', 'all'); // So that all items appear at the beginning
});
