$(document).ready(function(){

	"use strict";
	var d = new Date();
	var tempDay = d.getDateFormatted();
	var tempMonth = d.getMonthFormatted();
	var tempYear = d.getFullYear();
	var calendarStartDate = tempYear+"-"+tempMonth+"-"+tempDay;
	// 2017-03-18

	var options = {
		// events_source: '../events.json',
		// for event source, make a GET to server and return events
		events_source: [
        {
            "id": 293,
            "title": "TEST Event 1",
            "url": "http://example.com",
            "class": "event-important", //event-special, event-information, event-success
            "start": 1488407105126, // Milliseconds
            "end": 1488507105126 // Milliseconds
        },
		 {
            "id": 294,
            "title": "TEST Event 2",
            "url": "http://example.com",
            "class": "event-success", //event-special, event-information, event-success
            "start": 1488517105126, // Milliseconds
            "end": 1488537105126 // Milliseconds
        }],
		view: 'month',
		tmpl_path: 'tmpls/',
		tmpl_cache: false,
		day: calendarStartDate,
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
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

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function(){
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({first_day: value});
		calendar.view();
	});

	$('#language').change(function(){
		calendar.setLanguage($(this).val());
		calendar.view();
	});

	$('#events-in-modal').change(function(){
		var val = $(this).is(':checked') ? $(this).val() : null;
		calendar.setOptions({modal: val});
	});
	$('#format-12-hours').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({format12: val});
		calendar.view();
	});
	$('#show_wbn').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({display_week_numbers: val});
		calendar.view();
	});
	$('#show_wb').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({weekbox: val});
		calendar.view();
	});
	$('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
		//e.preventDefault();
		//e.stopPropagation();
	});

});

