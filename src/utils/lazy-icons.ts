/**
 * Lazy-loaded icon imports to reduce initial bundle size
 * Lucide icons are heavy - only load what you need when you need it
 */

import { lazy } from 'react';

// Commonly used icons - load immediately
export { Moon, Sun, Clock, Coffee, Plane, Calculator, Menu, X, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

// Less common icons - lazy load on demand
export const AlertCircle = lazy(() => import('lucide-react').then(m => ({ default: m.AlertCircle })));
export const Info = lazy(() => import('lucide-react').then(m => ({ default: m.Info })));
export const HelpCircle = lazy(() => import('lucide-react').then(m => ({ default: m.HelpCircle })));
export const Check = lazy(() => import('lucide-react').then(m => ({ default: m.Check })));
export const ExternalLink = lazy(() => import('lucide-react').then(m => ({ default: m.ExternalLink })));
export const ArrowRight = lazy(() => import('lucide-react').then(m => ({ default: m.ArrowRight })));
export const ArrowLeft = lazy(() => import('lucide-react').then(m => ({ default: m.ArrowLeft })));
export const Plus = lazy(() => import('lucide-react').then(m => ({ default: m.Plus })));
export const Minus = lazy(() => import('lucide-react').then(m => ({ default: m.Minus })));
export const Settings = lazy(() => import('lucide-react').then(m => ({ default: m.Settings })));
export const Globe = lazy(() => import('lucide-react').then(m => ({ default: m.Globe })));
export const MapPin = lazy(() => import('lucide-react').then(m => ({ default: m.MapPin })));
export const Zap = lazy(() => import('lucide-react').then(m => ({ default: m.Zap })));
export const TrendingUp = lazy(() => import('lucide-react').then(m => ({ default: m.TrendingUp })));
export const TrendingDown = lazy(() => import('lucide-react').then(m => ({ default: m.TrendingDown })));
export const Calendar = lazy(() => import('lucide-react').then(m => ({ default: m.Calendar })));
export const Bell = lazy(() => import('lucide-react').then(m => ({ default: m.Bell })));
export const Heart = lazy(() => import('lucide-react').then(m => ({ default: m.Heart })));
export const Star = lazy(() => import('lucide-react').then(m => ({ default: m.Star })));
export const ThumbsUp = lazy(() => import('lucide-react').then(m => ({ default: m.ThumbsUp })));
export const ThumbsDown = lazy(() => import('lucide-react').then(m => ({ default: m.ThumbsDown })));
export const Download = lazy(() => import('lucide-react').then(m => ({ default: m.Download })));
export const Upload = lazy(() => import('lucide-react').then(m => ({ default: m.Upload })));
export const Copy = lazy(() => import('lucide-react').then(m => ({ default: m.Copy })));
export const Trash = lazy(() => import('lucide-react').then(m => ({ default: m.Trash })));
export const Edit = lazy(() => import('lucide-react').then(m => ({ default: m.Edit })));
export const Eye = lazy(() => import('lucide-react').then(m => ({ default: m.Eye })));
export const EyeOff = lazy(() => import('lucide-react').then(m => ({ default: m.EyeOff })));
export const Lock = lazy(() => import('lucide-react').then(m => ({ default: m.Lock })));
export const Unlock = lazy(() => import('lucide-react').then(m => ({ default: m.Unlock })));
export const User = lazy(() => import('lucide-react').then(m => ({ default: m.User })));
export const Users = lazy(() => import('lucide-react').then(m => ({ default: m.Users })));
export const Mail = lazy(() => import('lucide-react').then(m => ({ default: m.Mail })));
export const Phone = lazy(() => import('lucide-react').then(m => ({ default: m.Phone })));
export const Link = lazy(() => import('lucide-react').then(m => ({ default: m.Link })));
export const Image = lazy(() => import('lucide-react').then(m => ({ default: m.Image })));
export const File = lazy(() => import('lucide-react').then(m => ({ default: m.File })));
export const Folder = lazy(() => import('lucide-react').then(m => ({ default: m.Folder })));
export const Search = lazy(() => import('lucide-react').then(m => ({ default: m.Search })));
export const Filter = lazy(() => import('lucide-react').then(m => ({ default: m.Filter })));
export const SortAsc = lazy(() => import('lucide-react').then(m => ({ default: m.SortAsc })));
export const SortDesc = lazy(() => import('lucide-react').then(m => ({ default: m.SortDesc })));
export const MoreVertical = lazy(() => import('lucide-react').then(m => ({ default: m.MoreVertical })));
export const MoreHorizontal = lazy(() => import('lucide-react').then(m => ({ default: m.MoreHorizontal })));
