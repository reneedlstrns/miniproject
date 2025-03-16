document.addEventListener("DOMContentLoaded", () => {
// Select all photos in the grid
const photos = document.querySelectorAll('.grid-photo');
firstloadingtime = 1;


// Map each photo to its alternate version
const photoMap = {
  "graphics/sec1/1.jpg": "graphics/sec1/1.png",
  "graphics/sec1/2.jpg": "graphics/sec1/2.png",
  "graphics/sec1/3.jpg": "graphics/sec1/3.png",
  "graphics/sec1/4.jpg": "graphics/sec1/4.png",
  "graphics/sec1/5.jpg": "graphics/sec1/5.png",
  "graphics/sec1/6.jpg": "graphics/sec1/6.png",
  "graphics/sec1/7.jpg": "graphics/sec1/7.png",
  "graphics/sec1/8.jpg": "graphics/sec1/8.png",
  "graphics/sec1/9.jpg": "graphics/sec1/9.png"
};

// Function to handle the photo change cycle
const changePhotosOneByOne = (index = 0, phase = "alternate") => {
    if(firstloadingtime == 1){
        setTimeout(() => changePhotosOneByOne(0, phase === "alternate" ? "original" : "alternate"), 100);
        firstloadingtime--;
    }
    if (index >= photos.length) {
    // Restart the cycle with the other phase (alternate -> original or original -> alternate) 
    setTimeout(() => changePhotosOneByOne(0, phase === "alternate" ? "original" : "alternate"), 3000);
    
    return;
  }

  const photo = photos[index];
  const currentSrc = photo.src.split('/').slice(-3).join('/'); // Get relative path

  // Determine the new photo based on the phase
  let newSrc;
  if (phase === "alternate" && photoMap[currentSrc]) {
    newSrc = photoMap[currentSrc]; // Switch to the alternate photo
  } else if (phase === "original") {
    newSrc = Object.keys(photoMap).find(key => photoMap[key] === currentSrc) || currentSrc; // Switch back to the original
  }

  // Apply the photo change
  if (newSrc) {
    photo.classList.add('flip'); // Add flip animation
    setTimeout(() => {
      photo.src = newSrc; // Change the photo
      photo.classList.remove('flip'); // Remove the flip animation
    }, 500); // Match CSS animation duration
  }

   
        setTimeout(() => changePhotosOneByOne(index + 1, phase), 500);
  
  
  // Move to the next photo in the sequence
   // Delay before processing the next photo
};

// Start the cycle with the first photo, switching to alternate photos
changePhotosOneByOne();
});

// Get elements
const popup = document.getElementById('popup');
const popupButton = document.querySelector('.popup-button');
const closeButton = document.getElementById('closeBtn');

// Show the pop-up when the button is clicked
popupButton.addEventListener('click', () => {
  popup.style.display = 'flex'; // Make the pop-up visible
});

// Hide the pop-up when the close button is clicked
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Hide the pop-up when clicking outside the content
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});

// Select all "See More" links
const seeMoreLinks = document.querySelectorAll('.see-more');
// Select all popups
const popups = document.querySelectorAll('.popup-sec2');

// Add click event to each "See More" link
seeMoreLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default link action
    const popupId = link.getAttribute('data-popup'); // Get the pop-up ID
    document.getElementById(popupId).style.display = 'flex'; // Show the corresponding pop-up
  });
});

// Close buttons
const closeButtons = document.querySelectorAll('.close-btn');

// Add click event to close each pop-up
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.popup-sec2').style.display = 'none'; // Hide the closest pop-up
  });
});

// Close the pop-up when clicking outside of the content
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === popup) {
      popup.style.display = 'none'; // Hide the pop-up
    }
  });
});