window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.pageYOffset > 100) {
      header.style.display = 'block'; 
    } else {
      header.style.display = 'none'; 
    }
  });