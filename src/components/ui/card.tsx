import { View, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import type { Radii } from '@/theme';

export interface CardProps extends ViewProps {
  /** Radius token. Design list/hero cards use `xl`; smaller banners use `md`/`lg`. */
  radius?: keyof Radii;
  /** Uniform inner padding in px. */
  padding?: number;
  /** Surface tone. `surface` (default) for cards; `elevated` for raised/dropdown. */
  elevated?: boolean;
  /** Hide the hairline border (e.g. when nesting). */
  borderless?: boolean;
}

/**
 * Base surface container — a solid neutral panel with a hairline border.
 * Depth in this system comes from layered surfaces, not shadows.
 */
export function Card({
  radius = 'xl',
  padding = 16,
  elevated = false,
  borderless = false,
  style,
  ...rest
}: CardProps) {
  const { colors, radii } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
    borderRadius: radii[radius],
    padding,
    borderWidth: borderless ? 0 : 1,
    borderColor: colors.borderSubtle,
  };

  return <View style={[cardStyle, style]} {...rest} />;
}
