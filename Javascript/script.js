function scrollDown() {
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 1030; // For Chrome, Firefox, IE and Opera
} 

portfolioCategorySet = (category) => {
   //localStorage.setItem('storageName',category);
   document.cookie = 'portfolioCategory='+category+ '; expires= ; path=/; SameSite=None; Secure';
}