import {
  Tr,
  Td,
  VStack,
  Skeleton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { ExternalTransaction } from 'types/api/transaction';

import config from 'configs/app';
import useShards from 'lib/hooks/useShards';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import ExtTxAdditionalInfo from 'ui/extTxs/ExtTxAdditionalInfo';
import AddressFromTo from 'ui/shared/address/AddressFromTo';
import Tag from 'ui/shared/chakra/Tag';
import CurrencyValue from 'ui/shared/CurrencyValue';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';

type Props = {
  tx: ExternalTransaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const ExtTxsTableItem = ({ tx, showBlockInfo, currentAddress, enableTimeIncrement, isLoading }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;
  const timeAgo = useTimeAgoIncrement(tx.timestamp, enableTimeIncrement);
  const { extractShardIdFromAddress } = useShards();
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
        <ExtTxAdditionalInfo tx={ tx } isLoading={ isLoading }/>
      </Td>
      <Td pr={ 4 }>
        <VStack alignItems="start" lineHeight="24px">
          <TxEntity
            hash={ tx.hash }
            shard={ dataTo?.hash && extractShardIdFromAddress(dataTo?.hash) }
            isLoading={ isLoading }
            fontWeight={ 700 }
            noIcon
            maxW="100%"
            truncation="constant_long"
          />
          { tx.timestamp && <Skeleton color="text_secondary" fontWeight="400" isLoaded={ !isLoading }><span>{ timeAgo }</span></Skeleton> }
        </VStack>
      </Td>
      <Td>
        <VStack alignItems="start">
          <Tag colorScheme="red" isLoading={ isLoading }>
            External transaction
          </Tag>
        </VStack>
      </Td>
      <Td whiteSpace="nowrap">
        { tx.method && (
          <Tag colorScheme={ tx.method === 'Multicall' ? 'teal' : 'gray' } isLoading={ isLoading } isTruncated>
            { tx.method }
          </Tag>
        ) }
      </Td>
      { showBlockInfo && (
        <Td>
          { tx.block && (
            <BlockEntity
              isLoading={ isLoading }
              number={ tx.block }
              noIcon
              fontSize="sm"
              lineHeight={ 6 }
              fontWeight={ 500 }
            />
          ) }
        </Td>
      ) }
      <Td>
        <AddressFromTo
          from={ tx.from }
          to={ dataTo }
          current={ currentAddress }
          isLoading={ isLoading }
          mt="2px"
          mode="compact"
        />
      </Td>
      { !config.UI.views.tx.hiddenFields?.value && (
        <Td isNumeric>
          <CurrencyValue value={ tx.value } accuracy={ 8 } isLoading={ isLoading }/>
        </Td>
      ) }
    </Tr>
  );
};

export default React.memo(ExtTxsTableItem);
