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
const homepageMain = document.getElementById('homepage-main');
const projSlideDuration = 5000;

function initChangeTimer() {
  setInterval(function(){
    i++;
    changeImage();
  }, projSlideDuration);
}

if (sessionStorage.getItem('videoHasLoadedOnce')) {
  // Hide video immediately
  vidLoad.style.display = "none";
  // Start image change timer
  initChangeTimer();

} else {
  homepageMain.style.display = "none";
  wrapper.style.pointerEvents = "none";
  // Let video play for 2 seconds
  setTimeout(function(){
    vidLoad.addEventListener('transitionend', e => {
      video.pause();
      vidLoad.style.display = "none";
    });
    // Fade video out (relies on css)
    vidLoad.classList.remove('visible');
    wrapper.style.pointerEvents = 'all';
    // Start image change timer
    initChangeTimer();
  }, 2000);

  // Display homepage content after video disappears
  setTimeout(function(){
    homepageMain.style.display = 'block';
  }, 1999);
  sessionStorage.setItem('videoHasLoadedOnce', true);
}




