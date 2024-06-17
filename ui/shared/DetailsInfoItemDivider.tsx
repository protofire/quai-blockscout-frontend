import { GridItem, chakra, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  title?: string;
  className?: string;
  id?: string;
}

const DetailsInfoItemDivider = ({ className, id, title }: Props) => {
  return (
    <GridItem
      id={ id }
      className={ className }
      colSpan={{ base: undefined, lg: 2 }}
      mt={{ base: 2, lg: 3 }}
      mb={{ base: 0, lg: 3 }}
      borderBottom="1px solid"
      borderColor="divider"
    >
      { title && (
        <Text fontWeight={{ base: 700, lg: 500 }}>
          { title }
        </Text>
      ) }
    </GridItem>
  );
};

export default chakra(DetailsInfoItemDivider);
