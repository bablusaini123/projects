jQuery(document).ready(function($) {
	//alert('test');
    $('#search-input').keyup(function() {
        var searchQuery = $(this).val();     
        if (searchQuery.length > 2) {
            $.ajax({
                url: myAjax.ajaxurl,
                type: 'POST',
                data: {
                    action: 'custom_search_inner',
                    search: searchQuery
                },
                success: function(response) {
                    $('#search-results').html(response);
                }
            });
        } else {
            $('#search-results').html('');
        }
    });
});