import { galleryImages } from "../../config/siteConfig";

export default function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {galleryImages.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}
