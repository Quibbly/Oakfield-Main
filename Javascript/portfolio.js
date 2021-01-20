const imageGalleryContainer = document.getElementById("image-gallery");
// Get current portfolio cat, if none found default to wedding.
let currentPortfolioCat = localStorage.getItem('portfolio') ? localStorage.getItem('portfolio') : 'wedding';
let galSortButtons = document.querySelectorAll('.gal-sort-button');


// On gallery sort button click, fetch new images and set local store to selected category.
galSortButtons.forEach(function(item,index){
   let category = '';
   if(item.classList.contains('wedding')){
      category = 'wedding'
   }
   else if(item.classList.contains('baby')){
      category = 'baby'
   }
   else if(item.classList.contains('special')){
      category = 'special'
   }
   else if(item.classList.contains('headshot')){
      category = 'headshot'
   }
   item.addEventListener("click", function(){
      fetchGalleryImages(category);
      localStorage.setItem('portfolio', category);
      portSortButtonsHighlight(category);
   })
})


// Fetch gallery images, fired on poage load and gallery sort button click.
fetchGalleryImages = (category) => {
   // Reset gallery images so it can be filled again.
   imageGalleryContainer.innerHTML = '';
   fetch('https://oakfield-photography-api.herokuapp.com/getgalleryimages', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
         "type":category
      })
   })
   .then(response => response.json())
   .then(data => {
      let imageElement = '';
      data.resources.forEach(element => {
         imageElement += `<a href="${element.secure_url}"class="popup-link gal-image-link" ><img class="gal-image" src="${element.secure_url}" /></a>`
      });
      imageGalleryContainer.innerHTML = imageElement;
   })
   .then(data =>{
      // Adds to scroll reveal.
      ScrollReveal().reveal('.gal-image');
      // Adds to magnific popup.
      $('.popup-link').magnificPopup({
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
}
fetchGalleryImages(currentPortfolioCat);


// Highlight currently selected portfolio sort button.
portSortButtonsHighlight = (category) => {
   galSortButtons.forEach(element => {
      // Highlight selected.
      if(element.classList.contains(`${category}`)){
         element.style.backgroundColor = "#EAEAEA";
         element.style.color = "#404447";
      }
      // Remove highlight from others.
      else {
         element.style.backgroundColor = "#404447";
         element.style.color = "#EAEAEA";
      }
   });
}
portSortButtonsHighlight(currentPortfolioCat);