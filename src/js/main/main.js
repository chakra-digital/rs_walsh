/********************************
 Initialize Headroom
********************************/
const header = document.querySelector('header');
const options = {
	offset: 80,
	tolerance: 10
}
const headroom  = new Headroom(header, options);
headroom.init();


/********************************
 Siema Sliders
********************************/
const sliderWrap = document.querySelector('.slider-wrap');
const sliderWrapPagination = document.querySelector('.slider-wrap-pagination');

// Initialize new Siema instance for image slider with pagination
if(sliderWrapPagination) {
	const sliderPagination = new Siema({
		selector: sliderWrapPagination,
		onChange: function() {
			const currentSlide = this.currentSlide;
			pills.forEach( pill => pill.classList.remove('active'));
			pills[currentSlide].classList.add('active');
		},
		duration: 400,
		easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
		loop: true
	});


	// Trigger pagination creator
	sliderPagination.addPagination();
	const dots = document.querySelectorAll('.dot');

	let carouselTimer =	setInterval( function(){ sliderPagination.next();	}, quoteSlideDuration );
}

// Initialize new Siema instance for image slider
if(sliderWrap) {
	const slider = new Siema({
		selector: sliderWrap,
		duration: 400,
		easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
		loop: true
	});
}

const quoteSlideDuration = 10000;

// Add a function that generates pagination to prototype
Siema.prototype.addPagination = function() {
	
	quoteCarousel.firstChild.style.display = 'table';

  for (let i = 0; i < this.innerElements.length; i++) {
		const dot = document.createElement('button');
		dot.classList.add('dot');
		if( i === 0 ) dot.classList.add('active');
    dot.addEventListener('click', _ => {
			this.goTo(i);
			clearTimeout(carouselTimer);
			carouselTimer = setInterval( function(){ mySiema.next(); }, quoteSlideDuration );
		});
    quotePagination.appendChild(dot);
	}
};