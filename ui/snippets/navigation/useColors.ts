import { useColorModeValue } from '@chakra-ui/react';

export default function useColors() {
  return {
    text: {
      'default': useColorModeValue('gray.600', 'gray.400'),
      active: useColorModeValue('white', 'gray.50'),
      hover: 'link_hovered',
    },
    bg: {
      'default': 'transparent',
      active: useColorModeValue('red.600', 'red.800'),
    },
    border: {
      'default': 'divider',
      active: useColorModeValue('red.600', 'red.800'),
    },
  };
}
