import {
  type WalletLike,
  type WalletNotification,
  WalletNotification_Tags,
  WalletNotifications,
} from '@secondts/bark-react-native';

import type { WalletTransaction } from '@/domain';

import { mapBarkMovement } from './bark-mappers';

export type WalletNotificationHandlers = {
  onMovementCreated?: (transaction: WalletTransaction) => void;
  onMovementUpdated?: (transaction: WalletTransaction) => void;
  onChannelLagging?: () => void;
};

export function subscribeToWalletNotifications(
  wallet: WalletLike,
  handlers: WalletNotificationHandlers,
) {
  const notifications = new WalletNotifications(wallet);

  return notifications.subscribe((event: WalletNotification) => {
    switch (event.tag) {
      case WalletNotification_Tags.MovementCreated:
        handlers.onMovementCreated?.(mapBarkMovement(event.inner.movement));
        break;
      case WalletNotification_Tags.MovementUpdated:
        handlers.onMovementUpdated?.(mapBarkMovement(event.inner.movement));
        break;
      case WalletNotification_Tags.ChannelLagging:
        handlers.onChannelLagging?.();
        break;
    }
  });
}
