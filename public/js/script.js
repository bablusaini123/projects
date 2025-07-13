//Header Sticky
var header = document.querySelector("header");
var navbarHeight = header.offsetHeight;
var lastScrollTop = 0;
window.onscroll = function() {
	scrollHide();
};
function scrollHide() {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	//console.log(st);
	if (st > lastScrollTop) {
		header.classList.add('hide');
		header.classList.remove('show');
	} else {
		header.classList.remove('hide');
		header.classList.add('show');
	}
	if (st <= 0) {
		header.classList.remove('hide');
		header.classList.remove('show');
	}
	lastScrollTop = st <= 0 ? 0 : st;
}

// Search
$("header .search img").click(function() {
	$("header .search").toggleClass('toggle');
	$("body").toggleClass('search-active');
});
$("header .search .fa-times").click(function() {
	$(".search").removeClass('toggle');
	$("body").removeClass('search-active');
});
$(".search-boxactive").click(function() {
	$("body").removeClass('search-active');
	$(".search").removeClass('toggle');
});

// Nav Mobile
$("header .mobile-icon").click(function() {
	$("body").toggleClass('menu-active');
	$("header .mobile-icon").toggleClass('toggle');
	$("header .mobile-toggle").toggleClass('toggle');
});
$(".close-nav").click(function() {
	$("header .mobile-toggle").removeClass('toggle');
	$("body").removeClass('menu-active');
	$(".mobile-icon").removeClass('toggle');
});
$(".nav-active").click(function() {
	$("header .mobile-toggle").removeClass('toggle');
	$("body").removeClass('menu-active');
	$(".mobile-icon").removeClass('toggle');
});

// All BRand 
$('.all-brand .owl-carousel').owlCarousel({
	loop:true,
	margin:30,
	nav:false,
	dots:false,
	touchDrag: true,
	mouseDrag: true,
	autoplay:true,
	responsive:{
		0:{items:2.5, margin:10, mouseDrag: false, freeDrag: false, dots:true},
		575:{items:4.5, margin:20, mouseDrag: false, freeDrag: false, dots:true},
		767:{items:6, margin:20},
		992:{items:7},
		1140:{items:8}
	}
})

// Youtube
$(document).ready(function() {
	if ( $(window).width() < 992 ) {
		startCarousel();
	} else {
		$('.yt .owl-carousel').addClass('off');
	}
});

$(window).resize(function() {
	if ( $(window).width() < 992 ) {
		startCarousel();
	} else {
		stopCarousel();
	}
});

function startCarousel(){
	$('.yt .owl-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots:false,
		touchDrag: true,
		lazyLoad: true,
		mouseDrag: true,
		autoplay:true,
		responsive:{
			0:{items:1.5, margin:10, mouseDrag: false, freeDrag: false, dots:true},
			575:{items:2.5, margin:20, mouseDrag: false, freeDrag: false, dots:true},
			767:{margin:30}
		}
	})
}

function stopCarousel() {
	var owl = $('.yt .owl-carousel');
	owl.trigger('.yt destroy.owl.carousel');
	owl.addClass('off');
}

jQuery(document).ready(function() {
	jQuery('.panel-ajx').on('click', function() {
		jQuery('.panel-ajx').removeClass('active');
		jQuery('this').addClass('active');
		if (!jQuery(this).hasClass('active')) {
			if (!jQuery(this).hasClass('prev_active')) {
				var tax_id = jQuery(this).data('taxid');
				var taxo = jQuery(this).data('taxonomy');
				var data = { action: 'crip_ajax_products', tax_id: tax_id, taxonomy: taxo };
				//jQuery(this).addClass("prev_active");
				if (taxo == "product_brands") {
					jQuery("#brand_tab_" + tax_id).append('<span class="panel-loader"></span>');
				} else {
					jQuery("#cat_tab_" + tax_id).append('<span class="panel-loader"></span>');
				}
				jQuery.post(site_ajax_url, data, function(response) {
					if (response) {
						if (taxo == "product_brands") {
							jQuery("#brand_tab_" + tax_id + " .row").empty().html(response);
						} else {
							jQuery("#cat_tab_" + tax_id + " .row").empty().html(response);
						}
						jQuery(".panel-loader").remove();
					}
				});
			}
		}
	})
});

//About Us
$('.about-brands .owl-carousel').owlCarousel({
	loop: true,
	margin: 50,
	nav: false,
	dots: false,
	touchDrag: true,
	mouseDrag: true,
	autoplay: true,
	navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	responsive: {
		0:{items: 2, mouseDrag: false},
		768:{items: 3, mouseDrag: false},
		992:{items: 5},
	}
})

//Offer Page Carousel
	$('.offer-testimonials .owl-carousel').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		touchDrag: true,
		mouseDrag: true,
		margin:30,
		autoplay: true,
		autoHeight:true,
		center: true,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		responsive: {
			0:{items: 1, mouseDrag: false, margin:0},
			575:{items: 2, mouseDrag: false, margin:20},
			992:{items: 4},
		}
	})


