import React, { useState, useEffect } from 'react'

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  urls: string[]
  alt: string
}

/**
 * Renders an image that attempts each URL in `urls` in order,
 * automatically falling back to the next candidate on load error.
 */
export const SmartImage: React.FC<SmartImageProps> = ({ urls, alt, onError, ...rest }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const urlsKey = urls.join('|')

  useEffect(() => {
    setCurrentIndex(0)
  }, [urlsKey])

  const activeSrc = urls[currentIndex] || urls[urls.length - 1] || ''

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (onError) {
      onError(e)
    }
  }

  return <img src={activeSrc} alt={alt} onError={handleError} {...rest} />
}
