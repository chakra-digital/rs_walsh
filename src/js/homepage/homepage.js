const vidLoad = document.querySelector('.vidLoad');

body.style.pointerEvents = 'none';

const homepageProjectImages = document.querySelectorAll('.homepage-projects div');
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

setTimeout(function(){
  vidLoad.classList.remove('visible');
  body.removeAttribute('style');
  setInterval(function(){
    i++;
    changeImage();
  }, 6000);
}, 2000);


const containerViewport = document.querySelector('.container-viewport');

window.onresize = function() {
  const height = window.innerHeight + 'px';
  document.body.style.height = height;
  containerViewport.style.height = height;
}
window.onresize(); // called to initially set the height.