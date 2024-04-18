import { Popover, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';

import ShardsMenuButton from './ShardsMenuButton';
import ShardsMenuContentDesktop from './ShardsMenuContentDesktop';
import useShardsMenu from './useShardsMenu';
interface Props {
  isCollapsed?: boolean;
}

const ShardsMenu = ({ isCollapsed }: Props) => {
  const menu = useShardsMenu();

  return (
    <Popover openDelay={ 300 } placement="bottom-end" gutter={ 8 } isLazy isOpen={ menu.isOpen } onClose={ menu.onClose }>
      <PopoverTrigger>
        <ShardsMenuButton
          marginLeft="auto"
          overflow="hidden"
          width={{ base: 'auto', lg: isCollapsed === false ? 'auto' : '0px', xl: isCollapsed ? '0px' : 'auto' }}
          isActive={ menu.isOpen }
          onClick={ menu.onToggle }
        />
      </PopoverTrigger>
      <ShardsMenuContentDesktop/>
    </Popover>
  );
};

export default React.memo(ShardsMenu);
