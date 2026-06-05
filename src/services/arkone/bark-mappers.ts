import type { Balance, LightningSendStatus, Movement } from '@secondts/bark-react-native';
import { LightningSendStatus_Tags } from '@secondts/bark-react-native';

import type { SendPaymentResult, WalletBalance, WalletTransaction } from '@/domain';

function parseCounterparty(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as { value?: unknown };
    return typeof parsed.value === 'string' ? parsed.value : raw;
  } catch {
    return raw;
  }
}

function toTimestamp(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? undefined : timestamp;
}

export function mapBarkBalance(balance: Balance): WalletBalance {
  return {
    spendableSats: balance.spendableSats,
    pendingInRoundSats: balance.pendingInRoundSats,
    pendingExitSats: balance.pendingExitSats,
    pendingLightningSendSats: balance.pendingLightningSendSats,
    claimableLightningReceiveSats: balance.claimableLightningReceiveSats,
    pendingBoardSats: balance.pendingBoardSats,
  };
}

export function mapBarkMovement(movement: Movement): WalletTransaction {
  const direction = movement.effectiveBalanceSats >= 0n ? 'in' : 'out';
  const rawCounterparty =
    direction === 'out'
      ? (movement.sentToAddresses[0] ?? '')
      : (movement.receivedOnAddresses[0] ?? '');

  return {
    id: String(movement.id),
    direction,
    amountSats:
      movement.effectiveBalanceSats >= 0n
        ? movement.effectiveBalanceSats
        : -movement.effectiveBalanceSats,
    feeSats: movement.offchainFeeSats,
    status: movement.status,
    counterparty: parseCounterparty(rawCounterparty),
    subsystemName: movement.subsystemName,
    subsystemKind: movement.subsystemKind,
    createdAt: toTimestamp(movement.createdAt) ?? Date.now(),
    updatedAt: toTimestamp(movement.updatedAt) ?? Date.now(),
    completedAt: toTimestamp(movement.completedAt),
  };
}

export function mapLightningSendStatus(status: LightningSendStatus): SendPaymentResult {
  switch (status.tag) {
    case LightningSendStatus_Tags.Paid:
      return {
        type: 'bolt11',
        status: 'paid',
        paymentHash: status.inner.paymentHash,
        preimage: status.inner.preimage,
      };
    case LightningSendStatus_Tags.InProgress:
      return {
        type: 'bolt11',
        status: 'in-progress',
      };
    case LightningSendStatus_Tags.Unknown:
    default:
      return {
        type: 'bolt11',
        status: 'unknown',
      };
  }
}
