import { Box, Text, chakra, Skeleton } from '@chakra-ui/react';
import React from 'react';

import getCurrencyValue from 'lib/getCurrencyValue';

interface Props {
  value: string;
  currency?: string;
  exchangeRate?: string | null;
  className?: string;
  accuracy?: number;
  accuracyUsd?: number;
  decimals?: string | null;
  isLoading?: boolean;
  isCondensed?: boolean;
}

const CurrencyValue = ({
  value,
  currency = '',
  decimals,
  exchangeRate,
  className,
  accuracy,
  accuracyUsd,
  isLoading,
  isCondensed,
}: Props) => {
  if (isLoading) {
    return (
      <Skeleton className={ className } display="inline-block">
        0.00 ($0.00)
      </Skeleton>
    );
  }

  if (value === undefined || value === null) {
    return (
      <Box as="span" className={ className }>
        <Text>N/A</Text>
      </Box>
    );
  }
  const { valueStr: valueResult, usd: usdResult } = getCurrencyValue({
    value,
    accuracy,
    accuracyUsd,
    exchangeRate,
    decimals,
  });
  currency = currency ? `${ currency?.charAt(0).toUpperCase() }${ currency?.slice(1) }` : '';
  const condensedValue = (value: string, currency: string) => {
    const isDecimalValue = value.indexOf('0.', 0) === 0;
    if (!isCondensed || !isDecimalValue) {
      return (
        <Text display="inline-block">
          { value } { currency }
        </Text>
      );
    }

    const [ number, reminder ] = value.split('.');
    if (reminder.length < 6) {
      return (
        <Text display="inline-block">
          { value } { currency }
        </Text>
      );
    }

    const decimalBegin = reminder.slice(0, 2);
    const decimalEnd = reminder.slice(-2);

    return (
      <Text display="inline-block">
        { `${ number }.${ decimalBegin }` }
        <Text fontSize="10px" display="inline" position="relative" top="0.5">{ `${ reminder.length - 4 }` }</Text>
        { `${ decimalEnd }` } { currency }
      </Text>
    );
  };

  return (
    <Box as="span" className={ className } display="inline-flex" rowGap={ 3 } columnGap={ 1 }>
      { condensedValue(valueResult, currency) }
      { usdResult && (
        <Text as="span" variant="secondary" fontWeight={ 400 }>
          (${ usdResult })
        </Text>
      ) }
    </Box>
  );
};

export default React.memo(chakra(CurrencyValue));
