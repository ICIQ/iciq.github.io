$(function(){
  $('#Container').mixItUp({
    selectors: {
        target: '.pub'
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
      console.log(inputText);
      
      // Check to see if input field is empty
      if ((inputText.length) > 0) {            
        $( '.pub').each(function() {
          $this = $("this");
          console.log(inputText);
          
          // add item to be filtered out if input text matches title or authors
          if($(this).children('a').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else if($(this).children('authors').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $("#Container").mixItUp('filter', $matching);
      }

      else {
        // resets the filter to show all item if input is empty
        $("#Container").mixItUp('filter', 'all');
      }
    }, 200 );
  });
  //======================
});
