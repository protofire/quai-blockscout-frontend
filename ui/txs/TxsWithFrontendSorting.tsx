import React from 'react';

import type { AddressFromToFilter } from 'types/api/address';
import type { Transaction } from 'types/api/transaction';

import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import TxsContent from './TxsContent';
import useTxsSort from './useTxsSort';

type Props = {
  // eslint-disable-next-line max-len
  query:
  | QueryWithPagesResult<'txs_validated' | 'txs_pending'>
  | QueryWithPagesResult<'txs_watchlist'>
  | QueryWithPagesResult<'block_txs'>
  | QueryWithPagesResult<'zkevm_l2_txn_batch_txs'>;
  showBlockInfo?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  filter?: React.ReactNode;
  filterValue?: AddressFromToFilter;
  enableTimeIncrement?: boolean;
  top?: number;
  etxType?: string;
};

const TxsWithFrontendSorting = ({
  filter,
  filterValue,
  query,
  showBlockInfo = true,
  showSocketInfo = true,
  socketInfoAlert,
  socketInfoNum,
  currentAddress,
  enableTimeIncrement,
  top,
  etxType,
}: Props) => {
  const { data, isPlaceholderData, isError, setSortByValue, sorting } = useTxsSort(query);

  const filteredData = data?.items.filter((tx: Transaction) => {
    return !etxType || etxType === tx.etx_type;
  });

  return (
    <TxsContent
      filter={ filter }
      filterValue={ filterValue }
      showBlockInfo={ showBlockInfo }
      showSocketInfo={ showSocketInfo }
      socketInfoAlert={ socketInfoAlert }
      socketInfoNum={ socketInfoNum }
      currentAddress={ currentAddress }
      enableTimeIncrement={ enableTimeIncrement }
      top={ top }
      items={ filteredData }
      isPlaceholderData={ isPlaceholderData }
      isError={ isError }
      setSorting={ setSortByValue }
      sort={ sorting }
      query={ query }
    />
  );
};

export default TxsWithFrontendSorting;
