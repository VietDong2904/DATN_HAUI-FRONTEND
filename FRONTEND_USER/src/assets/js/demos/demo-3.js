// Demo 3 Js file
$(document).ready(function () {
    'use strict';

    // Deal of the day countdown
	if ( $.fn.countdown ) {
		var date = new Date();
		var hour = date.getHours();
		var second = date.getSeconds();
		var minute = date.getMinutes();
		var leftHour = "+"+(23 - hour)+"h";
		var leftMinute = "+"+(59 - minute)+"m";
		var leftSecond = "+"+(59 - second)+"s";
		$('.deal-countdown').each(function () {
			var $this = $(this), 
				untilDate = leftHour + " " + leftMinute + " " + leftSecond,
				compact = $this.data('compact');
			$this.countdown({
			    until: untilDate, // this is relative date +10h +5m vs..
			    format: 'HMS',
			    padZeroes: true,
			    labels: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
			    labels1: ['year', 'month', 'week', 'day', 'hour', 'minutes', 'second']
			});
		});

		// Pause
		// $('.deal-countdown').countdown('pause');
	}
});