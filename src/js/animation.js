
function LineWrapper(node) {
	const paragraphContent = node.innerHTML.replace(/^\s+|\s+$/gm, '');
	const paragrapthWrappedWords = paragraphContent.replace(/(\S+)/g, '<span class="item"> $1 </span>');
	node.innerHTML = paragrapthWrappedWords;
	const wrappedWords = node.querySelectorAll('.item');
	const arrayOfWordNodes = Object.keys(wrappedWords).map(k => wrappedWords[k]);
	let currLineTop = 0;
	let finalHTML = ' ';

	arrayOfWordNodes.forEach(( node, index ) => {
		let nodeTop = node.offsetTop;
		let br = node.querySelectorAll('br');
		if(br.length) {
			if(arrayOfWordNodes[index + 1]) {
				nodeTop = arrayOfWordNodes[index + 1].offsetTop;
			}else{
				nodeTop = -1;
			}
		}
		finalHTML += ' '
		+ ( index !== 0 && (currLineTop !== nodeTop) ? '</span></span></span> ' : ' ' )
		+ ( index === 0 || (currLineTop !== nodeTop) ? '<span class="line"><span class="words"><span class="word"> ' : ' ' )
		+ node.innerHTML;
		currLineTop = nodeTop;
	});
	node.innerHTML = finalHTML.trim();
}
$(function(){

	let 
	windowWidth = $(window).width(),
	param = [];

	param.words = {
		yPercent: 100,
		ease: Power2.easeOut,
		delay: 0,
		duration: .0,
		stagger : 0.2
	};
	param.lines = {
		webkitClipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		stagger : 0.2
	};

	Splitting();


	$(function(line_title){
		for(const node of document.getElementsByClassName('title-appear')) { 
			LineWrapper(node); 
		}
		for(const node of document.getElementsByClassName('title-anim')) { 
			LineWrapper(node); 
		}

	});

	$('.link-text, .btn-text').each(function(){
		$(this).attr('data-text', $(this).text());
	})

	if(document.querySelector(".menu-image")) {
		initMenuImage();
	}

	if(document.querySelector(".catalog-image")) {
		initCatalogImage();
	}

	
	const mmenuEl = gsap.utils.toArray(['.mmenu__logo', '.mmenu__cont .modal__close', '.mmenu__list > li', '.mmenu__cart', '.mmenu__contact_phone', '.mmenu__contact_email']);

	mmenuHide = () => {
		gsap.set(mmenuEl, {opacity: 0});
	}
	mmenuAnim = () => {
		const mmenuLogo = document.querySelector('.mmenu__logo');
		const mmenuClose = document.querySelector('.modal__close');


		const tl = gsap.timeline();

		mmenuEl.forEach((el, index) => {
			tl
			.to(el, {
				opacity: 1,
				duration: .6,
				ease: 'cubic-bezier(0,0,.15,1)'
			}, index == 0 ? .5 : '-=.55')
			// index == 0 ? .5 : '-=.5'
		})
	}
	mmenuHide();

	modalClose = () => {
		const els = gsap.utils.toArray('.modal-anim');
		gsap.set(els, {opacity: 0})
	}
	modalClose();
	
	modalAnim = (src) => {
		const els = gsap.utils.toArray(src + ' .modal-anim');
		gsap.set(els, {opacity: 0});

		const tl = gsap.timeline();

		els.forEach((el, index) => {
			tl
			.to(el, {
				opacity: 1,
				duration: .6,
				ease: 'cubic-bezier(0,0,.15,1)'
			}, index == 0 ? .5 : '-=.55')
		})
	}


	headerAnim = function() {
		const elements = gsap.utils.toArray(['.logo', $(".hmenu a:visible").length ? $(".hmenu a:visible") : '.hmenu', '.hphone', '.hcart', '.head__mmenu']);

		gsap.set(elements, {opacity: 0});

		const tl = gsap.timeline();

		elements.forEach((el, index) => {
			tl
			.to(el, {
				opacity: 1,
				duration: .6,
				ease: 'cubic-bezier(0,0,.15,1)'
			}, index == 0 ? .5 : '-=.5')
		})
	} 

	$(function(){
		let toTop = document.querySelector('.toTop');
		setTimeout(function(){
			gsap.set(toTop, {opacity: 1});
		}, 300)
		const toTopAnim = gsap.from(toTop, {
			yPercent: 200,
			paused: true,
			ease: "easeOut",
			duration: 0.3,
		}).progress(1);
		ScrollTrigger.create({
			start: "top bottom",
			end: 99999,
			onUpdate: (self) => {
				(self.direction === -1 && $(window).scrollTop() > 100) ? toTopAnim.play() : toTopAnim.reverse();
			}
		});
	})
	

	/* MAIN TOP */
	if($('.section_top').length) {
		$(function(){


			const section = document.querySelector('.section_top');
			const title = section.querySelector('.top__title');
			const words = title.querySelectorAll(".words");
			const lines = title.querySelectorAll(".line");
			const link = section.querySelector('.top__link');
			const image = section.querySelector('.top__image');

			const mainTimeline = gsap.timeline();

			let tl = gsap.timeline();
			tl.from(words, 1, param.words)
			.to(lines, 1, param.lines, 0);

			mainTimeline.add(tl);

			tl = gsap.timeline();
			tl
			.from(link, {
				opacity: 0,
				duration: .8,
				ease: Power2.easeOut,
			});

			mainTimeline.add(tl, 1.2);

			/*gsap.set(image, {opacity: .2});
			tl = gsap.timeline()
			.to(image, {
				opacity: .5,
				duration: .8,
				ease: Power2.easeIn
			})
			.to(image, {
				opacity: .7,
				duration: .6,
				delay: .6, 
				ease: Power2.easeIn
			})
			.to(image, {
				opacity: 1,
				duration: 0,
				delay: 1, 
				ease: Power2.easeOut
			})

			mainTimeline.add(tl, 1.5);*/


			ScrollTrigger.create({  
				trigger: ".section_top",
				start: "top bottom-=25%",
				animation: mainTimeline,
			}); 


			headerAnim();

		});
	}

	/* title */
	$(function(titleAppear){    
		const title = gsap.utils.toArray('.title-appear');
		title.forEach((element, i) => {
			const words = element.querySelectorAll(".words");
			const lines = element.querySelectorAll(".line");

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					toggleActions: "play none none none"
				}
			});
			tl.set(element, { autoAlpha: 1 });
			tl.from(words, 1, param.words)
			.to(lines, 1, param.lines, 0)

		});
	});

	/* img */
	$(function(){    
		const title = gsap.utils.toArray('.img-appear');
		title.forEach((img, i) => {
			gsap.set(img, {
				webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
				clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
			})

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: img,
					start: "top bottom-=20%",
					toggleActions: "play none none none"
				}
			})
			.to(img, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power2.easeOut
			});

		});
	});



	/* about logo */
	if($('.about__logo').length) {
		$(function(){
			const logo = document.querySelector('.about__logo_main')
			const sup = document.querySelector('.about__logo_sup')
			const bt = document.querySelector('.about__logo .bt')

			gsap.set(logo, {
				webkitClipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
				clipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
			})

			gsap.set(sup, {
				webkitClipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
				clipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
			})

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.about__logo',
					start: "top bottom-=25%",
					toggleActions: "play none none none"
				}
			})
			.from(logo.querySelector('svg'), {
				yPercent: 100,
				ease: Power2.out,
				duration: 1,
				stagger : 0.2
			})
			.to(logo, 1, {
				webkitClipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				stagger : 0.2,
				duration: 1,
			}, 0)
			.from(sup.querySelector('svg'), {
				yPercent: 100,
				ease: Power2.out,
				duration: 1,
				stagger : 0.2
			}, '-=.3')
			.to(sup, 1, {
				webkitClipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				duration: 1,
			}, 0)
			.to(bt, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power1.easeOut
			}, '-=.5')
		})
	}

	/* foot logo */
	if($('.foot__logo').length) {
		$(function(){
			const logo = document.querySelector('.foot__logo_main')
			const sup = document.querySelector('.foot__logo_sup')
			const bt = document.querySelector('.foot__logo .bt')

			gsap.set(logo, {
				webkitClipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
				clipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
			})

			gsap.set(sup, {
				webkitClipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
				clipPath : "polygon(0 0,100% 0,100% 0,0 50%)",
			})

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.foot__logo',
					start: "top bottom-=25%",
					toggleActions: "play none none none"
				}
			})
			.from(logo.querySelector('svg'), {
				yPercent: 100,
				ease: Power2.out,
				duration: 1,
				stagger : 0.2
			})
			.to(logo, 1, {
				webkitClipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				stagger : 0.2,
				duration: 1,
			}, 0)
			.from(sup.querySelector('svg'), {
				yPercent: 100,
				ease: Power2.out,
				duration: 1,
				stagger : 0.2
			}, '-=.3')
			.to(sup, 1, {
				webkitClipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				clipPath : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				duration: 1,
			}, 0)
			.to(bt, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power1.easeOut
			}, '-=.5')
		})
	}


	/* btn hover */
	$(function(button){
		gsap.set('.btn-fill', { y: "76%" })
		$('.btn, .btn-outer').on('mouseenter', function() {
			$(this).addClass('hover');
			if($(this).find(".btn-fill").length) {
				gsap.to($(this).find(".btn-fill"), .45, {
					startAt: {y: "76%"},
					y: "0%",
					ease: Power2.easeInOut
				});
			}
			$(this.parentNode).removeClass('not-active');
		});
		$('.btn, .btn-outer').on('mouseleave', function() {
			$(this).removeClass('hover');
			if($(this).find(".btn-fill").length) {
				gsap.to($(this).find(".btn-fill"), .45, {
					y: "-76%",
					ease: Power2.easeInOut
				});
			}
			$(this.parentNode).removeClass('not-active');
		});
	}) 

	/* standart animation */
	$(function(titleAppear){    
		const title = gsap.utils.toArray('.title-appear, .text-appear, .anim-item, .anim-parent');
		title.forEach((box, i) => {
			var $duration = .8;
			const anim = gsap.from(box, {
				stagger:0.1,
				onComplete: function(){
					$(box).addClass('anim-active');
				}
			});
			ScrollTrigger.create({
				trigger: box,
				start: "top bottom-=40px",
				animation: anim,
				toggleActions: 'play none none none',
				once: true
			});
		});
	});


	/* UTP cifres */
	if($('.utp__cifres').length) {
		$(function(){
			let items;
			console.log(windowWidth);
			if(windowWidth >= 992) {
				items = gsap.utils.toArray(".utp__cifres_item")
			}else{
				items = gsap.utils.toArray([".utp__cifres_item.order-1", ".utp__cifres_item.order-2", ".utp__cifres_item.order-3"])
			}
			const mainTimeline = gsap.timeline();
			let pause = 0;

			items.forEach((item, index) => {

				let chars = item.querySelectorAll('.char')
				let text = item.querySelector(".utp__cifres_text")

				let tl = gsap.timeline()

				chars.forEach((char) => {
					tl.from(char, {yPercent: 50, opacity: 0, duration: .3, ease: Power2.easeOut}, '-=0.2')
				});

				tl
				.from(text, {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=0.35')
				mainTimeline.add(tl, index == 0 ? 0 : pause)
				pause += (chars.length + 1 ) * 0.1;
			})


			ScrollTrigger.create({  
				trigger: ".utp__cifres",
				start: "top bottom-=25%",
				animation: mainTimeline,
			}); 
		});
	}

	$(function(runText){ 
		if($('.text-to-left-side').length) {
			$(window).on("load resize scroll", function() {
				$(".text-to-left-side").each(function() {
					var windowTop = $(window).scrollTop();
					var elementTop = $(this).offset().top;
					var leftPosition = windowTop * 1600 / elementTop;
					$(this)
					.find(".marquee__inner")
					.css({ right: leftPosition });
				});  
			}); 
		}
	}); 

	/* who top*/
	if(windowWidth >= 1200 && $('.who__top').length) {
		$(() => {
			const tl = gsap.timeline({// КНОПКА НА ПЕРВОМ ЭКРАНЕ
				scrollTrigger: {
					trigger: ".who__top",
					start: "top bottom",
					end: "top top+=50vh",
					scrub: true
				}
			})
			.from($('.who__title > span:nth-child(2n+2)'), { xPercent: 20 }, '<') 
			.from($('.who__title > span:nth-child(2n+1):not(:first-child)'), { xPercent: -20 }, '<') 
			.fromTo(".who__from", { yPercent: 20 }, {yPercent: -20}, '<') 
		})
	}

	/* who cont */
	if($('.who__cont').length) {
		$(function(){

			const section = document.querySelector('.who__cont');
			const bt = section.querySelector('.bt');
			const items = gsap.utils.toArray(".who__item")
			const mainTimeline = gsap.timeline();

			let tl = gsap.timeline()
			.to(bt, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power1.easeOut
			})
			mainTimeline.add(tl)

			items.forEach((item, index) => {

				let num = item.querySelector(".who__num")
				let text = item.querySelector(".who__text")

				let tl = gsap.timeline()
				.to(item, {
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					duration: 1,
					ease: Power2.easeOut
				})
				.from(num, {opacity: 0, duration: .5, ease: Power2.easeIn}, '-=.8')
				.from(text, {opacity: 0, duration: .5, ease: Power2.easeIn}, '<')

				mainTimeline.add(tl, index * 0.3)
			})

			ScrollTrigger.create({  
				trigger: ".who__cont",
				start: "top bottom-=40px",
				animation: mainTimeline,
			}); 
		});
	}



	/* page top */
	if($('.section_ptop').length) {
		$(function(){

			const section = document.querySelector('.section_ptop');
			const title = section.querySelector('.title-anim');
			const words = title.querySelectorAll(".words");
			const lines = title.querySelectorAll(".line");

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top bottom-=20%",
					toggleActions: "play none none none"
				}
			});

			tl.set(title, { autoAlpha: 1 });
			tl.from(words, 1, param.words)
			.to(lines, 1, param.lines, 0);

			if(section.querySelectorAll('.ptop__text').length) {
				tl
				.from(section.querySelectorAll('.ptop__text'), {
					opacity: 0,
					ease: Power2.easeIn,
					duration: .8
				}, '-=0.8')
			}

			if(section.querySelectorAll('.ptop__mark').length) {
				tl
				.from(section.querySelector('.ptop__mark'), {
					opacity: 0,
					ease: Power2.easeIn,
					duration: .8
				}, '-=0.6')
			}

			if(section.querySelectorAll('.ptop__btn').length) {
				tl
				.from(section.querySelector('.ptop__btn'), {
					opacity: 0,
					ease: Power2.easeIn,
					duration: .8
				}, '-=0.6')
			}

			if(section.querySelectorAll('.ptop__tags').length) {
				section.querySelectorAll('.ptop__tags li').forEach((item) => {
					tl
					.from(item, {
						opacity: 0,
						ease: Power2.easeIn,
						duration: .6
					}, '-=0.4')
				})
			}

			if(section.querySelectorAll('.ptop__col_item').length) {
				section.querySelectorAll('.ptop__col_item').forEach((item) => {
					tl
					.from(item, {
						opacity: 0,
						ease: Power2.easeIn,
						duration: .6
					}, '-=0.4')
				})
			}

		});
	}


	/* bt */
	if($('.bt.anim-item').length) {
		$(function(){

			const items = gsap.utils.toArray('.bt.anim-item');

			items.forEach((item) => {

				let tl = gsap.timeline()
				.to(item, {
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					duration: 1,
					ease: Power1.easeOut
				})

				ScrollTrigger.create({  
					trigger: item,
					start: "top bottom-=25%",
					animation: tl,
				}); 
			})


		});
	}


	/* ucard */
	if($('.section_ucard').length) {
		$(function(){

			const conts = gsap.utils.toArray('.ucard__outer');
			const bt = document.querySelector('.section_ucard .bt');

			let mainTimeline = gsap.timeline();


			let tl = gsap.timeline()
			.to(bt, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power1.easeOut
			})

			mainTimeline.add(tl)

			conts.forEach((cont, index) => {

				let tl = gsap.timeline();

				let item = cont.querySelector('.ucard__item');
				let text = cont.querySelector('.ucard__text');
				let img = cont.querySelector('.ucard__img');

				gsap.set(item, {
					webkitClipPath: "polygon(-100% -100%, 200% -100%, 200% -100%, -100% -100%)",
					clipPath: "polygon(-100% -100%, 200% -100%, 200% -100%, -100% -100%)",
				})

				tl
				.to(item, {
					webkitClipPath: "polygon(-100% -100%, 200% -100%, 200% 200%, -100% 200%)",
					clipPath: "polygon(-100% -100%, 200% -100%, 200% 200%, -100% 200%)",
					duration: 2,
					ease: Power2.easeOut
				})
				.from(text, {
					opacity : 0,
					duration : .5,
					ease: Power1.easeIn
				}, '-=1.5')
				.from(img, {
					y: 30,
					duration : 1,
					ease: Power1.easeIn
				}, '-=2');


				mainTimeline.add(tl, index * .2)

			})


			ScrollTrigger.create({  
				trigger: '.section_ucard',
				start: "top bottom-=25%",
				animation: mainTimeline,
			}); 


		});
	}


	/* school cont */
	if($('.school__row').length) {
		$(function(){

			const rows = document.querySelectorAll('.school__row');

			rows.forEach((row, index) => {
				let mainTimeline = gsap.timeline();

				let bt = row.querySelectorAll('.bt');
				let title = row.querySelector('.title-anim');
				let cards = row.querySelectorAll('.card__item');
				let nav = row.querySelectorAll('.nav__item');
				let pause = .4;

				if(bt) {
					let tl = gsap.timeline()
					.to(bt, {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						duration: 1,
						ease: Power1.easeOut
					})

					mainTimeline.add(tl, 0)
				}

				if(title) {
					let tl = gsap.timeline();

					let words = title.querySelectorAll(".words");
					let lines = title.querySelectorAll(".line");

					tl.set(title, { autoAlpha: 1 });
					tl.from(words, 1, param.words)
					.to(lines, 1, param.lines, 0);

					mainTimeline.add(tl, 0)
				}

				if(cards) {
					cards.forEach((item, index) => {
						let tl = gsap.timeline()
						let img = item.querySelector('.card__item_img')
						let info = item.querySelectorAll('.card__item_name, .card__item_descr, .card__item_info')

						gsap.set(img, {
							webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
							clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
						})

						tl
						.to(img, {
							webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							duration: 1,
							ease: Power2.easeOut
						})
						.from(info, {
							opacity : 0,
							duration : .5,
							ease: Power1.easeIn
						}, '-=.5')

						pause += .2;
						mainTimeline.add(tl, pause)
					})
				}
				if(nav) {
					let tl = gsap.timeline()
					.from(nav, {
						opacity : 0,
						duration : .5,
						ease: Power1.easeIn
					}, '-=.4');
					mainTimeline.add(tl, pause)
				}


				ScrollTrigger.create({  
					trigger: row,
					start: "top bottom-=25%",
					animation: mainTimeline
				}); 
			});

		});
	}


	/* news cont */
	if($('.news__cont').length) {
		$(function(){

			let mainTimeline = gsap.timeline();

			let cont = document.querySelector('.news__cont');
			let bt = cont.querySelector('.bt');
			let subcats = cont.querySelectorAll('.news__subcat a');
			let news = cont.querySelectorAll('.news__outer');


			if(bt) {
				let tl = gsap.timeline()
				.to(bt, {
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					duration: 1,
					ease: Power1.easeOut
				})

				mainTimeline.add(tl, 0)
			}

			if(subcats) {
				let tl = gsap.timeline();
				subcats.forEach((subcat) => {
					tl
					.from(subcat, {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=.3')
				})
				mainTimeline.add(tl, .4)
			}


			if(news) {
				news.forEach((item, index) => {
					let tl = gsap.timeline()
					let img = item.querySelector('.news__img')
					let info = item.querySelectorAll('.news__cat, .news__name')

					gsap.set(img, {
						webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
						clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
					})

					tl
					.to(img, {
						webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						duration: 1,
						ease: Power2.easeOut
					})
					.from(info, {
						opacity : 0,
						duration : .5,
						ease: Power1.easeIn
					}, '-=.5')

					mainTimeline.add(tl, index * .2 + .4)
				})
			}

			ScrollTrigger.create({  
				trigger: cont,
				start: "top bottom-=25%",
				animation: mainTimeline
			}); 


		});
	}

	/* cat cont */
	if($('.cat__cont').length) {
		$(function(){

			const conts = gsap.utils.toArray('.cat__cont');

			conts.forEach((cont, index) => {

				let mainTimeline = gsap.timeline();
				let bt = cont.getElementsByClassName('bt')[0];
				let title = cont.getElementsByClassName('title-anim')[0];
				let filters = cont.querySelectorAll('.filter__outer');
				let products = cont.querySelectorAll('.pr__item');
				let pagination = cont.querySelectorAll('.pagination__list li');

				let filter_pause = 0;

				if(bt) {
					let tl = gsap.timeline()
					.to(bt, {
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						duration: 1,
						ease: Power1.easeOut
					})

					mainTimeline.add(tl, 0)
				}

				if(title) {
					let tl = gsap.timeline();

					let words = title.querySelectorAll(".words");
					let lines = title.querySelectorAll(".line");

					tl.set(title, { autoAlpha: 1 });
					tl.from(words, 1, param.words)
					.to(lines, 1, param.lines, 0);

					mainTimeline.add(tl, 0)

					filter_pause = .6;
				}

				if(filters) {
					let tl = gsap.timeline();
					filters.forEach((filter) => {
						let name = filter.querySelector('.filter__name');
						let links = filter.querySelectorAll('.link');

						tl
						.from(name, {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=.3');

						links.forEach((link) => {
							tl
							.from(link, {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=.3')
						})
						
					})
					mainTimeline.add(tl, filter_pause)
				}

				if(products) {
					products.forEach((product, prod_index) => {
						let tl = gsap.timeline()
						let img = product.querySelector('.pr__img')
						let info = product.querySelectorAll('.pr__name, .pr__opt, .pr__gift, .pr__price, .pr__sub')

						gsap.set(img, {
							webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
							clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
						})

						tl
						.to(img, {
							webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
							duration: 1,
							ease: Power2.easeOut
						})
						.from(info, {
							opacity : 0,
							duration : .5,
							ease: Power1.easeIn
						}, '-=.5')

						mainTimeline.add(tl, prod_index * .2)
					})
				}

				if(pagination) {
					let tl = gsap.timeline();
					tl
					.from(cont.querySelector('.pagination__left'), {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=.3');
					pagination.forEach((page) => {
						tl
						.from(page, {opacity: 0, duration: .4, ease: Power2.easeIn}, '-=.3');
					})
					mainTimeline.add(tl, filter_pause)
				}

				ScrollTrigger.create({  
					trigger: cont,
					start: "top bottom-=25%",
					animation: mainTimeline
				}); 
			})


		});
	}

	/* modcatalog */
	if($('.section_modcat').length) {

		$(function(){

			const section = document.getElementsByClassName('section_modcat')[0];

			const title = section.querySelector('.title-anim');
			const words = title.querySelectorAll(".words");
			const lines = title.querySelectorAll(".line");
			const bt = section.querySelector(".bt");

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top bottom-=40px",
					toggleActions: "play none none none"
				}
			})
			.from('.modcat__title', {opacity: 0, duration: .5, ease: Power2.easeIn})
			.to(bt, {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1,
				ease: Power1.easeOut
			})
			tl.from(words, 1, param.words, '<')
			.to(lines, 1, param.lines, 0);


			/* items */
			const items = gsap.utils.toArray(".modcat__item:not(.modcat__item-title)")
			const mainTimeline = gsap.timeline();

			gsap.set(items, {clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"});

			items.forEach((item, index) => {

				let name = item.querySelectorAll(".modcat__item_name")
				let img = item.querySelectorAll(".modcat__item_img")

				let tl = gsap.timeline()
				.to(item, {
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
					duration: 1,
					ease: Power2.easeOut
				})
				.from(name, {opacity: 0, duration: .5, ease: Power2.easeIn}, '-=.8')
				.from(img, {opacity: 0, duration: .5, ease: Power2.easeIn}, '-=.5')

				mainTimeline.add(tl, index * 0.3)
			})

			ScrollTrigger.create({  
				trigger: section,
				start: "top bottom-=40px",
				animation: mainTimeline,
			}); 

		});
	}


	/* modschool */
	if($('.section_modschool').length) {
		$(function(){

			const section = document.querySelector('.section_modschool');

			const bg = section.querySelector('.img-bg');
			const banner = section.querySelector('.modschool__banner');
			const title = section.querySelector('.modschool__banner_title');
			const link = section.querySelector('.modschool__banner_link');

			gsap.set(banner, {
				webkitClipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
				clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
			})

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top bottom-=40%",
					toggleActions: "play none none none",
				}
			})
			.to(banner, {
				webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				duration: 1.4,
				ease: Power1.easeOut
			}, '<')
			.from(title, {
				opacity: 0,
				ease: Power2.easeOut,
				duration: .5,
				delay: .4
			}, 0)
			.from(link, {
				opacity: 0,
				ease: Power2.easeOut,
				duration: .5,
				delay: .5
			}, 0)

			const tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".modschool__cont",
					start: "top bottom-=25%",
					end: "bottom bottom-=25%",
					scrub: true
				}
			})
			.from(bg, {
				transform: 'scale(1.36)',
				duration: 1.6, 
				ease: Power2.easeOut 
			})

		});
	}

	/* cursor select */
	$(function(){
		var cursor = $(".cursor-select");

		var posXCursor = 0
		var posYCursor = 0

		var mouseX = 0;
		var mouseY = 0;

		$(document).on("mousemove", function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		gsap.to({}, 0.0083333333, {
			repeat: -1,
			onRepeat: function() {

				posXCursor += (mouseX - posXCursor) / 2;
				posYCursor += (mouseY - posYCursor) / 2;
				gsap.set(cursor, {
					css: {
						left: posXCursor,
						top: posYCursor
					}
				});
			}
		});

		$('[data-cursor-select]').on('mouseenter', function() {
			cursor.addClass('active');
		});
		$('[data-cursor-select]').on('mouseleave', function() {
			cursor.removeClass('active');
		});


	})

	/* catalog cont */
	$(function(){
		var cursorImage = $(".cursor-cat");

		var posXCursor = 0
		var posYCursor = 0

		var mouseX = 0;
		var mouseY = 0;

		$(document).on("mousemove", function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		gsap.to({}, 0.0083333333, {
			repeat: -1,
			onRepeat: function() {

				if(document.querySelector(".cursor-cat")) {
					posXCursor += (mouseX - posXCursor) / 2;
					posYCursor += (mouseY - posYCursor) / 2;
					gsap.set(cursorImage, {
						css: {
							left: posXCursor,
							top: posYCursor
						}
					});
				}
			}
		});

		$('.cursor-cat-item').on('mouseenter', function() {
			cursorImage.addClass('active ' + ($(this).hasClass('dark-item') ? 'dark-item' : ''));
			$("#arrow-anim-svg path").addClass('draw-arrow');
		});
		$('.cursor-cat-item').on('mouseleave', function() {
			cursorImage.removeClass('active dark-item');
			$("#arrow-anim-svg path").removeClass('draw-arrow');
		});


	})


	/* fregat */
	if($('.fregat__cont').length) {
		$(function(){

			const section = document.querySelector('.fregat__cont');
			const title = section.querySelector('.title-anim');
			const words = title.querySelectorAll(".words");
			const lines = title.querySelectorAll(".line");

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top bottom-=20%",
					toggleActions: "play none none none"
				}
			});

			tl.set(title, { autoAlpha: 1 });
			tl.from(words, 1, param.words)
			.to(lines, 1, param.lines, 0);

			if(section.querySelectorAll('.fregat__text').length) {
				tl
				.from(section.querySelector('.fregat__text'), {
					opacity: 0,
					ease: Power2.easeIn,
					duration: .8
				}, '-=0.8')
			}

			if($('.fregat__img').length) {
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: '.fregat__img',
						start: "top bottom-=25%",
						toggleActions: "play none none none"
					}
				})
				.from('.fregat__img img', {
					y: 30,
					duration: 1, 
					ease: Power2.easeOut ,
				})
			}
		})
	}
});

