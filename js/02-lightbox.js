import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  navText: ["&lsaquo;", "&rsaquo;"],
  closeText: "&times;",
});

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        alt="${description}"
                    />
                </a>
            </li>
            `;
    })
    .join("");
}
