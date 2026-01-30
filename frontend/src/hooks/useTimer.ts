// ============================================
// TIMER HOOK
// ============================================
// Manages live timer display with second-by-second updates

import { useState, useEffect, useCallback } from 'react';
import { parseISO, differenceInSeconds } from 'date-fns';
import { formatTimerDisplay } from '@/lib/formatters';

interface UseTimerOptions {
  startTime: string; // ISO date-time string
  isRunning: boolean;
}

interface UseTimerReturn {
  elapsedSeconds: number;
  formattedTime: string;
}

/**
 * Hook that provides live elapsed time for a running timer.
 * Updates every second while the timer is running.
 */
export function useTimer({ startTime, isRunning }: UseTimerOptions): UseTimerReturn {
  const calculateElapsed = useCallback(() => {
    const start = parseISO(startTime);
    return Math.max(0, differenceInSeconds(new Date(), start));
  }, [startTime]);

  const [elapsedSeconds, setElapsedSeconds] = useState(calculateElapsed);

  useEffect(() => {
    // Initial calculation
    setElapsedSeconds(calculateElapsed());

    // Only set up interval if timer is running
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds(calculateElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, calculateElapsed]);

  return {
    elapsedSeconds,
    formattedTime: formatTimerDisplay(elapsedSeconds),
  };
}

/**
 * Simpler hook that just formats an elapsed time in minutes.
 * Used for completed entries.
 */
export function useFormattedDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
