// import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { retry } from 'lib/api/useQueryClientConfig';
import { SECOND } from 'lib/consts';
import { TX } from 'stubs/tx';
import { generateListStub } from 'stubs/utils';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import type { BlockQuery } from './useBlockQuery';

export type BlockEtxQuery = QueryWithPagesResult<'block_txs'>;

interface Params {
  heightOrHash: string;
  blockQuery: BlockQuery;
  tab: string;
}

export default function useBlockConversionTxsQuery({ heightOrHash, blockQuery, tab }: Params): BlockEtxQuery {
  const [ isRefetchEnabled, setRefetchEnabled ] = React.useState(false);

  const apiQuery = useQueryWithPages({
    resourceName: 'block_txs',
    pathParams: { height_or_hash: heightOrHash },
    filters: { ext_type: 'conversion' },
    options: {
      enabled: Boolean(tab === 'conversion' && !blockQuery.isPlaceholderData),
      placeholderData: generateListStub<'block_txs'>(TX, 50, {
        next_page_params: {
          block_number: 9004925,
          index: 49,
          items_count: 50,
        },
      }),
      refetchOnMount: false,
      retry: (failureCount, error) => {
        if (isRefetchEnabled) {
          return false;
        }

        return retry(failureCount, error);
      },
      refetchInterval: (): number | false => {
        return isRefetchEnabled ? 15 * SECOND : false;
      },
    },
  });

  React.useEffect(() => {
    if (apiQuery.isPlaceholderData) {
      return;
    }

    if (apiQuery.isError && apiQuery.errorUpdateCount === 1) {
      setRefetchEnabled(true);
    } else if (!apiQuery.isError) {
      setRefetchEnabled(false);
    }
  }, [ apiQuery.errorUpdateCount, apiQuery.isError, apiQuery.isPlaceholderData ]);

  return { ...apiQuery };
}
