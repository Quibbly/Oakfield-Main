
let wedding = '/wedding/';
let child = '/child/';
let special = '/special/';
let headshot = '/headshot/'; 

let galleryImages = [];
let portfolioGallery = document.querySelector('.port-gallery');
let submitValue = '';
const defaultCat = "wedding";

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return defaultCat;
}


setButtonState=(state) => {
   if(state === 'wedding'){
      let selectedButton = document.querySelector(".sort-buttons-container button[1]");
      selectedButton.classList.add("sortButtonSelected");
      console.log('yes');
   }
   else {
      console.log('no');
   }
}

fetchGalleryImages=(categoryInput)=>{
   if(categoryInput){
      submitValue = categoryInput;
   } else {
      submitValue = localStorage.getItem("storageName"); 
   }

   const selectedButtonContainer = document.querySelectorAll(".sort-buttons-container button");
   if(submitValue == 'wedding'){
      selectedButtonContainer[0].focus();
   }
   else if(submitValue == 'baby'){
      selectedButtonContainer[1].focus();
   }
   else if(submitValue == 'headshot'){
      selectedButtonContainer[2].focus();
   }
   else if(submitValue == 'special'){
      selectedButtonContainer[3].focus();
   }
   else{
      selectedButtonContainer[0].focus();
   }

   let galleryImages = [];

   portfolioGallery.classList.remove("loadedImg");
   portfolioGallery.classList.add("loadingImg");
   setTimeout(function()
   { 
      while (portfolioGallery.firstChild) {
         portfolioGallery.removeChild(portfolioGallery.firstChild);
      }
      portfolioGallery.classList.remove("loadingImg");
      portfolioGallery.classList.add("loadedImg");
      fetch('https://aqueous-badlands-87446.herokuapp.com/getgalleryimages', {
         method: 'post',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify({
            "type":submitValue
         })
      })
      .then(response => response.json())
      .then(data => {
         data.resources.forEach(element=>{
            galleryImages.push(element.secure_url)
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
   
            imageBox.classList.add("loadingImg");
            setTimeout(function(){ imageBox.classList.add("loadedImg"); }, 200);

            
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
         function eraseCookie(name) {
            createCookie(name,"",-1);
         }
         eraseCookie('portfolioSubCategory');
      })
      .catch(err=>{
         console.log(err)
      })
   }, 300);
}
