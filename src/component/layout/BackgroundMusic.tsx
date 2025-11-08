'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.08;

    // Clear localStorage flag on mount (page refresh = new session)
    // This ensures music can play after refresh
    try {
      localStorage.removeItem('backgroundMusicPlaying');
    } catch (e) {
      // localStorage might not be available
    }

    // Check if another tab is already playing
    const checkOtherTabs = () => {
      try {
        const isPlaying = localStorage.getItem('backgroundMusicPlaying');
        if (isPlaying === 'true') {
          if (!audio.paused) {
            audio.pause();
          }
          return true;
        }
      } catch (e) {
        // localStorage might not be available
      }
      return false;
    };

    // Mark this tab as playing
    const markAsPlaying = () => {
      try {
        localStorage.setItem('backgroundMusicPlaying', 'true');
      } catch (e) {
        // localStorage might not be available
      }
    };

    // Listen for changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'backgroundMusicPlaying' && e.newValue === 'true') {
        if (!audio.paused) {
          audio.pause();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Check on load if another tab is playing
    if (checkOtherTabs()) {
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }

    const tryPlay = () => {
      if (hasPlayed.current) return;
      
      // Check if another tab is playing
      if (checkOtherTabs()) return;
      
      const currentAudio = audioRef.current;
      if (!currentAudio) return;
      
      // If already playing, mark as played
      if (!currentAudio.paused) {
        hasPlayed.current = true;
        markAsPlaying();
        removeListeners();
        return;
      }
      
      // Try to play immediately (must be in user gesture context)
      const playPromise = currentAudio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasPlayed.current = true;
            markAsPlaying();
            removeListeners();
          })
          .catch((error) => {
            // Only log if it's not a NotAllowedError (autoplay restriction)
            if (error.name !== 'NotAllowedError') {
              console.error('Error playing background music:', error);
            }
          });
      }
    };

    const removeListeners = () => {
      const opts = { capture: true };
      document.removeEventListener('click', tryPlay, opts);
      document.removeEventListener('touchstart', tryPlay, opts);
      document.removeEventListener('keydown', tryPlay, opts);
      window.removeEventListener('scroll', tryPlay, opts);
      window.removeEventListener('wheel', tryPlay, opts);
      window.removeEventListener('mousemove', tryPlay, opts);
    };

    // Listen to multiple user interaction events for better autoplay support
    const options = { capture: true };
    document.addEventListener('click', tryPlay, options);
    document.addEventListener('touchstart', tryPlay, options);
    document.addEventListener('keydown', tryPlay, options);
    window.addEventListener('scroll', tryPlay, options);
    window.addEventListener('wheel', tryPlay, options);
    window.addEventListener('mousemove', tryPlay, { once: true, capture: true });

    // Clear flag on page unload (refresh/navigation)
    const handleBeforeUnload = () => {
      try {
        localStorage.removeItem('backgroundMusicPlaying');
      } catch (e) {
        // localStorage might not be available
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      removeListeners();
      // Clear the flag when component unmounts
      try {
        if (hasPlayed.current) {
          localStorage.removeItem('backgroundMusicPlaying');
        }
      } catch (e) {
        // localStorage might not be available
      }
    };
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
