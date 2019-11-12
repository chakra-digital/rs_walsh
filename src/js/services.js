const servicePillars = document.querySelectorAll('.pillar');
const pillarMasks = document.querySelectorAll('.pillar-mask');

// Set .pillar height on scroll
function setPillarHeights() {
  requestAnimationFrame(function(){
    servicePillars.forEach(pillar => pillar.style.height = pillarMasks[0].clientHeight + 'px');
  })
}
setPillarHeights();
window.addEventListener('resize', setPillarHeights);

// Launch the page when a service pillar is clicked
function launchPage(serviceType) {
  console.log(`navigating to ${serviceType}`)
}

servicePillars.forEach(pillar => pillar.addEventListener('click', function(){
  const serviceType = this.dataset.service;
  goToService(serviceType);
}));

// Gsap animation when a pillar is clicked
function goToService(serviceType) {
  gsap.to(pillarMasks, {
    duration: 1,
    stagger: 0.2,
    height: 0,
    ease: 'expo.inOut',
    onComplete: launchPage,
    onCompleteParams: [serviceType]
  });
}