import type { ArrayElement } from 'types/utils';

import type { IconName } from 'ui/shared/IconSvg';

export const SUPPORTED_WALLETS = [
  'pelagus',
  'metamask',
  'coinbase',
  'token_pocket',
] as const;

export type WalletType = ArrayElement<typeof SUPPORTED_WALLETS>;

export interface WalletInfo {
  name: string;
  icon: IconName;
}
