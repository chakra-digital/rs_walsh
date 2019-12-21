/*!
 * rs_walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */


/********************************
 Projects Single Scripts
********************************/

if(body.classList.contains('project-single')) {

  const sliderControls = document.querySelector('.slider-controls');
  
  sliderControls.addEventListener('click', e => {
    const control = e.target;
    if(control.classList.contains('next')) slider.next();
    else slider.prev();
  });

  const infoPanel = document.querySelector('.project-info-panel .scroll-inner');
  const infoTrigger = document.querySelector('.project-info-trigger');

  
  window.addEventListener('click', e => {

    const target = e.target;
    
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
      
    } else if (target == infoTrigger && body.classList.contains('project-info-panel--is-open') || !target.closest('.project-info-panel')) {
      body.classList.remove('project-info-panel--is-open');
      bodyScrollLock.enableBodyScroll(infoPanel);
    }
    
  });

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
    requestAnimationFrame((function(){
      if(mq.matches) {
        initMobileLayout();
      } else {
        initDesktopLayout();
      }
    }))
  }
}