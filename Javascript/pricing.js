function reveal(cat) {
   var catBox = document.querySelector("."+cat+"Content");
   if (!catBox.classList.contains(cat+"ContentRevealed")) {
      catBox.classList.remove(cat+"ContentHidden")
      catBox.classList.add(cat+"ContentRevealed")
   } else {
      catBox.classList.remove(cat+"ContentRevealed")
      catBox.classList.add(cat+"ContentHidden")
   }
} 