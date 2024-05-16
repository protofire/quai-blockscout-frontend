import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import type { Channel } from 'phoenix';
import { Socket } from 'phoenix';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getFeaturePayload } from 'configs/app/features/types';
import type { ShardId, ShardInfo } from 'types/shards';

import config from 'configs/app';

type SubscriptionParams = {
  channelTopic: string;
  event: string;
  params?: Record<string, string>;
  onMessage: (shardId: ShardId, msg: unknown) => void;
};

type UseShardsResult = {
  shardId?: ShardId;
  shard?: ShardInfo;
  regionsShards: Record<string, Array<ShardInfo>>;
  defaultShardId?: ShardId;
  shards: Record<ShardId, ShardInfo>;
  isSwitcherUseful: boolean;
  getUrlWithShardId: (url: string) => string;
  setActiveShardId: (shardId: ShardId) => Promise<void>;
  subscribeOnTopicMessage: (params: SubscriptionParams) => void;
  extractShardIdFromAddress: (address: string) => ShardId;
};

export default function useShards(): UseShardsResult {
  const [ sockets, setSockets ] = useState<Array<Socket>>([]);
  const [ channels, setChannels ] = useState<Array<Channel>>([]);

  const queryStringParams = useSearchParams();
  const router = useRouter();
  const shardsConfig = getFeaturePayload(config.features.shards);
  const shards = React.useMemo(
    () => shardsConfig?.shards || {},
    [ shardsConfig ],
  );
  const defaultShardId = Object.keys(shards)[0];

  const shardId = (queryStringParams.get('shard') as ShardId) || defaultShardId;

  const setActiveShardId = useCallback(
    async(shardId: ShardId) => {
      if (!shardId) {
        return;
      }

      await router.push({
        pathname: router.pathname,
        query: { ...router.query, shard: shardId },
      });
      router.reload();
    },
    [ router ],
  );

  const getUrlWithShardId = useCallback(
    (url: string) => {
      const shardablePages = getFeaturePayload(config.features.shards)?.pages;
      const isShardable =
        shardablePages?.find((page) => url.startsWith(page)) !== undefined;

      if (isShardable && shardId) {
        const baseUrl = [
          config.app.protocol || 'http',
          '://',
          config.app.host || 'localhost',
          config.app.port && ':' + config.app.port,
        ]
          .filter(Boolean)
          .join('');
        const newUrl = new URL(url as string, baseUrl);

        // Add shardId to query params for tabs
        if (
          !newUrl.searchParams.has('shard') ||
          !newUrl.searchParams.get('shard')
        ) {
          newUrl.searchParams.append('shard', shardId);
        }

        return newUrl.href;
      }

      return url;
    },
    [ shardId ],
  );

  const extractShardIdFromAddress = useCallback(
    (address: string) => {
      // Remove the "0x" prefix if it exists
      if (address.startsWith('0x')) {
        address = address.slice(2);
      }

      const byteArray = new Uint8Array(address.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);

      const region = (byteArray[0] & 0xF0) >> 4; // bits[0..3]
      const zone = byteArray[0] & 0x0F; // bits[4..7]

      // We need to get name of zone
      const regionName = shardsConfig?.regions[region] || 'unknown';

      return `${ regionName }${ zone }`;
    },
    [ shardsConfig?.regions ],
  );

  const subscribeOnTopicMessage = useCallback(
    ({ channelTopic, event, params, onMessage }: SubscriptionParams) => {
      // Init sockets if they are not initialized
      if (!sockets.length) {
        const sockets: Array<Socket> = Object.keys(shards).map(
          (shardId: ShardId) => {
            const wsUrl = new URL(
              `${ config.api.socket }${ config.api.basePath }/socket/v2`,
            );
            const shard = shards[shardId];
            const shardHost = shard?.apiHost;
            if (shardHost) {
              // Replace host
              wsUrl.host = shardHost;
            }

            const socketInstance = new Socket(wsUrl.toString());
            return socketInstance;
          },
          [],
        );

        setSockets(sockets);
      }

      const channels = sockets.map((socket, index) => {
        // eslint-disable-next-line no-console
        console.log(`Subscribing to ${ channelTopic } channel on shard ${ index }`);
        socket.connect();
        const channel = socket.channel(channelTopic, params);
        // eslint-disable-next-line no-console
        channel
          .join()
          .receive('ok', () => {
            // eslint-disable-next-line no-console
            console.log(`Joined to ${ channelTopic } channel on shard ${ index }`);
          });
        channel.on(event, (msg) => {
          const shardId = Object.keys(shards)[index];
          onMessage(shardId, msg);
        });
        return channel;
      });

      setChannels(channels);
    },
    [ shards, sockets ],
  );

  // Return true in case if switcher is useful on page
  const isSwitcherUseful = useMemo(() => {
    const shardablePages = getFeaturePayload(config.features.shards)?.pages;
    return shardablePages?.find((page) => router.pathname.startsWith(page)) !== undefined;
  }, [ router.pathname ]);

  useEffect(() => {
    return () => {
      channels.forEach((channel) => channel.leave());
      sockets.forEach((socket) => socket.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    shardId,
    shard: shards[shardId],
    regionsShards: shardsConfig?.regionsShards || {},
    defaultShardId,
    shards,
    getUrlWithShardId,
    setActiveShardId,
    subscribeOnTopicMessage,
    extractShardIdFromAddress,
    isSwitcherUseful,
  };
}
