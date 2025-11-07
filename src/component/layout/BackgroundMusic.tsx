'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;

    const tryPlay = () => {
      console.log('🎵 User interaction detected (scroll/click)!');
      
      if (hasPlayed.current) {
        console.log('⏭️ Music already played, skipping');
        return;
      }
      
      const currentAudio = audioRef.current;
      if (!currentAudio) {
        console.log('⚠️ Audio element not found');
        return;
      }
      
      // If already playing, mark as played and remove listener
      if (!currentAudio.paused) {
        console.log('✅ Music already playing');
        hasPlayed.current = true;
        removeListeners();
        return;
      }
      
      console.log('▶️ Attempting to play music...', {
        readyState: currentAudio.readyState,
        paused: currentAudio.paused
      });
      
      currentAudio.play().then(() => {
        console.log('✅ Music started successfully!');
        hasPlayed.current = true;
        removeListeners();
      }).catch((err) => {
        // Don't log NotAllowedError for scroll events
        if (err.name !== 'NotAllowedError') {
          console.log('❌ Play failed:', err.name, err.message);
        }
      });
    };

    const removeListeners = () => {
      const opts = { capture: true };
      window.removeEventListener('wheel', tryPlay, opts);
      window.removeEventListener('scroll', tryPlay, opts);
      document.removeEventListener('wheel', tryPlay, opts);
      document.removeEventListener('scroll', tryPlay, opts);
      document.removeEventListener('click', tryPlay, opts);
      document.removeEventListener('touchstart', tryPlay, opts);
    };

    // Listen to both scroll and click events
    // Click events are more reliable for autoplay, but scroll is preferred
    // Remove passive: true so scroll events count as user gestures
    const options = { capture: true };
    
    console.log('🎵 Setting up scroll and click listeners...');
    
    // Scroll events (without passive so they count as user gestures)
    window.addEventListener('wheel', tryPlay, options);
    window.addEventListener('scroll', tryPlay, options);
    document.addEventListener('wheel', tryPlay, options);
    document.addEventListener('scroll', tryPlay, options);
    
    // Click events as fallback (these always work for autoplay)
    document.addEventListener('click', tryPlay, options);
    document.addEventListener('touchstart', tryPlay, options);

    return removeListeners;
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/assets/audio/wedding-music.mp3"
      preload="auto"
      playsInline
      loop
    />
  );
}
