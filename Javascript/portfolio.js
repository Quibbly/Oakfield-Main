// Links to local folders for corrosponding gallery categories.
// used to path to them.
const wedding = '/wedding/';
const child = '/child/';
const special = '/special/';
const headshot = '/headshot/'; 

let galleryImages = [];
// Empty portfolio div.
let portfolioGallery = document.querySelector('.port-gallery');
let submitValue = '';
// If user loads straight into portfolio,
// will default to wedding category.
const defaultCat = "wedding";

// Reads the category variable cookie, 
// which is set by page loads and portfolio links.
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


// Resets background color and color of all portfolio category buttons.
const selectedButtonContainer = document.querySelectorAll("#sort-buttons-container button");
removeButtonHighlight = () =>{
   selectedButtonContainer[0].style.backgroundColor = "#404447";
   selectedButtonContainer[0].style.color = "#EAEAEA";
   selectedButtonContainer[1].style.backgroundColor = "#404447";
   selectedButtonContainer[1].style.color = "#EAEAEA";
   selectedButtonContainer[2].style.backgroundColor = "#404447";
   selectedButtonContainer[2].style.color = "#EAEAEA";
   selectedButtonContainer[3].style.backgroundColor = "#404447";
   selectedButtonContainer[3].style.color = "#EAEAEA";
}

// Fetches gallery images in selected category.
fetchGalleryImages=(submitValue)=>{
   removeButtonHighlight();
   // Highlight related category button to show its selected.
   if(submitValue == 'wedding'){
      selectedButtonContainer[0].style.backgroundColor = "#EAEAEA";
      selectedButtonContainer[0].style.color = "#404447";
   }
   else if(submitValue == 'baby'){
      selectedButtonContainer[1].style.backgroundColor = "#EAEAEA";
      selectedButtonContainer[1].style.color = "#404447";
   }
   else if(submitValue == 'headshot'){
      selectedButtonContainer[2].style.backgroundColor = "#EAEAEA";
      selectedButtonContainer[2].style.color = "#404447";
   }
   else if(submitValue == 'special'){
      selectedButtonContainer[3].style.backgroundColor = "#EAEAEA";
      selectedButtonContainer[3].style.color = "#404447";
   }
   else{
      selectedButtonContainer[0].focus();
   }

   // Reset gallery images so it can be filled again.
   let galleryImages = [];

   // Hide images, will be revealed slowy after load.
   portfolioGallery.classList.remove("loadedImg");
   portfolioGallery.classList.add("loadingImg");

   setTimeout(function()
   { 
      // Remove all images currently inside galleryImages.
      while (portfolioGallery.firstChild) {
         portfolioGallery.removeChild(portfolioGallery.firstChild);
      }
      portfolioGallery.classList.remove("loadingImg");
      portfolioGallery.classList.add("loadedImg");

      // Fetch new images from server.
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
            ScrollReveal().reveal('.galImage'); 
         }
      })
      .then(data=>{
         $('.test-popup-link').magnificPopup({
            type: 'image',
            gallery: {
               enabled: true
            },
            zoom: {
               enabled: true,
               duration: 300,
               easing: 'ease-in-out', 
               opener: function(openerElement) {
                  return openerElement.is('img') ? openerElement : openerElement.find('img');
               }
            }
         });
      })
      .catch(err=>{
         console.log(err)
      })
   }, 300);
}
