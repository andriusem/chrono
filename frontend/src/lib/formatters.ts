// ============================================
// DATE AND TIME FORMATTERS
// ============================================
// Consistent formatting functions for the entire app

import { format, formatDistanceToNow, parseISO, differenceInMinutes } from 'date-fns';

/**
 * Format a duration in minutes as "Xh Ym" (e.g., "2h 30m")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 1) return '0m';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Format a duration that may be negative (e.g., "-1h 15m")
 */
export function formatSignedDuration(minutes: number): string {
  const sign = minutes < 0 ? '-' : '';
  return `${sign}${formatDuration(Math.abs(minutes))}`;
}

/**
 * Format a duration for the timer display as "HH:MM:SS"
 */
export function formatTimerDisplay(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
}

/**
 * Format time as "9:00 AM" or "14:30"
 */
export function formatTime(dateOrString: Date | string, use24Hour = false): string {
  const date = typeof dateOrString === 'string' ? parseISO(dateOrString) : dateOrString;
  return format(date, use24Hour ? 'HH:mm' : 'h:mm a');
}

/**
 * Format date as "Jan 30, 2026"
 */
export function formatDate(dateOrString: Date | string): string {
  const date = typeof dateOrString === 'string' ? parseISO(dateOrString) : dateOrString;
  return format(date, 'MMM d, yyyy');
}

/**
 * Format date as "Monday, January 30"
 */
export function formatDateLong(dateOrString: Date | string): string {
  const date = typeof dateOrString === 'string' ? parseISO(dateOrString) : dateOrString;
  return format(date, 'EEEE, MMMM d');
}

/**
 * Format as "Today", "Yesterday", or date
 */
export function formatRelativeDate(dateOrString: Date | string): string {
  const date = typeof dateOrString === 'string' ? parseISO(dateOrString) : dateOrString;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
    return 'Today';
  }
  if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
    return 'Yesterday';
  }
  return formatDate(date);
}

/**
 * Format time range as "9:00 AM - 11:30 AM"
 */
export function formatTimeRange(start: string, end?: string): string {
  const startFormatted = formatTime(start);
  if (!end) return `${startFormatted} - ongoing`;
  return `${startFormatted} - ${formatTime(end)}`;
}

/**
 * Calculate duration between two ISO date strings in minutes
 */
export function calculateDurationMinutes(start: string, end?: string): number {
  const startDate = parseISO(start);
  const endDate = end ? parseISO(end) : new Date();
  return differenceInMinutes(endDate, startDate);
}

/**
 * Format "2 hours ago", "5 minutes ago"
 */
export function formatTimeAgo(dateOrString: Date | string): string {
  const date = typeof dateOrString === 'string' ? parseISO(dateOrString) : dateOrString;
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getTodayDateString();
}
