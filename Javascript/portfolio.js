let portfolioGallery = document.getElementById('port-gallery');
let wedding = './img/portfolioImages/wedding/';
let child = './img/portfolioImages/child/';
let special = './img/portfolioImages/special/';
let headshot = './img/portfolioImages/headshot/';

// SORT BY WEDDING IMAGES
function galSort(amount, type) {
   var galImages = createImageArray(amount,type);
   if(portfolioGallery.querySelector('div')){
      portfolioGallery.removeChild(portfolioGallery.querySelector('div'));
   }
   portfolioGallery.appendChild(makeImagesDiv(galImages));
}

// CREAT A DIV FULL OF IMAGES FROM RELEVENT ARRAY
function makeImagesDiv(array) {
   // Create the containing div
   var imageDiv = document.createElement('div');
   // create each image and place in div
   for(var i = 1;i < array.length;i++){
      var imageEl = document.createElement('img');
      imageEl.src = array[i];
      imageDiv.appendChild(imageEl);
   }
   // Finally, return the div
   return imageDiv;
}

// CREATE AN ARRAY OF IMAGE LOCATIONS
function createImageArray(amount,folderPath){
   let Images = [];
   for(let i = 1; i < amount + 1; i++){
      Images[i] = folderPath + i + '.jpeg'
   }
   return Images;
}

