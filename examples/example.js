$(function() {
	$('.example-footer').on('click', function(e) {
		$(this).prev().find('.example-code').slideToggle(200);
	});
});