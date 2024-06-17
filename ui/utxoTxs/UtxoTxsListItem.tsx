import {
  Flex,
} from '@chakra-ui/react';
import React from 'react';

import type { UtxoTransaction } from 'types/api/transaction';

import TxEntity from 'ui/shared/entities/tx/TxEntity';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import UtxoTxAdditionalInfo from 'ui/utxoTxs/UtxoTxAdditionalInfo';

type Props = {
  tx: UtxoTransaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const UtxoTxsListItem = ({ tx, isLoading }: Props) => {
  return (
    <ListItemMobile display="block" width="100%" isAnimated key={ tx.hash }>
      <Flex justifyContent="space-between" mt={ 4 }>
        <UtxoTxAdditionalInfo tx={ tx } isMobile isLoading={ isLoading }/>
      </Flex>
      <Flex justifyContent="space-between" lineHeight="24px" mt={ 3 } alignItems="center">
        <TxEntity
          isLoading={ isLoading }
          hash={ tx.hash }
          truncation="constant_long"
          fontWeight="700"
        />
      </Flex>
    </ListItemMobile>
  );
};

export default React.memo(UtxoTxsListItem);
