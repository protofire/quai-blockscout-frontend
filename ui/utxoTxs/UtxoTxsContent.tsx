import { Show, Hide } from '@chakra-ui/react';
import React from 'react';

import type { AddressFromToFilter } from 'types/api/address';
import type { TransactionsSortingField, TransactionsSortingValue, UtxoTransaction } from 'types/api/transaction';

import useIsMobile from 'lib/hooks/useIsMobile';
import AddressCsvExportLink from 'ui/address/AddressCsvExportLink';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';

import TxsHeaderMobile from './UtxoTxsHeaderMobile';
import UtxoTxsList from './UtxoTxsList';
import UtxoTxsTable from './UtxoTxsTable';

const SORT_SEQUENCE: Record<TransactionsSortingField, Array<TransactionsSortingValue | undefined>> = {
  value: [ 'value-desc', 'value-asc', undefined ],
  fee: [ 'fee-desc', 'fee-asc', undefined ],
};

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
  items?: Array<UtxoTransaction>;
  isPlaceholderData: boolean;
  isError: boolean;
  setSorting: (value: TransactionsSortingValue | undefined) => void;
  sort: TransactionsSortingValue | undefined;
}

const UtxoTxsContent = ({
  query,
  filter,
  filterValue,
  showBlockInfo = true,
  showSocketInfo = true,
  socketInfoAlert,
  socketInfoNum,
  currentAddress,
  enableTimeIncrement,
  top,
  items,
  isPlaceholderData,
  isError,
  setSorting,
  sort,
}: Props) => {
  const isMobile = useIsMobile();

  const onSortToggle = React.useCallback((field: TransactionsSortingField) => () => {
    const value = getNextSortValue<TransactionsSortingField, TransactionsSortingValue>(SORT_SEQUENCE, field)(sort);
    setSorting(value);
  }, [ sort, setSorting ]);

  const content = items ? (
    <>
      <Show below="lg" ssr={ false }>
        <UtxoTxsList
          showBlockInfo={ showBlockInfo }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          socketInfoNum={ socketInfoNum }
          isLoading={ isPlaceholderData }
          enableTimeIncrement={ enableTimeIncrement }
          currentAddress={ currentAddress }
          items={ items }
        />
      </Show>
      <Hide below="lg" ssr={ false }>
        <UtxoTxsTable
          txs={ items }
          sort={ onSortToggle }
          sorting={ sort }
          showBlockInfo={ showBlockInfo }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          socketInfoNum={ socketInfoNum }
          top={ top || query.pagination.isVisible ? 80 : 0 }
          currentAddress={ currentAddress }
          enableTimeIncrement={ enableTimeIncrement }
          isLoading={ isPlaceholderData }
        />
      </Hide>
    </>
  ) : null;

  const actionBar = isMobile ? (
    <TxsHeaderMobile
      mt={ -6 }
      sorting={ sort }
      setSorting={ setSorting }
      paginationProps={ query.pagination }
      showPagination={ query.pagination.isVisible }
      filterComponent={ filter }
      linkSlot={ currentAddress ? (
        <AddressCsvExportLink
          address={ currentAddress }
          params={{ type: 'transactions', filterType: 'address', filterValue }}
          isLoading={ query.pagination.isLoading }
        />
      ) : null
      }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ items }
      emptyText="There are no transactions."
      content={ content }
      actionBar={ actionBar }
    />
  );
};

export default UtxoTxsContent;
