$(document).ready(function () {

	"use strict";
	var d = new Date();
	var tempDay = d.getDateFormatted();
	var tempMonth = d.getMonthFormatted();
	var tempYear = d.getFullYear();
	var calendarStartDate = tempYear + "-" + tempMonth + "-" + tempDay;
	// 2017-03-18

	$(document).on("click", ".event-item", function (e) {
		// console.log($(this).data("eventid"));
		// var name = 'show';
      	
      	
		var listid = $(this).data("eventid");

		// console.log(e);
		$.ajax({
			url: "/api/events/" + listid,
			type: "GET",
			dataType: "json",
			// data: newEventObject,
			success: function (data, textStatus, jqXHR) {
				//data - response from server	
				// display_template('events/events-modal', data);	
				var dayStart = moment(data.event_start_time);		
				var dayEnd = moment(data.event_end_time);
				
				$("#modalHeader").text(data.title);
				$("#eStart").text(dayStart._d);
				$("#eEnd").text(dayEnd._d);
				$("#events-modal").modal('toggle');



			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	});


	var options = {
		events_source: '/api/getEvents',
		// for event source, make a GET to server and return events
		// events_source: [{
		// 		"id": 293,
		// 		"title": "TEST Event 1",
		// 		"url": "http://example.com",
		// 		"class": "event-important", //event-special, event-information, event-success
		// 		"start": 1488407105126, // Milliseconds
		// 		"end": 1488507105126 // Milliseconds
		// 	},
		// 	{
		// 		"id": 294,
		// 		"title": "TEST Event 2",
		// 		"url": "http://example.com",
		// 		"class": "event-success", //event-special, event-information, event-success
		// 		"start": 1488517105126, // Milliseconds
		// 		"end": 1488537105126 // Milliseconds
		// 	}
		// ],
		view: 'month',
		tmpl_path: '../tmpls/',
		tmpl_cache: false,
		day: calendarStartDate,
		onAfterEventsLoad: function (events) {
			if (!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function (key, val) {
				var newList = $("<li>");

				newList.attr('data-eventid', val.id);
				newList.addClass("list-group-item event-item");

				newList.text(val.title)
					// newList.html('<a data-event-id="' + val.id +'" ' + 'href="' + val.url + '">' + val.title + '</a>')

					.appendTo(list);


			});
		},
		onAfterViewLoad: function (view) {
			$('#monthTitle').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		}
	};

	var calendar = $('#calendar').calendar(options);

	calendar.setOptions({
		modal: "#events-modal"
	});
	// always open as modal
	calendar.setOptions({
		modal: "#events-modal"
	});

	$('.btn-group button[data-calendar-nav]').each(function () {
		var $this = $(this);
		$this.click(function () {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function () {
		var $this = $(this);
		$this.click(function () {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function () {
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({
			first_day: value
		});
		calendar.view();
	});

	$('#language').change(function () {
		calendar.setLanguage($(this).val());
		calendar.view();
	});

	$('#events-in-modal').change(function () {
		var val = $(this).is(':checked') ? $(this).val() : null;
		calendar.setOptions({
			modal: val
		});
		// calendar.setOptions({modal: "#events-modal"});

	});
	$('#format-12-hours').change(function () {
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({
			format12: val
		});
		calendar.view();
	});
	$('#show_wbn').change(function () {
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({
			display_week_numbers: val
		});
		calendar.view();
	});
	$('#show_wb').change(function () {
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({
			weekbox: val
		});
		calendar.view();
	});
	$('#events-modal .modal-header, #events-modal .modal-footer').click(function (e) {
		//e.preventDefault();
		//e.stopPropagation();

	});

});

var templates = {};
 
function display_template(tmpl, data) {
    console.log('display');
 
    if (templates[tmpl] === undefined) {
      console.log("need");
      jQuery.get("/try/examples/js/handlebars_template_" + tmpl + ".htm", function(resp) {
          console.log(resp);
          templates[tmpl] = Handlebars.compile(resp);
          display_template(tmpl, data);
      });
      return;
    }
 
    var template = templates[tmpl];
    var html    = template(data);
   $("#msg").html(html);
}