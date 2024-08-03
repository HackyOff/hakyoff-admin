import { svgs } from '@/utils/image-exporter';
import { useState } from 'react';

interface Image {
  src: string;
  className: string;
  alt: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const LazyImage = ({ src, alt, className, placeholder, style }: Image) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={className} style={style}>
      {!loaded && (
        <div
          style={{ background: `url(${placeholder ? placeholder : svgs.bg_placeholder_svg}) center center`, backgroundSize: 'cover' }}
          className="h-full animate-pulse w-full rounded-lg"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-lg ${loaded ? 'block' : 'hidden'}`}
        onLoad={handleImageLoad}
        style={{ display: 'none' }} // hide the img tag, we only need it for loading
      />
      {loaded && (
        <div
          style={{ background: `url(${src}) center center`, backgroundSize: 'cover' }}
          className=" h-full w-full rounded-lg"
        />
      )}
    </div>
  );
};
