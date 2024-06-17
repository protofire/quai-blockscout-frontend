import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { TransactionsSortingField, TransactionsSortingValue, UtxoTransaction } from 'types/api/transaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import TheadSticky from 'ui/shared/TheadSticky';

import UtxoTxsTableItem from './UtxoTxsTableItem';

type Props = {
  txs: Array<UtxoTransaction>;
  sort: (field: TransactionsSortingField) => () => void;
  sorting?: TransactionsSortingValue;
  top: number;
  showBlockInfo: boolean;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const UtxoTxsTable = ({
  txs,
  top,
  showBlockInfo,
  showSocketInfo,
  socketInfoAlert,
  socketInfoNum,
  currentAddress,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  const { cutRef, renderedItemsNum } = useLazyRenderedList(txs, !isLoading);

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="950px" size="xs">
        <TheadSticky top={ top }>
          <Tr>
            <Th width="54px"></Th>
            <Th width="180px">Txn hash</Th>
          </Tr>
        </TheadSticky>
        <Tbody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              url={ window.location.href }
              alert={ socketInfoAlert }
              num={ socketInfoNum }
              isLoading={ isLoading }
            />
          ) }
          <AnimatePresence initial={ false }>
            { txs.slice(0, renderedItemsNum).map((item, index) => (
              <UtxoTxsTableItem
                key={ item.hash + (isLoading ? index : '') }
                tx={ item }
                showBlockInfo={ showBlockInfo }
                currentAddress={ currentAddress }
                enableTimeIncrement={ enableTimeIncrement }
                isLoading={ isLoading }
              />
            )) }
          </AnimatePresence>
        </Tbody>
      </Table>
      <div ref={ cutRef }/>
    </AddressHighlightProvider>
  );
};

export default React.memo(UtxoTxsTable);
