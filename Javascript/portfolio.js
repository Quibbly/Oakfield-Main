let portfolioGallery = document.getElementById('port-gallery');
let wedding = '/wedding/';
let child = '/child/';
let special = '/special/';
let headshot = '/headshot/';

// SORT BY WEDDING IMAGES
function galSort(amount, type) {
   var galThumbImages = createImageThumbArray(amount,type);
   var galFullImages = createImageFullArray(amount,type);
   if(portfolioGallery.querySelector('div')){
      portfolioGallery.removeChild(portfolioGallery.querySelector('div'));
   }
   portfolioGallery.appendChild(makeImagesDiv(galThumbImages, galFullImages));
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
      imageATag.appendChild(imageEl);
      imageDiv.appendChild(imageATag);
      // Give lightbox class names
      imageATag.className = "big"; 
      imageDiv.className = "gallery"; 
   }
   // Finally, return the div
   return imageDiv;
}

// CREATE AN ARRAY OF IMAGE LOCATIONS
function createImageThumbArray(amount,folderPath){
   let thumbImages = [];
   for(let i = 1; i < amount + 1; i++){
      thumbImages[i] = './img/thumb/portfolio' + folderPath + '('+ i + ')' + '.jpg'
   }
   return thumbImages;
}

function createImageFullArray(amount,folderPath){
   let fullImages = [];
   for(let i = 1; i < amount + 1; i++){
      fullImages[i] = './img/full/portfolio' + folderPath + '('+ i + ')' + '.jpg'
   }
   return fullImages;
}

