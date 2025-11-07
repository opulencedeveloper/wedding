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
      
      currentAudio.play().then(() => {
        hasPlayed.current = true;
        markAsPlaying();
        removeListeners();
      }).catch(() => {
        // Silently handle errors
      });
    };

    const removeListeners = () => {
      const opts = { capture: true };
      document.removeEventListener('click', tryPlay, opts);
      document.removeEventListener('touchstart', tryPlay, opts);
    };

    // Listen to click events (most reliable for autoplay)
    const options = { capture: true };
    document.addEventListener('click', tryPlay, options);
    document.addEventListener('touchstart', tryPlay, options);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
