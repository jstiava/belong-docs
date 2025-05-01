import { ButtonBase, Link, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface CoverImageProps {
  url: string;
  height: string;
  width: string;
  style?: any;
  children?: any;
  className?: string;
  delay?: number;
  recursive?: boolean;
  caption?: string | null;
  caption_link?: string | null;
}

export default function CoverImage({ className = "", url, height, width, style = {}, children = null, delay = 0, recursive = false, caption = null, caption_link = null }: CoverImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(false);
  }, [url]);

  if (!recursive && !isLoaded) {
    return (
      <></>
    )

  }

  return (
    <div 
      key="loaded"
    className="column snug left"
      style={{
        width: width,
        height: height,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
        transition: `opacity 0.5s ease-in-out ${delay}s
     transform 3s ease-in-out 0.5s
    `,
        ...style,
      }}>
      <div
        className={`${className}`}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: style.backgroundImage ? 'unset' : `url(${url})`,
          backgroundColor: theme.palette.background.paper,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >{children}</div>
    </div>
  );
}
