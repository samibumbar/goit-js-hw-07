import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>`;
    })
    .join("");
}

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

function applyImageStyles() {
  const img = document.querySelector(".slbImage");
  if (img) {
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.objectFit = "contain";
  }
}

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      applyImageStyles();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

lightbox.on("show.simplelightbox", function () {
  setTimeout(applyImageStyles, 100);
});

// Aplică stiluri la schimbarea imaginii
lightbox.on("change.simplelightbox", function () {
  applyImageStyles();
});
