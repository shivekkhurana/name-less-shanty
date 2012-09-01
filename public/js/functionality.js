$(function(){

  //$('body').text("Hello world"); 
  $.fn.is_int = function(a){
    return isNaN(a) == false;
  }

  $.fn.is_time = function(t){
    //check whether #t is valid 24-hour time or not
    var regex = /(^((2[0-4])|([01]?[0-9])):[0-5][0-9]$)|(^((1[0-2])|(0?[1-9])(:[0-5][0-9])?)[pa]m$)/;
    return regex.test(t);
  }

  //prevent form submits
  $('form').submit(function(event){event.preventDefault();});
  //#user_bounds form validation
  $('form#user_bounds').submit(function(){
    var no_of_days = $('input#no_of_days');
    var start_time = $('input#start_time');
    var end_time = $('input#end_time');
    var errors =[];
    var i = 0
    $('div.user_bound_errors').text('');//clear dive
    if ( !$.fn.is_int(no_of_days.val()) ){
      errors[i++]= "Number of days should be an integer > 0";
    }
    if( !$.fn.is_time(start_time.val()) )
    {
      errors[i++]= "Start Time should be like: 2:30am, 5pm"
    }
    if( !$.fn.is_time(end_time.val())){
      errors[i++]= "End Time should be in 24  hour format ex: 2:30"
    }
    if(!$.isEmptyObject(errors)){
        $.each(errors, function(k,v){
        $('div.user_bound_errors').append(v+'<br/>');
      });
    }
    else{
      alert("commit");
    }
  });
  
  //Set the following forms working 
  //var forms = ['user_bounds', 'wish_list']
	$('form#user_bounds').handleStorage({appID : 'user_bounds', storage:'cookies'});
  $('form#wish_list').handleStorage({appID : 'wish_list', storage:'cookies'});
  $('form#wish_list').submit(function(){return false;});
});
