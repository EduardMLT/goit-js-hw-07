import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// ************************************

const galleryContainer = document.querySelector('.gallery');

const galleryElements = createGalleryElements(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryElements);

galleryContainer.addEventListener('click', galleryContainerClick);

function createGalleryElements(galleryItems) {
  return galleryItems.map(({ preview, original, description}) => {
      return `
    <li class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img class="gallery__image" 
     src="${preview}" 
     data-source="${original}"
     alt="${description}" 
     width = 200 
     height = 120
     />
   </a>
</li>
    `;
    })
    .join('');
}


function galleryContainerClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        console.log('це не - IMG');
        return;
      };
      console.log('це - IMG'); 
      removeActivGalleryLink();
      let activeLink = addActivGalleryLink(evt.target);           
      const instance = basicLightbox.create(`       
        <img src="${activeLink}">
    `);
    instance.show();
};

// треба якось передати поточну картинку ...
// не можу передати з ф => ф . тому роблю все в 
// f galleryContainerClick

function removeActivGalleryLink() {
  const currentActiveLink = document.querySelector('.gallery__link-aktiv');

  if (currentActiveLink) {
    currentActiveLink.classList.remove('gallery__link-aktiv');
  }
}

function addActivGalleryLink(link) {
  link.classList.add('gallery__link-aktiv');
  const activeLink = link.dataset.source;  
  return activeLink ;
}