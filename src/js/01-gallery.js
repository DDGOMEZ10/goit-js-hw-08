

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

import { galleryItems } from './gallery-items.js';


console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

console.log(galleryContainer);

function createGallery(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
            
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join(" ");
}

galleryContainer.insertAdjacentHTML("afterbegin", createGallery(galleryItems));

galleryContainer.addEventListener("click", openModal);

function openModal(e) {
  e.preventDefault();
}

var lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: "250ms",
});

