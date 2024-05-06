import type { NFTTokenType, TokenType } from 'types/api/token';

export const NFT_TOKEN_TYPES: Array<{ title: string; id: NFTTokenType }> = [
  { title: 'QRC-721', id: 'QRC-721' },
  { title: 'QRC-1155', id: 'QRC-1155' },
];

export const TOKEN_TYPES: Array<{ title: string; id: TokenType }> = [
  { title: 'QRC-20', id: 'QRC-20' },
  ...NFT_TOKEN_TYPES,
];

export const NFT_TOKEN_TYPE_IDS = NFT_TOKEN_TYPES.map(i => i.id);
export const TOKEN_TYPE_IDS = TOKEN_TYPES.map(i => i.id);