/* CATALOG IMAGE */
function initCatalogImage() {

	var cursorImage = $(".catalog-image");

	var posXImage = 0
	var posYImage = 0

	var mouseX = 0;
	var mouseY = 0;

	$(document).on("mousemove", function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	if(document.querySelector(".catalog-image")) {
		gsap.to({}, 0.0083333333, {
			repeat: -1,
			onRepeat: function() {

				if(document.querySelector(".catalog-image")) {
					posXImage += (mouseX - posXImage) / 12;
					posYImage += (mouseY - posYImage) / 12;
					gsap.set(cursorImage, {
						css: {
							left: posXImage,
							top: posYImage
						}
					});
				}
			}
		});
	}

	$('.catalog__cont a').on('mouseenter', function() {
		$('.catalog-image').addClass('active');
	});
	$('.catalog__cont a').on('mouseleave', function() {
		$('.catalog-image').removeClass('active');
	});


	$('.catalog__cont a').on('mouseenter', function() {

		var $elements = $(".catalog__cont a");
		var index =  $elements.index($(this));
		var count = $(".catalog-image li").length;
		gsap.to($(".catalog-image-list"), {
			y: (index*100)/(count*-1) + "%",
			duration: .6,
			ease: Power2.easeOut
		});
		$(".catalog-image.active .catalog-image-inner").addClass("active").delay(400).queue(function(next){
			// $(this).removeClass("active");
			// next();
		});

	});
}
/* # CATALOG IMAGE */ 

/* MENU IMAGE */
function initMenuImage() {

	var cursorImage = $(".menu-image");

	var posXImage = 0
	var posYImage = 0

	var mouseX = 0;
	var mouseY = 0;

	$(document).on("mousemove", function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	if(document.querySelector(".menu-image")) {
		gsap.to({}, 0.0083333333, {
			repeat: -1,
			onRepeat: function() {

				if(document.querySelector(".menu-image")) {
					posXImage += (mouseX - posXImage) / 12;
					posYImage += (mouseY - posYImage) / 12;
					gsap.set(cursorImage, {
						css: {
							left: posXImage,
							top: posYImage
						}
					});
				}
			}
		});
	}

	$('.menu__cont a').on('mouseenter', function() {
		$('.menu-image').addClass('active');
	});
	$('.menu__cont a').on('mouseleave', function() {
		$('.menu-image').removeClass('active');
	});


	$('.menu__cont a').on('mouseenter', function() {

		var $elements = $(".menu__cont a");
		var index =  $elements.index($(this));
		var count = $(".menu-image li").length;
		gsap.to($(".menu-image-list"), {
			y: (index*100)/(count*-1) + "%",
			duration: .6,
			ease: Power2.easeOut
		});
		$(".menu-image.active .menu-image-inner").addClass("active").delay(400).queue(function(next){
			// $(this).removeClass("active");
			// next();
		});

	});

}
/* # MENU IMAGE */


/* MAGNETIC BUTTON ГЛАВНАЯ - ПЕРВЫЙ ЭКРАН*/
var windowWidth = $(window).width();
if((windowWidth > 1200) & ($('a.top__cont.link').length)){
	var mArea = document.querySelector('a.top__cont.link');
	function parallaxIt(e, target, movement = 1){
		var boundingRect = mArea.getBoundingClientRect();
		var relX = e.pageX - boundingRect.left;
		var relY = e.pageY - boundingRect.top;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		gsap.to(target, {
			x: (relX - boundingRect.width / 3.4),
			y: (relY - boundingRect.height / 1.2 - scrollTop),
			ease: "power1",
			duration: 0.6
		});
	}
	
	function callParallax(e){
		parallaxIt(e, '.top__link');
	}

	mArea.addEventListener('mousemove', function(e){
		callParallax(e);
	});
	
	mArea.addEventListener('mouseleave', function(e){
		gsap.to('.top__link', {
			scale:1,
			x: 0,
			y: 0,
			ease: "power3",
			duration: 0.6
		});
	});
}
/* # MAGNETIC BUTTON ГЛАВНАЯ - ПЕРВЫЙ ЭКРАН */

/* MAGNETIC BUTTON ГЛАВНАЯ - О КОМПАНИИ*/
if($('.amim-magnetic').length) {
	$(function () {
		$('body').mouseleave(function(e){
			gsap.to('.amim-magnetic', 0.5,{x: 0});
		});
		$('body').mousemove(function(e){   
			callParallax(e);
		});
		function callParallax(e){
			parallaxIt(e, '.amim-magnetic', 60);
		}
		function parallaxIt(e, target, movement){
			var $this = $('body');
			var relX = e.pageX - $this.offset().left;
			gsap.to(target, 0.5, {
				x: (relX - $this.width()/2) / ($this.width()) * movement,
				ease: Power2.easeOut 
			});
		}
	});
}
/* # MAGNETIC BUTTON ГЛАВНАЯ - О КОМПАНИИ */


(function() { 
	let isSafari = (function() { 
		let ua = navigator.userAgent; 
		if (/safari/gi.test(ua) && !/chrome/gi.test(ua)) return true; else return false; })(); 
		if (!isSafari) { 
			SmoothScroll ({ 
				animationTime: 1000, 
				stepSize: 150, 
				accelerationDelta: 30, 
				accelerationMax: 2, 
				keyboardSupport: true, 
				arrowScroll: 50, 
				pulseAlgorithm: true, 
				pulseScale: 5, 
				pulseNormalize: 1, 
				fixedBackground : true, 
				touchpadSupport: true 
			}) 
		} 
	}());