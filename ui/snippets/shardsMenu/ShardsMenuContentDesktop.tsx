import { PopoverContent, PopoverBody, Text, VStack, HStack } from '@chakra-ui/react';
import React from 'react';

import type { ArrayElement } from 'types/utils';

import useShards from 'lib/hooks/useShards';

import ShardsMenuLink from './ShardsMenuLink';

export const SHARDS_GROUPS = [ 'Cyprus', 'Paxos', 'Hydra' ] as const;
export type ShardGroup = ArrayElement<typeof SHARDS_GROUPS>;

export interface FeaturedShard {
  id: string;
  title: string;
  icon?: string;
  isActive?: boolean;
  invertIconInDarkMode?: boolean;
}

const ShardsMenuPopup = () => {
  const { regionsShards } = useShards();
  // const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');

  const content = (
    <>
      <Text as="h5" fontSize="14px" lineHeight="30px" fontWeight="500">QUAI Network</Text>

      { Object.keys(regionsShards).map((region) => {
        const shards = regionsShards[region];

        return (
          <VStack key={ region } spacing={ 2 } align="end">
            <HStack as="ul" spacing={ 2 } alignItems="stretch">
              { shards
                .map((shard) => (
                  <ShardsMenuLink
                    key={ shard.id }
                    { ...shard }
                  />
                )) }
            </HStack>
          </VStack>
        );
      }) }

    </>
  );

  return (
    <PopoverContent w="302px">
      <PopoverBody>
        { content }
      </PopoverBody>
    </PopoverContent>
  );
};

export default React.memo(ShardsMenuPopup);
