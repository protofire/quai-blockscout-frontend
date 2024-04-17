import type { LinkProps, FlexProps } from '@chakra-ui/react';
import { Flex, Link } from '@chakra-ui/react';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type { LegacyRef } from 'react';
import React from 'react';

import useShards from 'lib/hooks/useShards';

const LinkInternal = ({ isLoading, ...props }: LinkProps & { isLoading?: boolean }, ref: LegacyRef<HTMLAnchorElement>) => {
  const { getUrlWithShardId } = useShards();

  if (isLoading) {
    return <Flex alignItems="center" { ...props as FlexProps }>{ props.children }</Flex>;
  }

  if (!props.href) {
    return <Link { ...props } ref={ ref }/>;
  }

  props.href = getUrlWithShardId(props.href);

  return (
    <NextLink href={ props.href as NextLinkProps['href'] } passHref target={ props.target } legacyBehavior>
      <Link { ...props } ref={ ref }/>
    </NextLink>
  );
};

export default React.memo(React.forwardRef(LinkInternal));
