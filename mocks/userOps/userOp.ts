import type { UserOp } from 'types/api/userOps';

export const userOpData: UserOp = {
  timestamp: '2024-01-19T12:42:12.000000Z',
  transaction_hash: '0x715fe1474ac7bea3d6f4a03b1c5b6d626675fb0b103be29f849af65e9f1f9c6a',
  user_logs_start_index: 40,
  fee: '187125856691380',
  call_gas_limit: '26624',
  gas: '258875',
  status: true,
  aggregator_signature: null,
  block_hash: '0xff5f41ec89e5fb3dfcf103bbbd67469fed491a7dd7cffdf00bd9e3bf45d8aeab',
  pre_verification_gas: '48396',
  factory: null,
  signature:
    '0x2b95a173c1ea314d2c387e0d84194d221c14805e02157b7cefaf607a53e9081c0099ccbeaa1020ab91b862d4a4743dc1e20b4953f5bb6c13afeac760cef34fd11b',
  verification_gas_limit: '61285',
  max_fee_per_gas: '1575000898',
  aggregator: null,
  hash: '0xe72500491b3f2549ac53bd9de9dbb1d2edfc33cdddf5c079d6d64dfec650ef83',
  gas_price: '1575000898',
  user_logs_count: 1,
  block_number: '10399597',
  gas_used: '118810',
  sender: {
    ens_domain_name: null,
    hash: '0xF0C14FF4404b188fAA39a3507B388998c10FE284',
    implementation_name: null,
    is_contract: true,
    is_verified: null,
    name: null,
    currency: null,
  },
  nonce: '0x000000000000000000000000000000000000000000000000000000000000004f',
  entry_point: {
    ens_domain_name: null,
    hash: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    implementation_name: null,
    is_contract: true,
    is_verified: null,
    name: null,
    currency: null,
  },
  sponsor_type: 'paymaster_sponsor',
  raw: {
    call_data:
      // eslint-disable-next-line max-len
      '0xb61d27f600000000000000000000000059f6aa952df7f048fd076e33e0ea8bb552d5ffd8000000000000000000000000000000000000000000000000003f3d017500800000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
    call_gas_limit: '26624',
    init_code: '0x',
    max_fee_per_gas: '1575000898',
    max_priority_fee_per_gas: '1575000898',
    nonce: '79',
    paymaster_and_data:
      // eslint-disable-next-line max-len
      '0x7cea357b5ac0639f89f9e378a1f03aa5005c0a250000000000000000000000000000000000000000000000000000000065b3a8800000000000000000000000000000000000000000000000000000000065aa6e0028fa4c57ac1141bc9ecd8c9243f618ade8ea1db10ab6c1d1798a222a824764ff2269a72ae7a3680fa8b03a80d8a00cdc710eaf37afdcc55f8c9c4defa3fdf2471b',
    pre_verification_gas: '48396',
    sender: '0xF0C14FF4404b188fAA39a3507B388998c10FE284',
    signature:
      '0x2b95a173c1ea314d2c387e0d84194d221c14805e02157b7cefaf607a53e9081c0099ccbeaa1020ab91b862d4a4743dc1e20b4953f5bb6c13afeac760cef34fd11b',
    verification_gas_limit: '61285',
  },
  max_priority_fee_per_gas: '1575000898',
  revert_reason: null,
  bundler: {
    ens_domain_name: null,
    hash: '0xd53Eb5203e367BbDD4f72338938224881Fc501Ab',
    implementation_name: null,
    is_contract: false,
    is_verified: null,
    name: null,
    currency: null,
  },
  call_data:
    // eslint-disable-next-line max-len
    '0xb61d27f600000000000000000000000059f6aa952df7f048fd076e33e0ea8bb552d5ffd8000000000000000000000000000000000000000000000000003f3d017500800000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
  paymaster: {
    ens_domain_name: null,
    hash: '0x7ceA357B5AC0639F89F9e378a1f03Aa5005C0a25',
    implementation_name: null,
    is_contract: true,
    is_verified: null,
    name: null,
    currency: null,
  },
};
