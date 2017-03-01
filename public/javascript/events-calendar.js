$(document).ready(function(){

    var calendar = $("#calendar").calendar(
			{
				tmpl_path: "/tmpls/",
				events_source: '../events.json',
                modal: "#events-modal"
			}, options);	

        
//     for google calendar list usage
    // formatGoogleCalendar.init({});

});

