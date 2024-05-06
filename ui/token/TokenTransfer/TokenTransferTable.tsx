import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import type { TokenInfo } from 'types/api/token';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import { default as Thead } from 'ui/shared/TheadSticky';
import TruncatedValue from 'ui/shared/TruncatedValue';
import TokenTransferTableItem from 'ui/token/TokenTransfer/TokenTransferTableItem';

interface Props {
  data: Array<TokenTransfer>;
  top: number;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  tokenId?: string;
  isLoading?: boolean;
  token?: TokenInfo;
}

const TokenTransferTable = ({ data, top, showSocketInfo, socketInfoAlert, socketInfoNum, tokenId, isLoading, token }: Props) => {
  const tokenType = data[0].token.type;

  return (
    <AddressHighlightProvider>
      <Table variant="simple" size="sm" minW="950px">
        <Thead top={ top }>
          <Tr>
            <Th width="280px">Txn hash</Th>
            <Th width="200px">Method</Th>
            <Th width={{ lg: '224px', xl: '420px' }}>From/To</Th>
            { (tokenType === 'QRC-721' || tokenType === 'QRC-1155') &&
              <Th width={ tokenType === 'QRC-1155' ? '50%' : '100%' }>Token ID</Th>
            }
            { (tokenType === 'QRC-20' || tokenType === 'QRC-1155') && (
              <Th width={ tokenType === 'QRC-1155' ? '50%' : '100%' } isNumeric>
                <TruncatedValue value={ `Value ${ token?.symbol || '' }` } w="100%" verticalAlign="middle"/>
              </Th>
            ) }
          </Tr>
        </Thead>
        <Tbody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              url={ window.location.href }
              alert={ socketInfoAlert }
              num={ socketInfoNum }
              type="token_transfer"
              isLoading={ isLoading }
            />
          ) }
          { data.map((item, index) => (
            <TokenTransferTableItem
              key={ item.tx_hash + item.block_hash + item.log_index + '_' + index }
              { ...item }
              tokenId={ tokenId }
              isLoading={ isLoading }
            />
          )) }
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);
