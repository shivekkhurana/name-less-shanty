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
        $('div.user_bound_errors').addClass('alert')
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
      $('div.wish_list_errors').addClass('alert').text('').append("Please select atleast one site.");
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
	
	//Change label color on wish_list
  $.fn.change_wish_label_color = function(){
    $.each($('input:checked'),function(index, e){
      $(e).prev('label').toggleClass('secondary').toggleClass('success');
    });
  }
    //Call label change for initially saved wish_list cookie
  $.fn.change_wish_label_color();
    //call label change when a label is clicked
  $('form#wish_list label').click(function(){
    $( this ).toggleClass('secondary').toggleClass('success');
  });

	/*///////////////#/\/\aps#///////*/
	$.fn.set_markers = function (map, locations) {
		// Add markers to the map

		// Marker sizes are expressed as a Size of X,Y
		// where the origin of the image (0,0) is located
		// in the top left of the image.

		// Origins, anchor positions and coordinates of the marker
		// increase in the X direction to the right and in
		// the Y direction down.
		var image = new google.maps.MarkerImage('./images/circle_orange.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		new google.maps.Size(48, 48),
		// The origin for this image is 0,0.
		new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at 0,32.
		new google.maps.Point(0, 32));
		/*var shadow = new google.maps.MarkerImage('images/beachflag_shadow.png',
		// The shadow image is larger in the horizontal dimension
		// while the position and offset are the same as for the main image.
		new google.maps.Size(37, 32),
		new google.maps.Point(0, 0),
		new google.maps.Point(0, 32));*/
		// Shapes define the clickable region of the icon.
		// The type defines an HTML &lt;area&gt; element 'poly' which
		// traces out a polygon as a series of X,Y points. The final
		// coordinate closes the poly by connecting to the first
		// coordinate.
		var shape = {
			coord: [1, 1, 1, 20, 18, 20, 18, 1],
			type: 'poly'
		};
		for (var i = 0; i < locations.length; i++) {
			var site = locations[i];
			var myLatLng = new google.maps.LatLng(site[1], site[2]);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				zIndex: site[2],
				title: site[0]
			});
			// Attaching a click event to the current marker
			(function(marker) {
				google.maps.event.addListener(marker, "click", function(e) {
					$('#'+marker.title).reveal();
				});
			})(marker);
		}
	}
	
	/*//
	//draw arrows
	function drawArrow(pt1, pt2, color)
	{
		var lineWidth = 10;
		var lineOpacity = 0.7;
		var arrowSize = 50;

		function addHead(point, theta, zoom, color)
		{
			var p = prj.fromLatLngToPixel(point,  zoom)
			var x = p.x, y = p.y;
			var t = theta + (Math.PI/4) ;
			if(t &gt; Math.PI)
				t -= 2*Math.PI;
			var t2 = theta - (Math.PI/4) ;
			if(t2 &lt;= (-Math.PI))
				t2 += 2*Math.PI;
			var pts = new Array();
			var headLength = arrowSize;
			var x1 = x-Math.cos(t)*headLength;
			var y1 = y+Math.sin(t)*headLength;
			var x2 = x-Math.cos(t2)*headLength;
			var y2 = y+Math.sin(t2)*headLength;
			pts.push(prj.fromPixelToLatLng(new GPoint(x1,y1), zoom));
			pts.push(prj.fromPixelToLatLng(new GPoint(x,y), zoom));
			pts.push(prj.fromPixelToLatLng(new GPoint(x2,y2), zoom));
			var head = new GPolygon(pts, color, 0, 1, color, 1);
			map.addOverlay(head);
		}

		var polyline = new GPolyline([pt1, pt2], color, lineWidth, lineOpacity);
		var zoom = map.getZoom();
		var p1 = prj.fromLatLngToPixel(pt1,  zoom);
		var p2 = prj.fromLatLngToPixel(pt2,  zoom);
		var dx = p2.x-p1.x;
		var dy = p2.y-p1.y;
		var theta = Math.atan2(-dy,dx);

		addHead(pt2, theta, zoom, color);
		map.addOverlay(polyline);
	}
	//*/	
	
	//init map
	$.fn.initialize_map = function(sites) {
		var map;
		//if show page, plot markers
		sites = sites || [[]];
		if(window.location.pathname == '/show'){
			
		}
		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(28.633199,
			77.214746),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
    map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    $.fn.set_markers(map, sites);
	}
	
	//init deafult map on locations other than @show
	if(window.location.pathname !== '/show'){
		$.fn.initialize_map([[]]);
	} 
	
});

