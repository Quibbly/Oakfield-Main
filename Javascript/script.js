function scrollDown() {
   document.body.scrollTop = 0; // For Safari
   if(screen.width>=1920)
   {
      document.documentElement.scrollTop = 1020; // For Chrome, Firefox, IE and Opera
   }
   
} 

portfolioCategorySet = (category) => {
   //localStorage.setItem('storageName',category);
   document.cookie = 'portfolioCategory='+category+ '; expires= ; path=/; SameSite=None; Secure';
}