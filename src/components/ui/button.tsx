import { Pressable, type PressableProps, StyleSheet, Text, type ViewStyle } from 'react-native';

import { Icon, type IconName } from './icon';

import { fontFor, useTheme } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  /** Optional leading icon. */
  icon?: IconName;
  /** Stretch to fill the parent width. */
  full?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

// Design uses zinc-900 for the secondary fill — distinct from the surface tokens.
const SECONDARY_BG = '#18181B';

/**
 * The three CTA styles from the kit.
 *  - `primary`   accent fill, dark text, accent glow.
 *  - `secondary` zinc fill, white text, hairline border.
 *  - `ghost`     text-only.
 *
 * Press feedback is a 0.97 scale (per the design's press spec). Text on the
 * primary button is `textOnAccent` — never white.
 */
export function Button({
  label,
  variant = 'primary',
  icon,
  full = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const { colors, radii, shadows, typography } = useTheme();

  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  const contentColor = isPrimary
    ? colors.textOnAccent
    : isGhost
      ? colors.textMuted
      : colors.textPrimary;

  const base: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: radii.lg,
    alignSelf: full ? 'stretch' : 'flex-start',
    width: full ? '100%' : undefined,
  };

  const variantStyle: ViewStyle = isPrimary
    ? { backgroundColor: colors.accent, ...shadows.ctaAccent }
    : isGhost
      ? { backgroundColor: 'transparent' }
      : { backgroundColor: SECONDARY_BG, borderWidth: 1, borderColor: colors.borderStrong };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        base,
        variantStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} color={contentColor} />}
      <Text
        style={{
          ...fontFor('sans', isPrimary ? 'bold' : 'semibold'),
          fontSize: typography.sizes.body,
          color: contentColor,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { transform: [{ scale: 0.97 }] },
  disabled: { opacity: 0.4 },
});
