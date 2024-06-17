import {
  Tr,
  Td,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { UtxoTransaction } from 'types/api/transaction';

import TxEntity from 'ui/shared/entities/tx/TxEntity';
import UtxoTxAdditionalInfo from 'ui/utxoTxs/UtxoTxAdditionalInfo';

type Props = {
  tx: UtxoTransaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const UtxoTxsTableItem = ({ tx, isLoading }: Props) => {
  return (
    <Tr
      as={ motion.tr }
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={ tx.hash }
    >
      <Td pl={ 4 }>
        <UtxoTxAdditionalInfo tx={ tx } isLoading={ isLoading }/>
      </Td>
      <Td pr={ 4 }>
        <VStack alignItems="start" lineHeight="24px">
          <TxEntity
            hash={ tx.hash }
            isLoading={ isLoading }
            fontWeight={ 700 }
            noIcon
            maxW="100%"
            truncation="constant_long"
          />
        </VStack>
      </Td>
    </Tr>
  );
};

export default React.memo(UtxoTxsTableItem);
