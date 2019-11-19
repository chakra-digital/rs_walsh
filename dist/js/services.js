/*!
 * rs_walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */


const pillarMasks = document.querySelectorAll('.pillar-mask');
const mains = document.querySelectorAll('.main')
const servicePillars = document.querySelectorAll('.pillar');



if(servicePillars.length) {


  // GSAP animation on services parent page load
  function animatePillarsIn() {
    gsap.from(pillarMasks, {
      duration: 1,
      stagger: 0.2,
      height: 0,
      ease: 'expo.inOut'
    });
  }
  animatePillarsIn();





  //console.log('adding event listeners to pillars')
  servicePillars.forEach(pillar => {
    const main = pillar.querySelector('.main');

    pillar.addEventListener('mouseenter', (function(){
      const descHeight = pillar.querySelector('.description').clientHeight;
      main.style.height = `calc(100% - ${descHeight}px`;
      //console.log('mouseenter')
    }));

    pillar.addEventListener('mouseleave', (function(){
      main.style.height = '100%';
    }));
  });



  // Set .pillar height on browser resize
  // function setPillarHeights() {
  //   requestAnimationFrame(function(){
  //     servicePillars.forEach(pillar => pillar.style.height = pillarMasks[0].clientHeight + 'px');
  //   })
  // }
  // setPillarHeights();
  // window.addEventListener('resize', setPillarHeights);



  // When service pillar is clicked
  servicePillars.forEach(pillar => pillar.addEventListener('click', (function(e){
    servicePillars.forEach(pillar => pillar.style.pointerEvents = 'none')
    e.preventDefault();
    //console.log(this)
    const service = this.dataset.service;
    animatePillarsOut(service);
  })));

  // Gsap animation when a pillar is clicked
  function animatePillarsOut(service) {
    gsap.to(pillarMasks, {
      duration: 1,
      stagger: 0.2,
      height: 0,
      ease: 'expo.inOut',
      onComplete: goToService,
      onCompleteParams: [service]
    });
  }

  function goToService(service) {
    window.location.href = `https://chakra-digital.github.io/rs_walsh/dist/services/${service}.html`
  }


} else {


  
  const serviceSection = document.querySelector('.service-section');
  const serviceSectionRows = serviceSection.querySelectorAll('.animate-in');
  console.log(serviceSectionRows)
  serviceSection.classList.add('showing');
  gsap.from(serviceSection, {
    delay: .75,
    duration: 1,
    opacity: 0,
    ease: 'power1.out'
  })
  
  gsap.from(serviceSectionRows, {
    delay: .75,
    stagger: .2,
    duration: 1,
    y: 100,
    ease: 'power1.out'
  })

}


const serviceSection = document.querySelector('.service-section');
if(serviceSection) {
  animateServiceSection();
  console.log('hi')
}


