// Pagination
$(".next.page-numbers").text('→');
$(".prev.page-numbers").text('←');

//Faq
$('.accordion').find('.accordion-toggle').click(function() {
	$(this).next().slideToggle('fast');
	$(".accordion-content").not(jQuery(this).next()).slideUp('fast');
	$(".accordion-content").not(jQuery(this).next()).prev().removeClass("close");
	$(this).toggleClass("close");
});

$(document).ready(function() {
	$('.top-header .fa-times').click(function() {
		$('.top-header .leftdiv').css("display","none");
	});
	$(".faqpage .menu li").click(function () {
		$(".faqpage .menu li").removeClass("active");
		$(this).addClass("active");   
	});
});

// Faq scroll active
$(window).on('scroll', function() {
	$('.faq-scroll').each(function() {
		if($(window).scrollTop() >= $(this).offset().top - 50) {
			var id = $(this).attr('id');
			$('.faqpage .menu li').removeClass('active');
			$('.faqpage .menu a[href="#'+ id +'"]').parent('li').addClass('active');
		}
	});
});

$("input[name='attribute_power-supply']").click(function(){
	$("input[name='attribute_power-supply']").each(function(){
		$(this).parent().removeClass("myactive");

		if($(this).is(":checked")){
			$(this).parent().addClass('myactive');
		}
	});
});
$("input[name='attribute_power-supply']").each(function(){
	$(this).parent().removeClass("myactive");
	if($(this).is(":checked")){
		$(this).parent().addClass('myactive');
	}
});

// Two

$("input[name='attribute_delivery-batch']").click(function(){
	$("input[name='attribute_delivery-batch']").each(function(){
		$(this).parent().removeClass("myactive");

		if($(this).is(":checked")){
			$(this).parent().addClass('myactive');
		}
	});
});
$("input[name='attribute_delivery-batch']").each(function(){
	$(this).parent().removeClass("myactive");
	if($(this).is(":checked")){
		$(this).parent().addClass('myactive');
	}
});

// One
$("input[name='attribute_delivery']").click(function(){
	$("input[name='attribute_delivery']").each(function(){
		$(this).parent().removeClass("myactive");

		if($(this).is(":checked")){
			$(this).parent().addClass('myactive');
		}
	});
});
$("input[name='attribute_delivery']").each(function(){
	$(this).parent().removeClass("myactive");
	if($(this).is(":checked")){
		$(this).parent().addClass('myactive');
	}
});


$(document).on('change', '.variation-radios input', function() {
	$('.variation-radios input:checked').each(function(index, element) {
		var $el = $(element);
		var thisName = $el.attr('name');
		var thisVal  = $el.attr('value');
		$('select[name="'+thisName+'"]').val(thisVal).trigger('change');
	});
});
$(document).on('woocommerce_update_variation_values', function() {
	$('.variation-radios input').each(function(index, element) {
		var $el = $(element);
		var thisName = $el.attr('name');
		var thisVal  = $el.attr('value');
		$el.removeAttr('disabled');
		if($('select[name="'+thisName+'"] option[value="'+thisVal+'"]').is('')) {
			$el.prop('disabled', true);
		}
	});
});

//Shop Setting
$(".toggle-woo .icon").click(function() {
	$(".sidebar-css").toggleClass('toggle');
	$("body").toggleClass('sidebar-active');
});
$(".sidebar-css .close-nav").click(function() {
	$(".sidebar-css").removeClass('toggle');
	$("body").removeClass('sidebar-active');
});
$(".sidebar-toggle").click(function() {
	$(".sidebar-css").removeClass('toggle');
	$("body").removeClass('sidebar-active');
});

// text Orderby
$( '.orderby' ).select2({ minimumResultsForSearch: 10 });

// Couponcode
(function($) {
	$(document).ready(function() { 
		var coupon2 = $(".checkout_coupon.woocommerce-form-coupon");
		coupon2.insertAfter('.shop_table.woocommerce-checkout-review-order-table');
	})
})
(jQuery);

// Checkout Label
jQuery('.woocommerce-billing-fields .form-row :input, .woocommerce-shipping-fields .form-row :input').each(function() {
	var $input = jQuery(this);
	var $row   = $input.closest('.woocommerce-billing-fields .form-row, .woocommerce-shipping-fields .form-row');
	if ($input.val()) {
		$row.addClass('-filled');
	}
	$input.on('focus', function() {
		$row.addClass('-focus');
	});
	$input.on('blur', function() {
		$row.removeClass('-focus');
	});
	$input.on('input', function() {
		if ($input.val()) {
			$row.addClass('-filled');
		} else {
			$row.removeClass('-filled');
		}
	});
})

$('.daterange-form #from, .daterange-form #to').attr('type', 'date');

