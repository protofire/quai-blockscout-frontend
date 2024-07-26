import { useColorModeValue } from '@chakra-ui/react';

export default function useColors() {
  return {
    text: {
      'default': useColorModeValue('red.600', 'red.400'),
      active: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),
      hover: useColorModeValue('red.600', 'link_hovered'),
    },
    iconPlaceholder: {
      'default': useColorModeValue('blackAlpha.100', 'whiteAlpha.300'),
    },
    bg: {
      'default': 'transparent',
      active: useColorModeValue('red.50', 'red.800'),
    },
    border: {
      'default': 'divider',
      active: useColorModeValue('red.50', 'red.800'),
    },
  };
}
