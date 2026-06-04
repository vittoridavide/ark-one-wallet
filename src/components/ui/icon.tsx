import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Bitcoin,
  Book,
  BookOpen,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  Coffee,
  Cookie,
  Copy,
  Cpu,
  Delete,
  Dumbbell,
  Ellipsis,
  Eye,
  EyeOff,
  FileKey,
  History,
  House,
  Info,
  KeyRound,
  Lock,
  type LucideIcon,
  Music,
  Plus,
  QrCode,
  Radio,
  RefreshCw,
  ScanFace,
  ScanLine,
  ScanQrCode,
  ScrollText,
  Search,
  Send,
  Settings,
  Settings2,
  Share2,
  Shield,
  ShoppingBag,
  Timer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  User,
  Users,
  Utensils,
  Wallet,
  Wifi,
  X,
  Zap,
} from 'lucide-react-native';

import { useTheme } from '@/theme';

/**
 * Curated lucide icon set for the wallet. Keys are the design's kebab-case
 * names; values are the (verified) lucide components. A few design names map to
 * lucide's current spelling: `home → House`, `more → Ellipsis`,
 * `fingerprint → ScanFace`.
 *
 * Keep this map small and intentional — add icons as screens need them rather
 * than importing the whole 1,700-icon set.
 */
export const iconMap = {
  // navigation / chrome
  home: House,
  history: History,
  clock: Clock,
  settings: Settings,
  'settings-2': Settings2,
  wallet: Wallet,
  search: Search,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  x: X,
  plus: Plus,
  check: Check,
  more: Ellipsis,
  info: Info,
  bell: Bell,

  // actions
  'scan-line': ScanLine,
  'scan-qr-code': ScanQrCode,
  'qr-code': QrCode,
  send: Send,
  copy: Copy,
  share: Share2,
  'refresh-cw': RefreshCw,
  eye: Eye,
  'eye-off': EyeOff,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-left': ArrowDownLeft,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,

  // money / network
  zap: Zap,
  bitcoin: Bitcoin,
  wifi: Wifi,

  // security / settings
  shield: Shield,
  lock: Lock,
  'scan-face': ScanFace,
  'key-round': KeyRound,
  timer: Timer,
  'scroll-text': ScrollText,
  'file-key': FileKey,
  cpu: Cpu,
  radio: Radio,
  'triangle-alert': TriangleAlert,

  // learn
  book: Book,
  'book-open': BookOpen,

  // people / merchants
  user: User,
  users: Users,

  // transaction merchant glyphs
  coffee: Coffee,
  'shopping-bag': ShoppingBag,
  utensils: Utensils,
  music: Music,
  dumbbell: Dumbbell,
  briefcase: Briefcase,
  cookie: Cookie,

  // misc
  circle: Circle,
  delete: Delete,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export interface IconProps {
  name: IconName;
  /** Square size in px. Design defaults: 22 (nav), 20 (standard), 16 (compact), 12 (meta). */
  size?: number;
  /** Stroke color. Defaults to the design's neutral icon color (zinc-400). */
  color?: string;
  /** Never change this — the design mandates a uniform 2px stroke. */
  strokeWidth?: number;
}

/**
 * Outline icon. Thin wrapper over lucide that enforces the design's defaults
 * (2px stroke, neutral color) and a typed, curated name set.
 */
export function Icon({ name, size = 20, color, strokeWidth = 2 }: IconProps) {
  const { colors } = useTheme();
  const LucideCmp = iconMap[name];
  return <LucideCmp size={size} color={color ?? colors.textMuted} strokeWidth={strokeWidth} />;
}