// SIngle Product
$('.featured-pro .owl-carousel').owlCarousel({
	loop: true,
	margin: 30,
	nav: false,
	dots: false,
	touchDrag: true,
	mouseDrag: true,
	autoplay: true,
	navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	responsive: {
		0:{items: 2, mouseDrag: false, margin:10},
		768:{items: 3, mouseDrag: false, margin:20},
		992:{items: 4},
	}
})

//Reviews
$('#reviews .owl-carousel').owlCarousel({
	loop: false,
	margin: 30,
	nav: false,
	dots: false,
	touchDrag: true,
	mouseDrag: true,
	autoplay: true,
	navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	responsive: {
		0:{items: 2, mouseDrag: false, margin:10},
		768:{items: 2, mouseDrag: false, margin:20},
		992:{items: 3}
	}
})

//Cart Related
$('.cart-related .owl-carousel').owlCarousel({
	loop: true,
	nav: true,
	dots: false,
	touchDrag: true,
	mouseDrag: true,
	autoplay: true,
	margin:30,
	navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	responsive: {
		0:{items: 1, mouseDrag: false, margin:20},
		992:{items: 3}
	}
})

//Coupon Copied
	function copyCouponText(element) {
    const spanElement = element.querySelector('span'); // Select the <span> inside the clicked element
    if (spanElement) {
        const textToCopy = spanElement.textContent || spanElement.innerText; // Get the text from the <span>
        navigator.clipboard.writeText(textToCopy).then(() => {
            const popup = element.parentElement.querySelector('.copied-popup');
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 800);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
}

//Single Product Tabs
$(document).on("click", ".single-pro-data.bottom .single-left-menu a", function(){
	var divid = $(this).data("val");
	$(".single-pro-data.bottom .single-left-menu").find("li").removeClass("active");
	$(this).parent("li").addClass("active");
	$(".bottom").find(".single-right").find("div").addClass("d-none");
	$(".single-right").find("#"+divid).removeClass("d-none");
});

$(document).on("click", ".single-pro-data.top .single-left-menu a", function(){
	var divid = $(this).data("val");
	$(".single-pro-data.top .single-left-menu").find("li").removeClass("active");
	$(this).parent("li").addClass("active");
	$(".top").find(".single-right").find(".border").addClass("d-none");
	$(".single-right").find("#"+divid).removeClass("d-none");
});

$(function() {
	$('.single-pro-data.bottom .border:first-child').addClass('active');
	$('.single-pro-data.bottom .border').click(function(){
		$(this).addClass(' active ');
		$(this).siblings().removeClass(' active '); 
		return false;
	});
});

$(function() {
	$('.single-pro-data.top .border:first-child').addClass('active');
	$('.single-pro-data.top .border').click(function(){
		$(".single-pro-data.top .border").removeClass(' active '); 
		$(this).addClass('active');
	});
});

// YT Script
$(".yt .border, .modal-backdrop.show").click(function(){
	var target = $(this).attr("data-target");
	var source = $(target).find("iframe").attr("src");
	source += "&autoplay=1";
	$(target).find("iframe").attr("src", source);
	console.log(source);
});

$(".close-btn").click(function(){
	$(".popupcss").each(function(){
		if($(".popupcss").hasClass("show")){
			var target = $(".modal.show").attr("id");
			var source = $('#'+target).find("iframe").attr("src");
			source = source.replace("&autoplay=1", "");
			console.log(source);
			$('#'+target).find("iframe").attr("src", source);
		}		
	});
});
$(".modal").click(function(){
	$(".popupcss").each(function(){
		if($(".popupcss").hasClass("show")){
			var target = $(".modal.show").attr("id");
			var source = $('#'+target).find("iframe").attr("src");
			source = source.replace("&autoplay=1", "");
			console.log(source);
			$('#'+target).find("iframe").attr("src", source);
		}		
	});
});

//2nd Notification Hide
$(document).on('click', '.top-header-notice .fa-times-circle', function() {
    $('.top-header-notice').hide();
});

//Category Description
$(function() {
	var paraDiv = $('.myproductdescription');
	var firstParagraph = $('.myproductdescription p:first');
	var remainingParagraphs = $('.myproductdescription p:not(:first)');
	remainingParagraphs.hide();
	if (remainingParagraphs.length > 0) {
		paraDiv.append('<a class="read-more" title="Read More" style="display: block; cursor: pointer;">Read More</a>');
		$('.myproductdescription').on('click', '.read-more', function() {
			remainingParagraphs.toggle();
			var readMoreLink = $(this);
			if (remainingParagraphs.is(':visible')) {
				readMoreLink.text('Read Less');
			} else {
				readMoreLink.text('Read More');
			}
		});
	}
});


document.addEventListener( 'wpcf7mailsent', function( event ) {
	document.querySelectorAll(".outofstock-form form.wpcf7-form > :not(.wpcf7-response-output)").forEach(el => {
		el.style.display = 'none';
	});
}, false );

document.querySelectorAll('.wpcf7 input[name="page-url"]').forEach(function(element) {
	element.value = window.location.href;
});
