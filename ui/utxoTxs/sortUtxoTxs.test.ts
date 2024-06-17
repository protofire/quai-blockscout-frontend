import type { ExternalTransaction } from 'types/api/transaction';

import sortUtxoTxs, { sortUtxoTxsFromSocket } from './sortUtxoTxs';

describe('sortUtxoTxs', () => {
  it('should sort transactions by value in descending order', () => {
    const txs = [
      { value: '42' },
      { value: '11' },
      { value: '24' },
    ] as Array<ExternalTransaction>;
    const result = txs.sort(sortUtxoTxs('value-desc'));
    expect(result).toEqual([
      { value: '42' },
      { value: '24' },
      { value: '11' },
    ]);
  });

  it('should sort transactions by value in ascending order', () => {
    const txs = [
      { value: '42' },
      { value: '11' },
      { value: '24' },
    ] as Array<ExternalTransaction>;
    const result = txs.sort(sortUtxoTxs('value-asc'));
    expect(result).toEqual([
      { value: '11' },
      { value: '24' },
      { value: '42' },
    ]);
  });
});

describe('sortUtxoTxsFromSocket', () => {
  it('should sort transaction by age in ascending order if sorting is not provided', () => {
    const txs = [
      { timestamp: '2022-11-01T12:33:00Z' },
      { timestamp: '2022-11-01T12:00:00Z' },
      { timestamp: null },
      { timestamp: '2022-11-03T03:03:00Z' },
    ] as Array<ExternalTransaction>;
    const result = txs.sort(sortUtxoTxsFromSocket(undefined));
    expect(result).toEqual([
      { timestamp: null },
      { timestamp: '2022-11-03T03:03:00Z' },
      { timestamp: '2022-11-01T12:33:00Z' },
      { timestamp: '2022-11-01T12:00:00Z' },
    ]);
  });
});
