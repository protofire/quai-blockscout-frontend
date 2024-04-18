import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

export default function useShardsMenu() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return React.useMemo(() => ({
    isOpen,
    onClose,
    onOpen,
    onToggle,
  }), [ isOpen, onClose, onOpen, onToggle ]);
}
