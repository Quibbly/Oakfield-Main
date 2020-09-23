// Controls the revealing of album information.
// (cat) is the category to reveal, as provided by relevant button.
function reveal(cat) {
   var catBox = document.querySelector("."+cat+"Content");

   if (!catBox.classList.contains(cat+"ContentRevealed")) {
      catBox.classList.remove(cat+"ContentHidden");
      catBox.classList.add(cat+"ContentRevealed");
      ScrollReveal({ duration: 1600 }).reveal(catBox);
   } 
   else {
      catBox.classList.remove(cat+"ContentRevealed");
      catBox.classList.add(cat+"ContentHidden");
   }
} 