$.fn.isVisible = function () {

	let elementTop = $(this).offset().top;
	let elementBottom = elementTop + $(this).outerHeight();

	let viewportTop = $(window).scrollTop();
	let viewportBottom = viewportTop + $(window).height() * 0.75;

	let flag = elementBottom > viewportTop && elementTop < viewportBottom;

	let item = $(this)

	if(flag) {

		if(item.hasClass('pfl-bg')) {
			let src = item.attr('href');
			$('<img>').attr('src', src).load(function(){
				item.css('background-image', 'url(' + src + ')');
				item.removeClass('pfl-lazy');
				item.removeClass('pfl-bg');
			});
		}
		if(item.hasClass('pfl-lazy')){
			let 
			src = item.attr('data-src');
			item.removeAttr('data-src');

			item.attr('src', src);
			item.on('load', function(){
				item.removeClass('pfl-lazy');
			})
		}
		if(item.hasClass('pfl')){

		}
	}
};
winScroll = function(){

	$('.pfl-lazy').each(function(){
		$(this).isVisible();
	});
	

}
showModal = function($href, $class=""){
	$.fancybox.open({
		src  : $href,
		type : 'inline',
		opts : {
			closeExisting: true,
			baseClass: $class,
			animationEffect: false,
			animationDuration: 600,
			transitionEffect: false,
			transitionDuration: 600,
			touch: false,
			btnTpl: {
				close: '<button class="modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#close-circle" /></svg></button>',
				smallBtn: '<button class="modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#close-circle" /></svg></button>',
			},
			afterShow : function( instance, current ) {
				$(current.src).addClass('active');
			},
			beforeClose : function( instance, current ) {
				this.opts.animationEffect = true;
				this.opts.transitionEffect = true;
				$(current.src).removeClass('active');
				// console.log(current.src)
			},
			afterClose : function( instance, current ) {
					// $('#modal_menu').removeClass('active mmenu__vis');
				}
			}
		});
}

// Товар в корзине
// showModal('#modal-addcart', 'fancy-from-bottom');

// сообщение об успешном заказе
// showModal('#modal-success', 'fancy-from-bottom');

$(document).on('click', '.price__add .btn, .pr__add', function(e){
	e.preventDefault();
	showModal('#modal-addcart', 'fancy-from-bottom');
})



scrollTo = function(target = '') {
	if(target && $(target).length) {
		var 
		$minus = $('.fline__inner').length ? $('.fline__inner').outerHeight() : 0;
		console.log($(target).offset().top, $minus);
		$('html, body').animate({scrollTop: $(target).offset().top - $minus}, 800);
	}
}



