import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import ContractVerificationForm from 'ui/contractVerification/ContractVerificationForm';
import useFormConfigQuery from 'ui/contractVerification/useFormConfigQuery';
import ContentLoader from 'ui/shared/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import PageTitle from 'ui/shared/Page/PageTitle';

const ContractVerification = () => {
  const configQuery = useFormConfigQuery(true);

  const content = React.useMemo(() => {
    if (configQuery.isError) {
      return <DataFetchAlert/>;
    }

    if (configQuery.isPending) {
      return <ContentLoader/>;
    }

    return (
      <ContractVerificationForm config={ configQuery.data }/>
    );
  }, [ configQuery.data, configQuery.isError, configQuery.isPending ]);

  return (
    <>
      <Flex>
        <Box flex={ 1 }><PageTitle title="Verify & publish contract"/></Box>
      </Flex>

      { content }
    </>
  );
};

export default ContractVerification;
