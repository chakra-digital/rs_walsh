const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');
const body = document.body;
const topLevelNavItems = document.querySelectorAll('header nav a');

const topLevelPages = [
  "projects",
  "services",
  "garden-center",
  "about-us",
  "contact"
];

let currentPage = '';
topLevelPages.forEach( item => {
  currentPage = body.classList.contains(item) ? item : '';
  if(currentPage !== '') {
    topLevelNavItems.forEach( item => {
      if(item.dataset.page === currentPage) {
        item.classList.add('active');
      }
    });
  }
});




/********************************
 Mobile Nav Slider
********************************/
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
  tolerance: 4,
  onUnpin : function() {
    hamburger.classList.remove('pinned');
    hamburger.classList.add('unpinned');
  },
  onPin : function() {
    hamburger.classList.remove('unpinned');
    hamburger.classList.add('pinned');
  }
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
				sliderTimer = setInterval( function(){ mySiema.next(); }, sliderPagination );
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


/********************************
 Accordion collapse toggle interaction
********************************/
function collapseAccordion(element) {
	console.log('collapsing');
  var dropdownHeight = element.parentElement.querySelector('.submenu').scrollHeight;
  var dropdownTransition = element.style.transition;
  element.style.transition = '';
	// console.log(dropdownHeight);
  requestAnimationFrame(function(){
    element.style.height = dropdownHeight + 'px';
    element.style.transition = dropdownTransition;
    requestAnimationFrame(function(){
      element.style.height = 0 + 'px';
      element.parentElement.classList.remove('expanded');
    });
  });


  element.setAttribute('data-collapsed', 'true');
}



function expandAccordion(element){


	console.log('expanding');
  element.parentElement.classList.add('expanded');
	var dropdownHeight = element.scrollHeight;
	var extraMargin = parseInt(window.getComputedStyle(element.lastElementChild).marginBottom.split('px')[0]);
	// console.log(dropdownHeight);
  element.style.height = dropdownHeight + 'px';
  element.addEventListener('transitionend', function(e) {
    element.removeEventListener('transitionend', arguments.callee);
    element.style.height = 'auto';
  });
  element.setAttribute('data-collapsed', 'false');
}



var dropdownWrappers = document.querySelectorAll('#mobile-menu .has-submenu');

if(dropdownWrappers !== undefined) {
  dropdownWrappers.forEach(item => item.querySelector('.submenu').setAttribute('data-collapsed', 'true'));
  dropdownWrappers.forEach(item => item.querySelector('p').addEventListener('click', function(){
		var dropdown = this.nextElementSibling;
    var isCollapsed = dropdown.getAttribute('data-collapsed') === 'true';
    if(isCollapsed) {
      expandAccordion(dropdown);
    } else {
      collapseAccordion(dropdown);
		}
  }));
}







/********************************
 Projects Page
********************************/


const projects = document.querySelectorAll('.project-tile.project');

const maxTransform = 15;
const duration = 0.6;
const easeFunction = 'Power3.easeOut'


projects.forEach( project => project.addEventListener('mouseleave', function() {
  const projectText = project.querySelectorAll('h2');
  const image = project.querySelector('img');
  
  TweenMax.to([projectText, image], duration, {
    y: 0, 
		x: 0,
		scale: 1,
    ease: easeFunction
  }); 

}))

projects.forEach( project => project.addEventListener('mousemove', function(e){
  const bcr = project.getBoundingClientRect();
  const xPos = bcr.x;
  const yPos = bcr.y;
  const w = bcr.width;
  const h = bcr.height;
  
  // Get mouse position relative to window
  const mouseWindowY = e.clientY;
  const mouseWindowX = e.clientX;
  
  // Get mouse position relative to project - center point being zero
  const mouseProjectX = Math.floor(mouseWindowX - xPos - w/2);
  const mouseProjectY = Math.floor(mouseWindowY - yPos - h/2);
  
  // Get mouse position on project card
  const mousePercentageX = Math.round(1000 * (mouseProjectX / (w/2))) / 1000;
  const mousePercentageY = Math.round(1000 * (mouseProjectY / (h/2))) / 1000;
  
  // console.log(mousePercentageX, mousePercentageY)
  
  const projectText = project.querySelectorAll('h2');
  const image = project.querySelector('img');
  
  
  
  projectText.forEach(text => {
    TweenMax.to(text, duration, {
      y: maxTransform * -mousePercentageY, 
			x: maxTransform * -mousePercentageX,
      ease: easeFunction,
      // transformPerspective: 900,
      // transformOrigin: 'center'
    });  
  })
  
  TweenMax.to(image, duration, {
    y: maxTransform * mousePercentageY, 
    x: maxTransform * mousePercentageX,
		scale: 1.1,
    ease: easeFunction
  });
  
}));

