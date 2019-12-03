/********************************
 About Page Scripts
********************************/

const inpageNavLinks = document.querySelectorAll('.inpage-nav a');

inpageNavLinks.forEach(link => link.addEventListener('click', function(){
  inpageNavLinks.forEach(link => link.parentElement.classList.remove('active'))
  this.parentElement.classList.add('active')
}));