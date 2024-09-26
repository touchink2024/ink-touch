(function ($) {
  $(document).ready(function () {

     // sticky header active
     if ($("#header").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
          $("#header").removeClass("sticky");
        } else {
          $("#header").addClass("sticky");
        }
      });
    }

        // pricing-plan-tab
        $("#ce-toggle").click(function (event) {
          $(".plan-toggle-wrap").toggleClass("active");
        });
    
        $("#ce-toggle").change(function () {
          if ($(this).is(":checked")) {
            $(".tab-content #yearly").hide();
            $(".tab-content #monthly").show();
          } else {
            $(".tab-content #yearly").show();
            $(".tab-content #monthly").hide();
          }
        });

        $(".header-search-btn").on("click", function (e) {
          e.preventDefault();
          $(".header-search-form-wrapper").addClass("open");
          $('.header-search-form-wrapper input[type="search"]').focus();
          $('.body-overlay').addClass('active');
     });
     $(".tx-search-close").on("click", function (e) {
          e.preventDefault();
          $(".header-search-form-wrapper").removeClass("open");
          $("body").removeClass("active");
          $('.body-overlay').removeClass('active');
     });

                //=== logo slider ===
                $('.logo-slider').slick({
                  slidesToShow: 7,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 0,
                  speed: 8000,
                  pauseOnHover: true,
                  arrows: false,
                  cssEase: 'linear',

                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    }
                  ]
                });

                $(".tes2-slider").slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: 1000,
                  dots: false,
                  infinite: true,
                  prevArrow: '.arrow-left',
                  nextArrow: '.arrow-right',
                });

                $(".tes4-slider").slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  loop: true,
                  speed: 1000,
                  dots: false,
                  infinite: true,
                  prevArrow: '.arrow-left4',
                  nextArrow: '.arrow-right4',
                });

              // testimonial 4//
              $('.slider-galeria').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                infinite: false,
                asNavFor: '.slider-galeria-thumbs',
                prevArrow: $('.testimonial-next-arrow2'),
                nextArrow: $('.testimonial-prev-arrow2'),
              });
              $('.slider-galeria-thumbs').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                items:15,
                arrows: true,
                asNavFor: '.slider-galeria',
                vertical: true,
                verticalSwiping: true,
                focusOnSelect: true,
                infinite: false,
                prevArrow: $('.testimonial-next-arrow2'),
                nextArrow: $('.testimonial-prev-arrow2'),
              });


                  // project style1
                if ($(".project-two__box li").length) {
                  $(".project-two__box li").each(function () {
                    let self = $(this);

                    self.on("mouseenter", function () {
                      console.log($(this));
                      $(".project-two__box li").removeClass("active");
                      $(this).addClass("active");
                    });
                  });
                }

            //Aos animation active
            AOS.init({
              offset: 100,
              duration: 400,
              easing: "ease-in-out",
              anchorPlacement: "top-bottom",
              disable: "mobile",
              once: false,
            });


            //Video poppup
            if ($(".play-btn").length > 0) {
              $(".play-btn").magnificPopup({
                type: "iframe",
              });
            };

        // page-progress
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
          "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
          "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength) / height;
          progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".progress-wrap").addClass("active-progress");
          } else {
            jQuery(".progress-wrap").removeClass("active-progress");
          }
        });
        jQuery(".progress-wrap").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate({ scrollTop: 0 }, duration);
          return false;
        });


    //product colors
    const colors = $(".accordion1 .accordion-item");

    colors.on("click", function () {
      $(".accordion1 .accordion-item").removeClass("active");
      $(this).addClass("active");
    });


  });


  

    //preloader
    $(window).on("load", function (event) {
      setTimeout(function () {
        $(".preloader").fadeToggle();
      }, 500);
    });

    	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.05,
			 translateXValue	= 20,
			 delayValue 		= 0.5,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 95%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}


  //-- home 3 slider --
  $('.hero3-slider-all').owlCarousel({
    items:6,
    center:true,
    autoplay:true,
    autoPlayTimeout:1000,
    autoplaySpeed:3000,
    autoHeight:true,
    autoplayHoverPause:false,
    loop:true,
    margin:5,
    responsive:{
        300:{
          items:2,
          margin:2
        },

        480:{
          items:4,
          margin:2
        },

        919:{
            items: 3,
            margin:4
        },
        1120:{
          items:6,
          margin:4
      }
    }
  });



    // click events
    $('#copyButton').on('click', copy);

    // event handler
    function copy(e) {
  
      // find target element
      var input = $('<textarea/>');
      // input.css({
      //   display: 'none'
      // });
      input.html((new Date).getTime());
      $("#container").append(input)
  
      // select text
      input.focus();
      input.select();
  
      try {
        // copy text
        var result = document.execCommand('copy');
        // if (!result)
        //   alert('please press Ctrl/Cmd+C to copy');
      } catch (err) {
        // alert('please press Ctrl/Cmd+C to copy');
      }
  
    }

      // btn_theme
      $(function() {  
        $('.btn_theme')
          .on('mouseenter', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                  $(this).find('span').css({top:relY, left:relX})
          })
          .on('mouseout', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
              $(this).find('span').css({top:relY, left:relX})
          });
      });

            // btn_theme
            $(function() {  
              $('.btn_theme2')
                .on('mouseenter', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                        $(this).find('span').css({top:relY, left:relX})
                })
                .on('mouseout', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                    $(this).find('span').css({top:relY, left:relX})
                });
            });
      
             // btn_theme
             $(function() {  
              $('.btn_theme3')
                .on('mouseenter', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                        $(this).find('span').css({top:relY, left:relX})
                })
                .on('mouseout', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                    $(this).find('span').css({top:relY, left:relX})
                });
            });

            // btn_theme
            $(function() {  
              $('.btn_theme4')
                .on('mouseenter', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                        $(this).find('span').css({top:relY, left:relX})
                })
                .on('mouseout', function(e) {
                        var parentOffset = $(this).offset(),
                          relX = e.pageX - parentOffset.left,
                          relY = e.pageY - parentOffset.top;
                    $(this).find('span').css({top:relY, left:relX})
                });
            });

            //--- nice select --
            $('select').niceSelect();

})(jQuery);