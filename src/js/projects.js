/********************************
 Projects Parent Scripts
********************************/

if( body.classList.contains('projects')) {
  const projects = document.querySelectorAll('.project-tile.project');
  const maxTransform = 15;
  const duration = 0.6;
  const easeFunction = 'power3.out';


  projects.forEach( project => project.addEventListener('mouseleave', function() {
    const projectText = project.querySelectorAll('h2');
    const image = project.querySelector('img');
    
    gsap.to([projectText, image], {
      duration: duration,
      y: 0, 
      x: 0,
      scale: 1,
      ease: easeFunction
    }); 

  }));

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
    
  }));

} // end if body.classList.contains('projects')






/********************************
 Projects Single Scripts
********************************/

if(body.classList.contains('project-single')) {

  
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

  const sliderControls = document.querySelector('.slider-controls');
  
  sliderControls.addEventListener('click', e => {
    const control = e.target;
    if(control.classList.contains('next')) slider.next();
    else slider.prev();
  });

  const infoPanel = document.querySelector('.project-info-panel');
  const infoTrigger = document.querySelector('.project-info-trigger');

  ['click', 'touchstart'].forEach( event => {
    window.addEventListener(event, e => {
      const target = e.target;
      console.log(target)
      if(target == infoTrigger && !body.classList.contains('project-info-panel--is-open')) {

        body.classList.add('project-info-panel--is-open');
        bodyScrollLock.disableBodyScroll(infoPanel);
        
        gsap.from('.meta > div', {
          opacity: 0,
          y: 60,
          delay: .4,
          duration: 1,
          stagger: .075,
          ease: "power4.out"
        })
        
      } else {
        body.classList.remove('project-info-panel--is-open');
        bodyScrollLock.enableBodyScroll(infoPanel);
      }
      
    });
  })

  function initMobileLayout() {
    slider.destroy(true);
    window.removeEventListener('resize', controlHeights);
    body.classList.add('mobile-layout');
  }

  function initDesktopLayout() {
    slider.init();
    window.addEventListener('resize', controlHeights);
    body.classList.remove('mobile-layout');
  }
  
  if(matchMedia){
    var mq = window.matchMedia('(max-width: 767px)');
    mq.addListener(widthChange);
    widthChange(mq);
  }
  
  function widthChange(mq) {
    requestAnimationFrame(function(){
      if(mq.matches) {
        initMobileLayout();
      } else {
        initDesktopLayout();
      }
    })
  }
}