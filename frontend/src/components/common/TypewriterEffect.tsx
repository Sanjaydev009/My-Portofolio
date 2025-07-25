import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

interface TypewriterEffectProps extends Omit<TypographyProps, 'children'> {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  cursor = true,
  cursorChar = '|',
  ...typographyProps
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          // Finished typing, start pause before deleting
          setTimeout(() => {
            if (loop || currentTextIndex < texts.length - 1) {
              setIsDeleting(true);
            }
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => {
            if (prevIndex === texts.length - 1) {
              return loop ? 0 : prevIndex;
            }
            return prevIndex + 1;
          });
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, pauseDuration, loop]);

  // Cursor blinking effect - optimized with longer intervals
  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 800); // Increased from 500 to 800 for better performance

      return () => clearInterval(cursorInterval);
    }
  }, [cursor]);

  return (
    <Typography {...typographyProps}>
      {currentText}
      {cursor && (
        <span style={{ opacity: showCursor ? 1 : 0 }}>
          {cursorChar}
        </span>
      )}
    </Typography>
  );
};

export default TypewriterEffect;
