
const rippleBtns = document.getElementsByClassName("ripple");

function createRipple(event) {
  // Create the ripple span element
  let ripples = document.createElement("span");
  
  // Calculate the position relative to the button element
  let x = event.clientX - event.target.getBoundingClientRect().left;
  let y = event.clientY - event.target.getBoundingClientRect().top;
  
  // Set the position of the ripple within the button element
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  
  // Append the ripple to the button
  event.target.appendChild(ripples);
  
  // Set a timeout to remove the ripple after 1000 milliseconds
  let clearTimeoutHandle = setTimeout(() => {
    ripples.remove();
  }, 1000);

  // Remove the ripple immediately if the mouse leaves the button
  event.target.addEventListener("mouseout", function () {
    clearTimeout(clearTimeoutHandle);
    ripples.remove();
  });
}

// Attach the createRipple function to each button
for (let i = 0; i < rippleBtns.length; i++) {
  const rippleBtn = rippleBtns[i];
  rippleBtn.addEventListener("mouseover", createRipple);
}


// line progress bar

let progress = $('#progress1').LineProgressbar({
    percentage: 100
  });
  
  let progress2 = $('#progress2').LineProgressbar({
    percentage: 98
  });
  
  let progress3 = $('#progress3').LineProgressbar({
    percentage: 97
  });
  

  if($('.reveal').length){gsap.registerPlugin(ScrollTrigger);let revealContainers=document.querySelectorAll(".reveal");revealContainers.forEach((container)=>{let image=container.querySelector("img");let tl=gsap.timeline({scrollTrigger:{trigger:container,toggleActions:"play none none none"}});tl.set(container,{autoAlpha:1});tl.from(container,1.5,{xPercent:-100,ease:Power2.out});tl.from(image,1.5,{xPercent:100,scale:1.3,delay:-1.5,ease:Power2.out});});}



function makeTimer() {

	//		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
		var endTime = new Date("30 Aug 2024 9:56:00 GMT+01:00");			
			endTime = (Date.parse(endTime) / 1000);

			var now = new Date();
			now = (Date.parse(now) / 1000);

			var timeLeft = endTime - now;

			var days = Math.floor(timeLeft / 86400); 
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
  
			if (hours < "10") { hours = "0" + hours; }
			if (minutes < "10") { minutes = "0" + minutes; }
			if (seconds < "10") { seconds = "0" + seconds; }

			$("#days").html(days + "<span>Days</span>");
			$("#hours").html(hours + "<span>Hours</span>");
			$("#minutes").html(minutes + "<span>Minutes</span>");
			$("#seconds").html(seconds + "<span>Seconds</span>");		

	}

	setInterval(function() { makeTimer(); }, 1000);



    $(document).ready(function () {
        const $steps = $('.step');
        const $nextBtns = $('.next-btn');
        const $prevBtns = $('.prev-btn');
        const $dots = $('.dot');
        const $form = $('#multiStepForm');
      
      
        let currentStep = 0;
      
        function showStep(stepIndex) {
            $steps.each(function (index) {
                $(this).toggleClass('active', index === stepIndex);
            });
            $dots.each(function (index) {
                $(this).toggleClass('active', index <= stepIndex);
            });
        }
      
        $nextBtns.on('click', function () {
            if (currentStep < $steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
      
        $prevBtns.on('click', function () {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
      
        $form.on('submit', function (e) {
            e.preventDefault();
            alert('Form submitted!');
        });
      
        // Initialize the first step
        showStep(currentStep);
      });
      