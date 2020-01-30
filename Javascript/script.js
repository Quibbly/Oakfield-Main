function scrollA() {
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 800; // For Chrome, Firefox, IE and Opera
} 



var mainPageImageContainers = document.querySelectorAll('.mainGallImg');
var mainPageImageLinks = document.querySelectorAll('.test-popup-link');
var mainPageImages = [];

fetchMainPageGallery = () =>{
   fetch('https://aqueous-badlands-87446.herokuapp.com/getmainpageimages', {
   method: 'get',
   headers: {'Content-Type' : 'application/json'},
   })
   .then(response => response.json())
   .then(data => {
      data.resources.forEach(element=>{
         mainPageImages.push(element.url)
      })
      for(let i=0;i<mainPageImages.length;i++){
         mainPageImageContainers[i].src=mainPageImages[i]
         mainPageImageLinks[i].href=mainPageImages[i]
      }
   })
   .catch(err=>{
      console.log(err)
   })
}





// fetchGalleryImages('wedding');