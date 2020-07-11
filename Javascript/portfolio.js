
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

fetchGalleryImages=(submitValue)=>{
   removeButtonHighlight();
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
