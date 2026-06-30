import { PhotoMoment } from "../types";

interface PhotoGalleryProps {
  photos: PhotoMoment[];
  layout?: "scroll" | "grid";
}

export default function PhotoGallery({ photos, layout = "scroll" }: PhotoGalleryProps) {
  const hasPhotos = photos && photos.length > 0;

  if (!hasPhotos) {
    return (
      <div 
        id="empty-gallery-card"
        className="w-full flex flex-col items-center justify-center p-6 border border-dashed border-[#EDE8DF] rounded-xl text-center"
      >
        <span className="text-xl mb-1" role="img" aria-label="camera">📷</span>
        <p className="font-sans text-[12px] text-brand-text-muted">
          Captured moments will appear here
        </p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div id="grid-photo-gallery" className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="flex flex-col rounded-xl overflow-hidden"
          >
            <div className="w-full aspect-square overflow-hidden bg-neutral-50 border border-[#EDE8DF]/60 rounded-xl">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="py-1.5 px-0.5">
              <p className="font-sans text-[11px] text-brand-text-secondary leading-tight">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      id="scrollable-photo-gallery" 
      className="flex gap-3 overflow-x-auto pb-1 snap-x scrollbar-none"
    >
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="shrink-0 w-[110px] snap-start"
        >
          <div className="w-[110px] h-[110px] bg-neutral-50 rounded-xl overflow-hidden border border-[#EDE8DF]/60">
            <img 
              src={photo.url} 
              alt={photo.caption} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-sans text-[11px] text-brand-text-muted mt-1 leading-tight line-clamp-2">
            {photo.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
