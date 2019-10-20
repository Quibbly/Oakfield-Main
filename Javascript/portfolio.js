let portfolioGallery = document.getElementById('port-gallery');
let wedding = '/wedding/';
let child = '/child/';
let special = '/special/';
let headshot = '/headshot/'; 

// SORT BY WEDDING IMAGES
function galSort(amount, type) {
   if(portfolioGallery.querySelector('div')){
      portfolioGallery.removeChild(portfolioGallery.querySelector('div'));
   }
   var galThumbImages = createImageThumbArray(amount,type);
   var galFullImages = createImageFullArray(amount,type);
   
   portfolioGallery.appendChild(makeImagesDiv(galThumbImages, galFullImages));
   initLightbox();
}

// CREAT A DIV FULL OF IMAGES FROM RELEVENT ARRAY
function makeImagesDiv(thumbArray, fullArray) {
   // Create the containing div
   var imageDiv = document.createElement('div');
   // create each image and place in div
   for(var i = 1;i < thumbArray.length;i++){
      var imageATag = document.createElement('a');
      var imageEl = document.createElement('img');
      imageATag.href = fullArray[i];
      imageEl.src = thumbArray[i];
      imageATag.className = "test-popup-link"; 
      imageDiv.className = "gallery"; 
      imageATag.appendChild(imageEl);
      imageDiv.appendChild(imageATag);
      // Give lightbox class names
      
   }
   // Finally, return the div

   return imageDiv;
}

// CREATE AN ARRAY OF IMAGE LOCATIONS
function createImageThumbArray(amount,folderPath){
   let thumbImages = [];
   for(let i = 1; i < amount + 1; i++){
      thumbImages[i] = './img/thumb/portfolio' + folderPath + ' ('+ i + ')' + '.jpg'
   }
   return thumbImages;
}
function createImageFullArray(amount,folderPath){
   let fullImages = [];
   for(let i = 1; i < amount + 1; i++){
      fullImages[i] = './img/full/portfolio' + folderPath + ' ('+ i + ')' + '.jpg'
   }
   return fullImages;
}


// ADDS LIGHTBOX TO THE NEWLY CREATED IMAGES
function initLightbox() {
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
}