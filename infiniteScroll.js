// getting id from html to JS
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

  // fetching Unsplash API
  let photoArray = [];
 let count = 5;
 const apiKey = '8AdlrtxD9jETXyptPKu-goo1210TW1l4jgPfIk1sFE8';
 const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

 // setting the photo Array
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//  setting the infinite scroll
function imageLoaded() {
 imagesLoaded++;
 console.log(imagesLoaded);
 if (imagesLoaded === totalImages) {
  ready = true;
  console.log('ready =', ready);
  loader.hidden = true;
  count = 30;
 }
}

// helper function to set attributes on DOM Elements
function setAttribute(element, attributes) {
 for (const key in attributes) {
  element.setAttribute(key, attributes[key]);
 }
}

// creates elements for links and photo, Add to DOM
function displayPhoto() {
 imagesLoaded = 0;
 totalImages = photoArray.length;
 console.log('total images ', totalImages);
 imageLoaded();
// Run function for each object in photosArray
photoArray.forEach((photo) => {
 // create <a> to link to unsplash
 const item = document.createElement('a');
 /*
 item.setAttribute('href', photo.links.html);
 item.setAttribute('target', '_blank');
 */
setAttribute(item, {
 href: photo.links.html,
 target: '_blank',
});
 // create <img> for photo
  const image = document.createElement('img');
  /*
 image.setAttribute('src', photo.urls.regular); 
 image.setAttribute('alt', photo.alt_description); 
 image.setAttribute('title', photo.alt_description);
 */
setAttribute(image, {
src: photo.urls.regular,
alt: photo.alt_description,
title: photo.alt_description,
});

image.addEventListener('load', imageLoaded);
 // put <img> inside <a>
 item.appendChild(image);
 //  put <img> & <a> into photoArrays
 imageContainer.appendChild(item);
});
}
 
// look up funtion to fetch your url above
async function getApifromApiUrl() {
 try {
  const response = await fetch(apiUrl);
  photoArray = await response.json();
  displayPhoto();
 } catch (error) {
  // catch error here
 }
}
// check to see if scrolling near the bottom of page, load more photos
window.addEventListener('scroll', () => {
 // console.log('scrolled'); // counts the number of scrolled
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000);
 getApifromApiUrl();
})
getApifromApiUrl();