import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryItemClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
            `;
    })
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryImage = event.target.classList.contains("gallery__image");

  if (!isGalleryImage) {
    return;
  }

  const imageUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
        <img src="${imageUrl}" style="display: block; width: calc(100% ); max-width: 1140px; margin-top: 70px;">
    `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
