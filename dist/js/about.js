/*!
 * rs_walsh v0.0.1
 * A luxury landscaping company based in Florida
 * (c) 2019 Matt McDonald
 * MIT License
 * http://link-to-your-git-repo.com
 */

/********************************
 About Page Scripts
********************************/

const inpageNavLinks = document.querySelectorAll('.left-nav a');

inpageNavLinks.forEach(link => link.addEventListener('click', (function(){
  inpageNavLinks.forEach(link => link.parentElement.classList.remove('active'))
  this.parentElement.classList.add('active')
})));


// Pause / Play video based on scroll position
const vid = document.querySelector('video');
const vidBottom = vid.getBoundingClientRect().bottom;

window.addEventListener('scroll', (function(e){
  window.requestAnimationFrame((function(){

    let scrollPos = window.scrollY;
    scrollPos > vidBottom ? vid.pause() : vid.play();
    
  }));
}));