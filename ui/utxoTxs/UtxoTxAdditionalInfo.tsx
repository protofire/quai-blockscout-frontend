import {
  chakra,
  Modal,
  ModalContent,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import type { ExternalTransaction } from 'types/api/transaction';

import AdditionalInfoButton from 'ui/shared/AdditionalInfoButton';

import UtxoTxAdditionalInfoContent from './UtxoTxAdditionalInfoContent';

type Props = {
  hash: undefined;
  tx: ExternalTransaction;
} & {
  isMobile?: boolean;
  isLoading?: boolean;
  className?: string;
}

const UtxoTxAdditionalInfo = ({ tx, isMobile, isLoading, className }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isMobile) {
    return (
      <>
        <AdditionalInfoButton onClick={ onOpen } isLoading={ isLoading } className={ className }/>
        <Modal isOpen={ isOpen } onClose={ onClose } size="full">
          <ModalContent paddingTop={ 4 }>
            <ModalCloseButton/>
            <UtxoTxAdditionalInfoContent tx={ tx }/>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <Popover placement="right-start" openDelay={ 300 } isLazy>
      { ({ isOpen }) => (
        <>
          <PopoverTrigger>
            <AdditionalInfoButton isOpen={ isOpen } isLoading={ isLoading } className={ className }/>
          </PopoverTrigger>
          <PopoverContent border="1px solid" borderColor="divider">
            <PopoverBody fontWeight={ 400 } fontSize="sm">
              <UtxoTxAdditionalInfoContent tx={ tx }/>
            </PopoverBody>
          </PopoverContent>
        </>
      ) }
    </Popover>
  );
};

export default React.memo(chakra(UtxoTxAdditionalInfo));
