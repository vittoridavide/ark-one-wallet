import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from 'react-native';

import { withAlpha } from './color';
import { Icon, type IconName } from './icon';

import { useTheme } from '@/theme';

export interface IconButtonProps {
  name: IconName;
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Square tappable icon affordance — the chrome button used in nav bars, cards,
 * and rows. White-5 fill, hairline border, neutral glyph.
 */
export function IconButton({
  name,
  onPress,
  size = 36,
  iconSize = 18,
  color,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  const { colors, radii } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? name}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        {
          width: size,
          height: size,
          borderRadius: radii.sm,
          backgroundColor: withAlpha('#FFFFFF', 0.05),
          borderColor: colors.borderSubtle,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon name={name} size={iconSize} color={color ?? colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
