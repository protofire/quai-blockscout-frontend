import { Box, Flex, Text, Image, useColorModeValue, VStack, CircularProgress } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';

import useShards from 'lib/hooks/useShards';
import IconSvg from 'ui/shared/IconSvg';

import type { FeaturedShard } from './ShardsMenuContentDesktop';
import useColors from './useColors';

interface Props extends FeaturedShard {
  isMobile?: boolean;
}

const ShardsMenuLink = ({ id, title, icon, isMobile, invertIconInDarkMode }: Props) => {
  const { shardId, setActiveShardId } = useShards();
  const colors = useColors();
  const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  const style = useColorModeValue({}, invertIconInDarkMode ? darkModeFilter : {});
  const [ isLoading, setIsLoading ] = useState(false);

  const isActive = useMemo(() => {
    return shardId === id;
  }, [ shardId, id ]);

  const iconEl = icon ? (
    <Image w="24px" h="24px" src={ icon } alt={ `${ title } network icon` } style={ style }/>
  ) : (
    <IconSvg
      name="networks/icon-placeholder"
      boxSize="24px"
      color={ colors.iconPlaceholder.default }
    />
  );

  const handlerSetActiveShardId = useCallback(() => {
    setIsLoading(true);
    setActiveShardId(id);
  }, [ id, setActiveShardId ]);

  return (
    <Box as="li" listStyleType="none">
      <Flex
        onClick={ handlerSetActiveShardId }
        px={ isMobile ? 3 : 4 }
        py={ 2 }
        alignItems="center"
        cursor="pointer"
        pointerEvents={ isActive ? 'none' : 'initial' }
        borderRadius="base"
        color={ isActive ? colors.text.active : colors.text.default }
        bgColor={ isActive ? colors.bg.active : colors.bg.default }
        _hover={{ color: isActive ? colors.text.active : colors.text.hover, backgroundColor: colors.bg.active }}
      >
        <VStack>
          { isLoading ? (<CircularProgress size="24px" isIndeterminate color="blue.500" backgroundColor={ colors.bg.active }/>) : iconEl }
          <Text
            fontWeight="500"
            color="inherit"
            fontSize="12px"
            lineHeight={ isMobile ? '20px' : '24px' }
          >
            { title }
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default React.memo(ShardsMenuLink);
