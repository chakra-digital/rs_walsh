
const pillarMasks = document.querySelectorAll('.pillar-mask');
const mains = document.querySelectorAll('.main')
const servicePillars = document.querySelectorAll('.pillar');


/************************************************
 * Scripts to run on the services parent page
************************************************/
if(servicePillars.length) {

  gsap.from(pillarMasks, {
    duration: 1,
    stagger: 0.2,
    height: 0,
    ease: 'expo.inOut',
    onComplete() {
      gsap.set(pillarMasks, {
        height: 'inherit'
      })
    }
  })
  

  // Changing pillar height on window resize
  // Fixes issues on mobile
  servicePillars.forEach(pillar => {
    const main = pillar.querySelector('.main');

    pillar.addEventListener('mouseenter', function(){
      const descHeight = pillar.querySelector('.description').clientHeight;
      main.style.height = `calc(100% - ${descHeight}px`;
    });

    pillar.addEventListener('mouseleave', function(){
      main.style.height = '100%';
    });
  });


  // Set .pillar height on browser resize
  function setPillarHeights() {
    requestAnimationFrame(function(){
      servicePillars.forEach(pillar => pillar.style.height = pillarMasks[0].clientHeight + 'px');
    })
  }
  
  window.addEventListener('resize', setPillarHeights);

  // Launch the page when a service pillar is clicked
  servicePillars.forEach(pillar => pillar.addEventListener('click', function(e){
    servicePillars.forEach(pillar => pillar.style.pointerEvents = 'none')
    e.preventDefault();
    const href = this.href;
    goToService(href);
  }));

  // Gsap animation when a pillar is clicked
  function goToService(href) {
    const tl = gsap.timeline();
    tl.set(pillarMasks, {
      height: pillarMasks[0].clientHeight
    });
    tl.to(pillarMasks, {
      duration: 1,
      stagger: 0.2,
      height: 0,
      ease: 'expo.inOut',
      onComplete: launchPage,
      onCompleteParams: [href]
    });
  }

  function launchPage(href) {
    window.location = href;
  }

}









  



