$(function(){

	if($('.marquee').length) {
		$('.marquee').each(function(key, item){
			var 
			$clone = $(item).html();
			$(item).html($clone + $clone + $clone);

			/*if($(item).attr('data-copy') !== undefined) {
				$clone = $(item).html();
				$(item).after('<div class="marquee marquee-copy">' + $clone + '</div>')
			}*/
		})
	}

	$(window).on('load scroll resize', winScroll);

	$('input[name="phone"]').inputmask({
		mask: "+7 9{1,30}",
		showMaskOnHover: false
	});

	$("input[data-inputmask]").inputmask();


	$(document).on('click','.modalshow', function(e){
		e.preventDefault();
		var 
		$href = $(this).attr('href'),
		$class = $(this).attr('data-class');

		showModal($href, 'fancy-from-right ' + $class);
	})

	$(document).on('click', '.mmenu__btn', function(e){
		e.preventDefault();
		showModal($('#modal-menu-mobile'), 'fancy-mmenu');
	})

	$(document).on('click', '.mmenu__more', function(e){
		e.preventDefault();
		var
		$self = $(this),
		$item = $self.closest('.mmenu__item');

		if($item.hasClass('active')) {
			$item.removeClass('active').siblings('.mmenu__children').stop(true, true).slideUp();
		}else{
			$item.addClass('active').siblings('.mmenu__children').stop(true, true).slideDown();
		}
	})


	$(document).on('click', '.mtabs__attr_more .btn', function(e){
		e.preventDefault();
		var
		$btn = $(this),
		$mtabs = $btn.closest('.mtabs__attr'),
		$hidden = $mtabs.find('.mtabs__attr_hidden'),
		$text = $btn.find('.btn-text'),
		$text_active = $btn.attr('data-active'),
		$text_default = $btn.attr('data-default');

		if($btn.hasClass('active')) {
			$btn.removeClass('active');
			$text.text($text_default).attr('data-text', $text_default);
			$hidden.stop(true, true).slideUp();
		}else{
			$btn.addClass('active');
			$text.text($text_active).attr('data-text', $text_active);
			$hidden.stop(true, true).slideDown();
		}

	})

	$(document).on('click', '.mtabs__head', function(e){
		e.preventDefault();
		var
		$self = $(this),
		$item = $self.closest('.mtabs__item'),
		$content = $item.find('.mtabs__content');

		if($item.hasClass('active')) {
			$item.removeClass('active').find('.mtabs__content').stop(true, true).slideUp();
		}else{
			$item.addClass('active').find('.mtabs__content').stop(true, true).slideDown();
		}
	})

	$(document).on('click', '.price__add .btn', function(e){
		e.preventDefault();
		$(this).closest('.price__cart').addClass('active');
	})

	// GO TO 
	var myHash = location.hash; 
	location.hash = ''; 
	if(myHash[1] != undefined){ 
		scrollTo(myHash[1]);
	};
	$(document).on('click', '.goTo', function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		scrollTo(target);
		return false;
	});

	$('.form__label').on('click', function(){
		$(this).siblings('input, textarea').focus();
	})
	$('.form__input, .form__textarea').on('change', function(){
		if($(this).val().length > 0) {
			$(this).addClass('valid');
		}else{
			$(this).removeClass('valid');
		}
	});

	$(document).on('click', '.copy__coord', function(e) {
		e.preventDefault();
		var 
		$self = $(this),
		$inp = $("<input>");

		$("body").append($inp);
		$inp.val($self.attr('data-copy')).select();
		document.execCommand("copy");
		$inp.remove();

		$self.find('.btn-text').text($self.attr('data-copied')).attr('data-text', $self.attr('data-copied'));
		setTimeout(function(){
			$self.find('.btn-text').text($self.attr('data-default')).attr('data-text', $self.attr('data-default'));
		}, 3000);

		// $(this).text('Тест скопирован!');
	});

	$(document).on('click','.qty-change .qty__btn-plus', function(e){
		e.preventDefault();
		var
		$input = $(this).closest('.qty').find('input'),
		$new_val = parseInt($input.val()) + 1;
		$input.val($new_val);
		$input.trigger('change');

	})
	$(document).on('click','.qty-change .qty__btn-minus', function(e){
		e.preventDefault();
		var
		$input = $(this).closest('.qty').find('input'),
		$new_val = parseInt($input.val()) - 1;
		$input.val($new_val);
		$input.trigger('change');

	})

	$(document).on('change', '.qty-change .qty__input', function(){

		var
		$input = $(this),
		$val = $(this).val(),
		$min = $input.attr('data-min'),
		$new_val = $min;
		if(isNaN($val) || $val < $min){
			$input.val($new_val);
		}

	});

	if($('.card__slider').length) {
		$('.card__slider').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>',
			responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: "unslick"
			},
			]
		})
	}

	if($('.scheme__slider').length) {
		$('.scheme__slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev btn nav__item nav__item-prev"><svg class="ico"><use xlink:href="./img/sprite.svg#arrow-left" /></svg><span class="btn-fill"></span></button>',
			nextArrow: '<button type="button" class="slick-next btn nav__item nav__item-next"><svg class="ico"><use xlink:href="./img/sprite.svg#arrow-right" /></svg><span class="btn-fill"></span></button>'
		})
	}

});

