
let wedding = '/wedding/';
let child = '/child/';
let special = '/special/';
let headshot = '/headshot/'; 

let galleryImages = [];
let portfolioGallery = document.querySelector('.port-gallery');

fetchGalleryImages=(category)=>{
   let galleryImages = [];
   while (portfolioGallery.firstChild) {
      portfolioGallery.removeChild(portfolioGallery.firstChild);
   }
   
   fetch('https://aqueous-badlands-87446.herokuapp.com/getgalleryimages', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
         "type": category
      })
   })
   .then(response => response.json())
   .then(data => {
      data.resources.forEach(element=>{
         galleryImages.push(element.url)
      })

      for(let i=0;i<galleryImages.length;i++){
         let imageATag = document.createElement('a');
         let imageEl = document.createElement('img');
         let imageBox = document.createElement('div');

         imageATag.href = galleryImages[i];
         imageEl.src = galleryImages[i];


         imageATag.className = "test-popup-link"; 
         imageBox.className = "galImageBox"
         imageEl.className = "galImage";

         imageBox.appendChild(imageATag)

         imageATag.appendChild(imageEl);

         portfolioGallery.appendChild(imageBox)
      }
   })
   .then(data=>{
      $('.test-popup-link').magnificPopup({
         type: 'image',
         // other options
         gallery: {
            // options for gallery
            enabled: true
         },
         zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
               // openerElement is the element on which popup was initialized, in this case its <a> tag
               // you don't need to add "opener" option if this code matches your needs, it's defailt one.
               return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
         }
      });
   })
   .catch(err=>{
      console.log(err)
   })
}
