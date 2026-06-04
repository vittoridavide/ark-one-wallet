import Svg, { Path } from 'react-native-svg';

import { brand } from '@/theme';

/**
 * THE PORTAL — the Ark ecosystem mark. Path values are copied verbatim from the
 * design source; do not reconstruct the arches.
 *
 *  variant="user"     arch opens upward   (teal)   — Ark One personal wallet
 *  variant="merchant" arch opens downward (orange)  — Ark Merchant POS
 *  variant="combined" both arches interlocked       — ecosystem / universal
 */
export type LogoVariant = 'user' | 'merchant' | 'combined';

const USER_PATH = 'M9 33 V21 A11 11 0 0 0 31 21 V33';
const MERCHANT_PATH = 'M9 7  V19 A11 11 0 0 1 31 19 V7';
const COMBINED_MERCHANT = 'M9 5  V15 A11 11 0 0 1 31 15 V5';
const COMBINED_USER = 'M9 35 V25 A11 11 0 0 0 31 25 V35';

const STROKE_WIDTH = 4.5;

export interface LogoProps {
  size?: number;
  variant?: LogoVariant;
  /** Overrides the stroke for `user` / `merchant`. Ignored for `combined`. */
  color?: string;
}

export function Logo({ size = 32, variant = 'user', color }: LogoProps) {
  if (variant === 'combined') {
    return (
      <Svg viewBox="0 0 40 40" width={size} height={size} fill="none">
        <Path
          d={COMBINED_MERCHANT}
          stroke={brand.arkMerchant.base}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={COMBINED_USER}
          stroke={brand.arkOne.base}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  const isMerchant = variant === 'merchant';
  const stroke = color ?? (isMerchant ? brand.arkMerchant.base : brand.arkOne.base);

  return (
    <Svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <Path
        d={isMerchant ? MERCHANT_PATH : USER_PATH}
        stroke={stroke}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
