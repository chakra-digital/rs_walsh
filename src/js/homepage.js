const wrapper = document.querySelector('.wrapper');
const homepageProjectImages = document.querySelectorAll('.homepage-projects-wrap div');
const homepageProjectLinks = document.querySelectorAll('.homepage-project-links a');

homepageProjectImages[0].classList.add('active');
homepageProjectLinks[0].classList.add('active');

let i = 0;
const projectCount = homepageProjectImages.length;

function changeImage() {
  i %= projectCount;

  homepageProjectImages.forEach( image => image.classList.remove('active'));
  homepageProjectLinks.forEach( link => link.classList.remove('active'));

  homepageProjectImages[i].classList.add('active');
  homepageProjectLinks[i].classList.add('active');
}

/*********************************************
 Homescreen Loading Video
*********************************************/
const vidLoad = document.querySelector('.vidLoad');
const video = vidLoad.querySelector('video');

wrapper.style.pointerEvents = 'none';
// Let video play for 2 seconds
setTimeout(function(){
  vidLoad.addEventListener('transitionend', e => {
    video.pause();
    vidLoad.style.display = "none";
  });
  vidLoad.classList.remove('visible');
  wrapper.style.pointerEvents = 'all';
  setInterval(function(){
    i++;
    changeImage();
  }, 6000);
}, 2000);




window.onresize = function() {
  const height = window.innerHeight + 'px';
  this.requestAnimationFrame(function(){
    document.body.style.height = height;
    wrapper.style.height = height;
  })
  
}
window.onresize(); // called to initially set the height