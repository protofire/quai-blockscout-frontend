import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { TransactionsSortingValue, ExtTxsResponse } from 'types/api/transaction';

import type { ResourceError } from 'lib/api/resources';
import * as cookies from 'lib/cookies';
import type { Option } from 'ui/shared/sort/Sort';

import sortTxs from './sortExtTxs';

export const SORT_OPTIONS: Array<Option<TransactionsSortingValue>> = [
  { title: 'Default', id: undefined },
  { title: 'Value ascending', id: 'value-asc' },
  { title: 'Value descending', id: 'value-desc' },
];

type SortingValue = TransactionsSortingValue | undefined;

type HookResult = UseQueryResult<ExtTxsResponse, ResourceError<unknown>> & {
  sorting: SortingValue;
  setSortByValue: (value: SortingValue) => void;
}

export default function useExtTxsSort(
  queryResult: UseQueryResult<ExtTxsResponse, ResourceError<unknown>>,
): HookResult {

  const [ sorting, setSorting ] = React.useState<SortingValue>(cookies.get(cookies.NAMES.TXS_SORT) as SortingValue);

  const setSortByValue = React.useCallback((value: SortingValue) => {
    setSorting((prevVal: SortingValue) => {
      let newVal: SortingValue = undefined;
      if (value !== prevVal) {
        newVal = value as SortingValue;
      }
      cookies.set(cookies.NAMES.TXS_SORT, newVal ? newVal : '');
      return newVal;
    });
  }, []);

  return React.useMemo(() => {
    if (queryResult.isError || queryResult.isPending) {
      return { ...queryResult, setSortByValue, sorting };
    }

    return {
      ...queryResult,
      data: { ...queryResult.data, items: queryResult.data.items.slice().sort(sortTxs(sorting)) },
      setSortByValue,
      sorting,
    };
  }, [ queryResult, setSortByValue, sorting ]);

}
