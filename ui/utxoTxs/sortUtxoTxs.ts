import type { ExternalTransaction, TransactionsSortingValue } from 'types/api/transaction';

import compareBns from 'lib/bigint/compareBns';

export default function sortTxs(sorting: TransactionsSortingValue | undefined) {
  return function sortingFn(tx1: ExternalTransaction, tx2: ExternalTransaction) {
    switch (sorting) {
      case 'value-desc':
        return compareBns(tx2.value, tx1.value);
      case 'value-asc':
        return compareBns(tx1.value, tx2.value);
      default:
        return 0;
    }
  };
}

export function sortUtxoTxsFromSocket(sorting: TransactionsSortingValue | undefined) {
  if (sorting) {
    return sortTxs(sorting);
  }

  return function sortingFn(tx1: ExternalTransaction, tx2: ExternalTransaction) {
    if (!tx1.timestamp) {
      return -1;
    }

    if (!tx2.timestamp) {
      return 1;
    }

    return tx2.timestamp.localeCompare(tx1.timestamp);
  };
}
