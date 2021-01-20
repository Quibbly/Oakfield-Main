let portfolioLinkButtons = document.querySelectorAll('.portfolioLink');

// On portfolio link click, set localstore to selected portfolio category.
portfolioLinkButtons.forEach(function(item,index){
   if(item.classList.contains('wedding')){
      item.addEventListener("click", function(){
         localStorage.setItem('portfolio', 'wedding');
      })
   }
   else if(item.classList.contains('baby')){
      item.addEventListener("click", function(){
         localStorage.setItem('portfolio', 'baby');
      })
   }
   else if(item.classList.contains('special')){
      item.addEventListener("click", function(){
         localStorage.setItem('portfolio', 'special');
      })
   }
   else if(item.classList.contains('headshot')){
      item.addEventListener("click", function(){
         localStorage.setItem('portfolio', 'headshot');
      })
   } 
})