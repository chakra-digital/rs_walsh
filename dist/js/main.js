/*!
 * R.S. Walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');
const body = document.body;

hamburger.addEventListener('click', e => {
	body.classList.toggle('mobile-nav-is-open');
  body.classList.contains('mobile-nav-is-open') ? bodyScrollLock.disableBodyScroll(mobileNavWrapper) : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
});

const mq = window.matchMedia('(min-width: 992px)');

function normalize() {
  // Hide Mobile Nav if it's open when user reduces browser width
  if(mq.matches && body.classList.contains('mobile-nav-is-open')) {
    body.classList.remove('mobile-nav-is-open');
    bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  } 
}

window.addEventListener('resize', _.throttle(normalize, 100, {trailing: false}));

function isMobileNavVisible(el) {
  return el.classList.contains('mobile-nav-is-open') ? true : false;
}






/********************************
 Initialize Headroom
********************************/
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


	const sliderPaginationDuration = 10000;

	// Add a function that generates pagination to prototype
	Siema.prototype.addPagination = function() {
		
		sliderPagination.firstChild.style.display = 'table';

		for (let i = 0; i < this.innerElements.length; i++) {
			const dot = document.createElement('button');
			dot.classList.add('dot');
			if( i === 0 ) dot.classList.add('active');
			dot.addEventListener('click', _ => {
				this.goTo(i);
				clearTimeout(sliderTimer);
				sliderTimer = setInterval( (function(){ mySiema.next(); }), sliderPagination );
			});
			sliderPagination.appendChild(dot);
		}
	};


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

	let carouselTimer =	setInterval( (function(){ sliderPagination.next();	}), quoteSlideDuration );
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


/********************************
 Accordion collapse toggle interaction
********************************/
function collapseAccordion(element) {
	console.log('collapsing');
  var dropdownHeight = element.parentElement.querySelector('.submenu').scrollHeight;
  var dropdownTransition = element.style.transition;
  element.style.transition = '';
	// console.log(dropdownHeight);
  requestAnimationFrame((function(){
    element.style.height = dropdownHeight + 'px';
    element.style.transition = dropdownTransition;
    requestAnimationFrame((function(){
      element.style.height = 0 + 'px';
      element.parentElement.classList.remove('expanded');
    }));
  }));


  element.setAttribute('data-collapsed', 'true');
}



function expandAccordion(element){


	console.log('expanding');
  element.parentElement.classList.add('expanded');
	var dropdownHeight = element.scrollHeight;
	var extraMargin = parseInt(window.getComputedStyle(element.lastElementChild).marginBottom.split('px')[0]);
	// console.log(dropdownHeight);
  element.style.height = dropdownHeight + 'px';
  element.addEventListener('transitionend', (function(e) {
    element.removeEventListener('transitionend', arguments.callee);
    element.style.height = 'auto';
  }));
  element.setAttribute('data-collapsed', 'false');
}



var dropdownWrappers = document.querySelectorAll('#mobile-menu .has-submenu');

if(dropdownWrappers !== undefined) {
  dropdownWrappers.forEach(item => item.querySelector('.submenu').setAttribute('data-collapsed', 'true'));
  dropdownWrappers.forEach(item => item.querySelector('p').addEventListener('click', (function(e){
		var dropdown = e.target.nextElementSibling;
    var isCollapsed = dropdown.getAttribute('data-collapsed') === 'true';
    if(isCollapsed) {
      expandAccordion(dropdown);
    } else {
      collapseAccordion(dropdown);
		}
  })));
}


