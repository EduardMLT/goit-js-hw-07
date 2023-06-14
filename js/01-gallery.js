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
          return;
      };
      removeActivGalleryLink();
      let activeLink = addActivGalleryLink(evt.target);           
      const instance = basicLightbox.create(`       
        <img src="${activeLink}">
    `);
    instance.show();

    document.addEventListener('keydown', event => {
        if (event.code !== 'Escape') {
        alert('вихід по - Escape');
        return;
      };
      instance.close(() => alert('lightbox завершив роботу'));
      removeActivGalleryLink();
    });
};


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

