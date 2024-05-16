import type { Feature } from './types';
import type { ShardId, ShardInfo } from 'types/shards';

import { getEnvValue, parseEnvJson } from '../utils';

export type ShardConfig = {
  proxyUrl: string;
  shards: Record<ShardId, ShardInfo>;
  regionsShards: Record<ShardId, Array<ShardInfo>>;
  regions: Array<string>;
  pages: Array<string>;
};

const title = 'Shards';
const config: Feature<ShardConfig> = (() => {
  const regions = parseEnvJson<Array<string>>(getEnvValue('NEXT_PUBLIC_REGIONS')) || [];
  const shardsConfig = parseEnvJson<Array<ShardInfo>>(getEnvValue('NEXT_PUBLIC_SHARDS')) || [];
  const proxyUrl = getEnvValue('NEXT_PUBLIC_MULTI_SHARDS_PROXY_URL') || '';
  const isEnabled = proxyUrl?.length > 0;

  const shards: { [key: ShardId]: ShardInfo } = shardsConfig.reduce((acc: Record<ShardId, ShardInfo>, shard) => {
    acc[shard.id as ShardId] = shard;
    return acc;
  }, {});

  const regionsShards = shardsConfig.reduce((acc: Record<string, Array<ShardInfo>>, shard) => {
    if (!acc[shard.region]) {
      acc[shard.region] = [];
    }

    acc[shard.region].push(shard);
    return acc;
  }, {});

  return Object.freeze({
    title,
    isEnabled,
    proxyUrl,
    shards,
    regions,
    regionsShards,
    pages: [
      '/accounts',
      '/address',
      '/block/',
      '/blocks',
      '/tx',
      '/txs',
      '/ext_txs',
      '/verified-contracts',
      '/contract-verification',
      '/tokens',
    ],
  });
})();

export default config;
