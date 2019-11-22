/*!
 * rs_walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */

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

wrapper.style.pointerEvents = 'none';
// Let video play for 2 seconds
setTimeout((function(){
  vidLoad.addEventListener('transitionend', e => {
    video.pause();
    vidLoad.style.display = "none";
  });
  vidLoad.classList.remove('visible');
  wrapper.style.pointerEvents = 'all';
  setInterval((function(){
    i++;
    changeImage();
  }), 6000);
}), 2000);

setTimeout((function(){
  homepageMain.style.display = 'block';
}), 1999)


