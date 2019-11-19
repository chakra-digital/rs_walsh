
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
    ease: 'expo.inOut'
  });

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

}









  



















