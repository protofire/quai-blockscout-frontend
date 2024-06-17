import React from 'react';

import type { AddressFromToFilter } from 'types/api/address';

import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import useTxsSort from './useUtxoTxsSort';
import UtxoTxsContent from './UtxoTxsContent';

type Props = {
  // eslint-disable-next-line max-len
  query: QueryWithPagesResult<'block_utxo_txs'>;
  showBlockInfo?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  filter?: React.ReactNode;
  filterValue?: AddressFromToFilter;
  enableTimeIncrement?: boolean;
  top?: number;
}

const UtxoTxsWithFrontendSorting = ({
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
}: Props) => {
  const { data, isPlaceholderData, isError, setSortByValue, sorting } = useTxsSort(query);

  return (
    <UtxoTxsContent
      filter={ filter }
      filterValue={ filterValue }
      showBlockInfo={ showBlockInfo }
      showSocketInfo={ showSocketInfo }
      socketInfoAlert={ socketInfoAlert }
      socketInfoNum={ socketInfoNum }
      currentAddress={ currentAddress }
      enableTimeIncrement={ enableTimeIncrement }
      top={ top }
      items={ data?.items }
      isPlaceholderData={ isPlaceholderData }
      isError={ isError }
      setSorting={ setSortByValue }
      sort={ sorting }
      query={ query }
    />
  );
};

export default UtxoTxsWithFrontendSorting;
