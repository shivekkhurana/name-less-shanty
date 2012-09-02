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
      window.location = '/select';
    }
  });

  //check whether wish_list contains atleast one item and drop ['list','of','ids'] cookie
  $('form#wish_list').submit(function(){
    if(!$('input').is(':checked')){
      $('div.wish_list_errors').text('').append("Please select atleast one site.");
    }
    else{
      var wish_list_ids = [];
      var wish_list = {};
      $('input:checked').each(function(){
          wish_list_ids.push( $(this).attr('id') );
      });
      $.each(wish_list_ids, function(index, id){
        wish_list[id] = "a";
      });
      wish_list = JSON.stringify(wish_list);
      $.cookie('wish_list', wish_list, {expires:7});
      window.location = "/show";
    }
  });

  //*//autocheck previously selected places
  $.fn.populate_wish_list = function(){
  	var wish_list_cookie = $.cookie('wish_list');
    if(wish_list_cookie !== null){
      wish_hash = $.parseJSON(wish_list_cookie);
      $.each(wish_hash, function(k,v){
        $('input#'+k).prop("checked", true);
      });
    }
  }
  $.fn.populate_wish_list();
  //*/

  //Set the following forms working 
  //var forms = ['user_bounds', 'wish_list']
	$('form#user_bounds').handleStorage({appID : 'user_bounds', storage:'cookies'});
});
