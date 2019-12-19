/*!
 * rs_walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */

const header = document.querySelector('header');
const body = document.body;
const wrapper = document.querySelector('.wrapper');

/********************************
 Animate elements in with class .animate-in
********************************/
const animateIn = document.querySelectorAll('.animate-in');
const imgWraps = document.querySelectorAll('.img-wrap > .absolute-0');


document.addEventListener('DOMContentLoaded', (function(){


  // Add loading spinners while images load
  imgWraps.forEach( img => {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    img.prepend(loader);
  });

  // Animate in elements with .animate-in class
  if(animateIn.length) {
    gsap.fromTo(animateIn, {
      y: 100
    },{
      stagger: .1,
      delay: .2,
      duration: 1.5,
      y: 0,
      autoAlpha: 1,
      ease: 'expo.out'
    })
  }

  window.onload = function() {

    // remove loading spinners
    imgWraps.forEach( img => {
      const loader = img.querySelector('.loader');
      img.removeChild(loader);
    })

    

  }
}))

/********************************
 Mouse Interactions (if existing)
********************************/
const mouseInteractItems = document.querySelectorAll('.mouse-interact');
if(mouseInteractItems.length) {

  const maxTransform = 15;
  const duration = 0.6;
  const easeFunction = 'power3.out';
  
  
  mouseInteractItems.forEach( item => item.addEventListener('mouseleave', (function() {
    const actionText = item.querySelectorAll('h2');
    const image = item.querySelector('img');
    
    gsap.to([actionText, image], {
      duration: duration,
      y: 0, 
      x: 0,
      scale: 1,
      ease: easeFunction
    }); 
  
  })));
  
  mouseInteractItems.forEach( item => item.addEventListener('mousemove', (function(e){
    const bcr = item.getBoundingClientRect();
    const xPos = bcr.x;
    const yPos = bcr.y;
    const w = bcr.width;
    const h = bcr.height;
    
    // Get mouse position relative to window
    const mouseWindowY = e.clientY;
    const mouseWindowX = e.clientX;
    
    // Get mouse position relative to mouse-interact item - center point being zero
    const mouseItemX = Math.floor(mouseWindowX - xPos - w/2);
    const mouseItemY = Math.floor(mouseWindowY - yPos - h/2);
    
    // Get mouse position on mouse-interact item card
    const mousePercentageX = Math.round(1000 * (mouseItemX / (w/2))) / 1000;
    const mousePercentageY = Math.round(1000 * (mouseItemY / (h/2))) / 1000;
    
    // console.log(mousePercentageX, mousePercentageY)
    
    const actionText = item.querySelectorAll('h2');
    const image = item.querySelector('img');
    
    
    
    actionText.forEach(text => {
      gsap.to(text, {
        duration: duration,
        y: maxTransform * -mousePercentageY, 
        x: maxTransform * -mousePercentageX,
        ease: easeFunction
      });  
    });
    
    gsap.to(image, {
      duration: duration,
      y: maxTransform * mousePercentageY, 
      x: maxTransform * mousePercentageX,
      scale: 1.12,
      ease: easeFunction
    });
    
  })));

} 
  













if(header) {
  const hamburger = document.getElementById('hamburger');
  const topLevelNavItems = document.querySelectorAll('header nav a');
  const mobileNavWrapper = document.getElementById('mobile-menu');
  const dropdownWrappers = document.querySelectorAll('#mobile-menu .has-submenu');

  /********************************
   Add class 'active' to current parent page
  ********************************/
  const topLevelPages = [
    "projects",
    "services",
    "garden-center",
    "about-us",
    "blog",
    "contact"
  ];
  
  let currentPage = '';
  topLevelPages.forEach( item => {
    currentPage = body.classList.contains(item) ? item : false;
    if(currentPage) {
      topLevelNavItems.forEach( item => {
        if(item.dataset.page === currentPage) {
          item.classList.add('active');
        }
      });
    }
  });

  /********************************
   Mobile Slide-in Nav
  ********************************/
  hamburger.addEventListener('click', e => {
    body.classList.toggle('mobile-nav-is-open');
    body.classList.contains('mobile-nav-is-open') ? bodyScrollLock.disableBodyScroll(mobileNavWrapper) : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  });
  
  var mq = window.matchMedia('(min-width: 992px)');
  
  function normalize() {
    // Hide Mobile Nav if it's open when user reduces browser width
    console.log(mq);
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
   Add accordion function to dropdown on mobile nav
  ********************************/
  dropdownWrappers.forEach(item => item.querySelector('.submenu').setAttribute('data-collapsed', 'true'));
  dropdownWrappers.forEach(item => item.querySelector('p').addEventListener('click', (function(){
    var dropdown = this.nextElementSibling;
    var isCollapsed = dropdown.getAttribute('data-collapsed') === 'true';
    if(isCollapsed) {
      expandAccordion(dropdown);
    } else {
      collapseAccordion(dropdown);
    }
  })));
  

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

} // end if header



if(body.classList.contains('homepage') || body.classList.contains('project-single')) {
  /*********************************************
  Resize the .wrapper div
  Helps fix issues on mobile with 100vh wrappers
  *********************************************/

  window.addEventListener('resize', controlHeights);
  
  function controlHeights(){
    const height = window.innerHeight + 'px';
    this.requestAnimationFrame((function(){
      document.body.style.height = height;
      wrapper.style.height = height;
    }))
  }

  controlHeights(); // called to initially set the height
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




/********************************
 Siema Sliders
********************************/
const sliderWrap = document.querySelector('.slider-wrap');
const sliderWrapPagination = document.querySelector('.slider-wrap-pagination');



// Initialize new Siema instance for image slider
if(sliderWrap) {
  console.log(Siema)
  var slider = new Siema({
    selector: sliderWrap,
    duration: 400,
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    loop: true
  });
}

// Initialize new Siema instance for image slider with pagination
if(sliderWrapPagination) {



  // Add a function that generates pagination to prototype
  Siema.prototype.addPagination = function() {
    const sliderParent = sliderWrapPagination.parentElement;
    
    // sliderWrapPagination.firstChild.style.display = 'table';
    const dotContainer = document.createElement('div');
    dotContainer.classList.add('dot-container');
    sliderParent.style.position = 'relative';
    sliderParent.appendChild(dotContainer);

    for (let i = 0; i < this.innerElements.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if( i === 0 ) dot.classList.add('active');
      dot.addEventListener('click', _ => {
        this.goTo(i);
        clearTimeout(sliderTimer);
        sliderTimer = setInterval( (function(){ sliderPagination.next(); }), 6000 );
      });
      dotContainer.appendChild(dot);
    }
  };


  const sliderPagination = new Siema({
    selector: sliderWrapPagination,
    onChange: function() {
      const currentSlide = this.currentSlide;
      dots.forEach( dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    },
    duration: 400,
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    loop: true
  });


  // Trigger pagination creator
  sliderPagination.addPagination();
  const dots = document.querySelectorAll('.dot');

  let sliderTimer =	setInterval( (function(){ sliderPagination.next();	}), 6000 );
}



/********************************
 Smooth Scroll
********************************/
var scroll = new SmoothScroll('a[href*="#"]', {
  offset: '115px',
  speed: 700,
  speedAsDuration: true,
  easing: 'easeInOutQuint'
});
