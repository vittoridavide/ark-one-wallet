import type { PaymentDestination } from '@/domain';

const SATS_PER_BTC = 100_000_000;
const BOLT11_PREFIXES = ['lnbcrt', 'lntbs', 'lnbc', 'lntb', 'lnsb'];
const BOLT11_AMOUNT_PATTERN = /^ln(?:bc|tb|bcrt|sb|tbs)(\d+)([munp])?/;

function decodeBolt11AmountSats(invoice: string): bigint | undefined {
  const match = invoice.match(BOLT11_AMOUNT_PATTERN);

  if (!match?.[1]) {
    return undefined;
  }

  const amount = BigInt(match[1]);
  const multiplier = match[2];

  switch (multiplier) {
    case 'm':
      return amount * 100_000n;
    case 'u':
      return amount * 100n;
    case 'n':
      return amount / 10n;
    case 'p':
      return amount / 10_000n;
    default:
      return amount * BigInt(SATS_PER_BTC);
  }
}

function decodeBolt11(invoice: string): PaymentDestination {
  return {
    type: 'bolt11',
    invoice,
    amountSats: decodeBolt11AmountSats(invoice),
  };
}

function decodeBip321(uri: string): PaymentDestination | null {
  try {
    const url = new URL(uri);
    const description =
      url.searchParams.get('description') ?? url.searchParams.get('message') ?? undefined;
    const arkAddress = url.searchParams.get('ark') ?? undefined;
    const lightningInvoice = url.searchParams.get('lightning') ?? undefined;

    if (arkAddress) {
      const amount = url.searchParams.get('amount');

      return {
        type: 'ark',
        address: arkAddress,
        description,
        amountSats: amount ? BigInt(Math.round(Number(amount) * SATS_PER_BTC)) : undefined,
      };
    }

    if (lightningInvoice) {
      return {
        ...decodeBolt11(lightningInvoice.toLowerCase()),
        description,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function decodeDestination(destination: string): PaymentDestination | null {
  const trimmed = destination.trim();

  if (!trimmed) {
    return null;
  }

  const lower = trimmed.toLowerCase();
  const withoutLightningPrefix = lower.startsWith('lightning:')
    ? lower.slice('lightning:'.length)
    : lower;

  if (withoutLightningPrefix.startsWith('ark') || withoutLightningPrefix.startsWith('tark')) {
    return {
      type: 'ark',
      address: withoutLightningPrefix,
    };
  }

  if (withoutLightningPrefix.startsWith('bitcoin:')) {
    return decodeBip321(trimmed);
  }

  if (BOLT11_PREFIXES.some((prefix) => withoutLightningPrefix.startsWith(prefix))) {
    return decodeBolt11(withoutLightningPrefix);
  }

  return null;
}
