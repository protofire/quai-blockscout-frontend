import type { ArrayElement } from 'types/utils';

export const BLOCK_FIELDS_IDS = [
  'burnt_fees',
  'total_reward',
  'nonce',
  'miner',
  'totalEntropy',
  'manifestHash',
  'extRollupRootHash',
  'evmRoot',
  'utxoRoot',
  'etxSetHash',
  'parentUncledSubDeltaS',
  'efficiencyScore',
  'thresholdCount',
  'expansionNumber',
  'etxEligibleSlices',
  'primeTerminus',
  'interlinkRootHash',
  'uncledS',
  'interlinkHashes',
] as const;

export type BlockFieldId = ArrayElement<typeof BLOCK_FIELDS_IDS>;
