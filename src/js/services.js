
const pillarMasks = document.querySelectorAll('.pillar-mask');
const mains = document.querySelectorAll('.main')

function initPillarHoverTransforms() {
  const servicePillars = document.querySelectorAll('.pillar');
  console.log('adding event listeners to pillars')
  servicePillars.forEach(pillar => {
    const main = pillar.querySelector('.main');

    pillar.addEventListener('mouseenter', function(){
      const descHeight = pillar.querySelector('.description').clientHeight;
      main.style.height = `calc(100% - ${descHeight}px`;
      console.log('mouseenter')
    });

    pillar.addEventListener('mouseleave', function(){
      main.style.height = '100%';
    });
  });
}

initPillarHoverTransforms();

// Set .pillar height on browser resize
// function setPillarHeights() {
//   requestAnimationFrame(function(){
//     servicePillars.forEach(pillar => pillar.style.height = pillarMasks[0].clientHeight + 'px');
//   })
// }
// setPillarHeights();
// window.addEventListener('resize', setPillarHeights);

// Launch the page when a service pillar is clicked
// function launchPage(href) {
  // Run barba.js page transitions
// }



// servicePillars.forEach(pillar => pillar.addEventListener('click', function(e){
//   servicePillars.forEach(pillar => pillar.style.pointerEvents = 'none')
//   e.preventDefault();
//   const href = this.href;
//   goToService(href);
// }));

// Gsap animation when a pillar is clicked
function goToService(href) {
  gsap.to(pillarMasks, {
    duration: 1,
    stagger: 0.2,
    height: 0,
    ease: 'expo.inOut',
    onComplete: launchPage,
    onCompleteParams: [href]
  });
}








const defaultTransition = {
  leave({ current }) {
    // Create your tween
    const done = this.async();
      gsap.to(pillarMasks, {
        duration: 1,
        stagger: 0.2,
        height: 0,
        ease: 'expo.inOut',
        onComplete: done
      });
  },
  enter({ next }) {
    
  },
};
// Init barba.js with your transition.
barba.init({
  transitions: [ defaultTransition ],
});