import { useColorModeValue, Button, forwardRef, chakra } from '@chakra-ui/react';
import React from 'react';

import useShards from 'lib/hooks/useShards';
import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  isMobile?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ShardsMenuButton = ({ isMobile, isActive, onClick, className }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { shard } = useShards();
  const defaultIconColor = useColorModeValue('gray.600', 'gray.400');
  const bgColorMobile = useColorModeValue('blue.50', 'gray.800');
  const iconColorMobile = useColorModeValue('blue.700', 'blue.50');

  return (
    <Button
      className={ className }
      variant="unstyled"
      display="inline-flex"
      alignItems="center"
      ref={ ref }
      size="xs"
      borderRadius="base"
      backgroundColor={ isActive ? bgColorMobile : 'none' }
      onClick={ onClick }
      aria-label="Network menu"
      aria-roledescription="menu"
    >
      { shard?.title }
      <IconSvg
        name="networks"
        width="36px"
        height="36px"
        padding="10px"
        color={ isActive ? iconColorMobile : defaultIconColor }
        _hover={{ color: isMobile ? undefined : 'link_hovered' }}
        cursor="pointer"
        { ...getDefaultTransitionProps({ transitionProperty: 'margin' }) }
      />
    </Button>
  );
};

export default chakra(forwardRef(ShardsMenuButton));
