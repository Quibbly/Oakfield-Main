function scrollA() {
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 1000; // For Chrome, Firefox, IE and Opera
} 

portfolioCategorySet = (category) => {
   //localStorage.setItem('storageName',category);
   document.cookie = 'portfolioCategory='+category+ '; expires= ; path=/; SameSite=None; Secure';
}

document.addEventListener("DOMContentLoaded", function() {
   var lazyloadImages = document.querySelectorAll("img.mainGallImg");    
   var lazyloadThrottleTimeout;

   function lazyload () {
      if(lazyloadThrottleTimeout) {
         clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
         var scrollTop = window.pageYOffset;
         lazyloadImages.forEach(function(img) {
               if(img.offsetTop < (window.innerHeight + scrollTop)) {
               img.src = img.dataset.src;
               img.classList.remove('lazy');
               }
         });
         if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
         }
      }, 20);
   }
   
   document.addEventListener("scroll", lazyload);
   window.addEventListener("resize", lazyload);
   window.addEventListener("orientationChange", lazyload);
});