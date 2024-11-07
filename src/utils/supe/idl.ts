// supe合约的IDL
export const SUPE_IDL_JSON = {
  address: 'FAKvSE6CypSNAXVGtZQVbFkFRJ6Hu5j2dqzB28Y4Supe',
  metadata: {
    name: 'suswap',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'burn_nft',
      discriminator: [119, 13, 183, 17, 194, 243, 38, 31],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            vec: {
              defined: {
                name: 'TransferNFTParams',
              },
            },
          },
        },
      ],
    },
    {
      name: 'create_amm_pool',
      discriminator: [24, 66, 208, 114, 198, 59, 237, 192],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'platform',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 108, 97, 116, 102, 111, 114, 109],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'tree',
              },
            ],
          },
        },
        {
          name: 'mint',
          writable: true,
          optional: true,
        },
        {
          name: 'authority_token_account',
          writable: true,
          optional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'authority',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_token_account',
          writable: true,
          optional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'CreateAmmPoolParams',
            },
          },
        },
      ],
    },
    {
      name: 'create_collection',
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
          signer: true,
        },
        {
          name: 'tree_config',
          writable: true,
        },
        {
          name: 'collection_config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 78, 70, 84],
              },
              {
                kind: 'account',
                path: 'tree_config',
              },
            ],
          },
        },
        {
          name: 'mint',
        },
        {
          name: 'platform_treasury',
          writable: true,
        },
        {
          name: 'associated_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'collection_config',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'metadata_account',
          writable: true,
        },
        {
          name: 'master_edition_account',
          writable: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'CreateCollectionParams',
            },
          },
        },
      ],
    },
    {
      name: 'deposit',
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'mint',
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'platform',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 108, 97, 116, 102, 111, 114, 109],
              },
            ],
          },
        },
        {
          name: 'deposit_account',
          writable: true,
        },
        {
          name: 'deposit_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'deposit_account',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'DepositArgs',
            },
          },
        },
      ],
    },
    {
      name: 'initialize_mint',
      discriminator: [209, 42, 195, 4, 129, 85, 209, 44],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'collection_config',
        },
        {
          name: 'mint',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [],
    },
    {
      name: 'initialize_plaform',
      discriminator: [135, 237, 164, 48, 86, 1, 214, 1],
      accounts: [
        {
          name: 'authority',
          writable: true,
          signer: true,
        },
        {
          name: 'treasury',
          writable: true,
        },
        {
          name: 'pool_manager',
          writable: true,
        },
        {
          name: 'platform',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 108, 97, 116, 102, 111, 114, 109],
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'mint_cnft_native',
      discriminator: [177, 213, 72, 59, 218, 117, 58, 75],
      accounts: [
        {
          name: 'payer',
          docs: ['CHECK'],
          writable: true,
          signer: true,
        },
        {
          name: 'leaf_owner',
          writable: true,
        },
        {
          name: 'leaf_delegate',
          writable: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'collection_config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 78, 70, 84],
              },
              {
                kind: 'account',
                path: 'tree_config',
              },
            ],
          },
        },
        {
          name: 'platform_treasury',
          writable: true,
          address: '2pw9hArdNoY9Q4tYt54fZSWC3hfNhtStf1aXKCbHFfNE',
        },
        {
          name: 'bubblegum_signer',
          writable: true,
        },
        {
          name: 'collection_mint',
          writable: true,
        },
        {
          name: 'collection_metadata',
          writable: true,
        },
        {
          name: 'collection_master_edition',
          writable: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [],
    },
    {
      name: 'mint_cnft_spl',
      discriminator: [166, 130, 204, 46, 152, 91, 17, 194],
      accounts: [
        {
          name: 'payer',
          docs: ['CHECK'],
          writable: true,
          signer: true,
        },
        {
          name: 'leaf_owner',
          writable: true,
        },
        {
          name: 'leaf_delegate',
          writable: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'collection_config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 78, 70, 84],
              },
              {
                kind: 'account',
                path: 'tree_config',
              },
            ],
          },
        },
        {
          name: 'platform_treasury',
          writable: true,
          address: '2pw9hArdNoY9Q4tYt54fZSWC3hfNhtStf1aXKCbHFfNE',
        },
        {
          name: 'treasury_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'platform_treasury',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'payment_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'payment_mint',
          writable: true,
        },
        {
          name: 'payer_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'payer',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'payment_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'bubblegum_signer',
          writable: true,
        },
        {
          name: 'collection_mint',
          writable: true,
        },
        {
          name: 'collection_metadata',
          writable: true,
        },
        {
          name: 'collection_master_edition',
          writable: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [],
    },
    {
      name: 'swap_buy_nft_mint',
      discriminator: [204, 39, 103, 129, 125, 228, 236, 251],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'tree',
              },
            ],
          },
        },
        {
          name: 'collection_config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 78, 70, 84],
              },
              {
                kind: 'account',
                path: 'tree_config',
              },
            ],
          },
        },
        {
          name: 'treasury',
          writable: true,
        },
        {
          name: 'treasury_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'payer_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'collection_mint',
          writable: true,
          optional: true,
        },
        {
          name: 'collection_metadata',
          writable: true,
          optional: true,
        },
        {
          name: 'collection_edition',
          writable: true,
          optional: true,
        },
        {
          name: 'bubblegum_signer',
          writable: true,
          optional: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'buy_count',
          type: 'u8',
        },
      ],
    },
    {
      name: 'swap_buy_nft_pool',
      discriminator: [200, 11, 211, 64, 116, 148, 177, 177],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'tree',
              },
            ],
          },
        },
        {
          name: 'treasury',
          writable: true,
        },
        {
          name: 'treasury_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'payer_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            vec: {
              defined: {
                name: 'TransferNFTParams',
              },
            },
          },
        },
      ],
    },
    {
      name: 'swap_sell_nft',
      discriminator: [232, 60, 53, 128, 131, 137, 1, 117],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'tree',
              },
            ],
          },
        },
        {
          name: 'treasury',
          writable: true,
        },
        {
          name: 'treasury_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'payer_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          optional: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            vec: {
              defined: {
                name: 'TransferNFTParams',
              },
            },
          },
        },
      ],
    },
    {
      name: 'transfer_nft',
      discriminator: [190, 28, 194, 8, 194, 218, 78, 78],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'tree',
          writable: true,
        },
        {
          name: 'tree_config',
          docs: ['CHECK'],
          writable: true,
        },
        {
          name: 'new_owner',
          writable: true,
        },
        {
          name: 'log_wrapper',
          address: 'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV',
        },
        {
          name: 'bubblegum_program',
          address: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
        },
        {
          name: 'compression_program',
          address: 'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            vec: {
              defined: {
                name: 'TransferNFTParams',
              },
            },
          },
        },
      ],
    },
    {
      name: 'update_plaform',
      discriminator: [198, 0, 39, 41, 34, 125, 70, 63],
      accounts: [
        {
          name: 'administrator',
          writable: true,
          signer: true,
          relations: ['platform'],
        },
        {
          name: 'platform',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 108, 97, 116, 102, 111, 114, 109],
              },
            ],
          },
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'UpdatePlatformArgs',
            },
          },
        },
      ],
    },
    {
      name: 'withdraw2',
      discriminator: [80, 6, 111, 73, 174, 211, 66, 132],
      accounts: [
        {
          name: 'system_account',
          writable: true,
          signer: true,
        },
        {
          name: 'mint',
        },
        {
          name: 'system_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'system_account',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'receiver_account',
          writable: true,
        },
        {
          name: 'receiver_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'receiver_account',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'event_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
            ],
          },
        },
        {
          name: 'program',
        },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'Withdraw2Args',
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'CollectionConfig',
      discriminator: [223, 110, 152, 160, 174, 157, 106, 255],
    },
    {
      name: 'Platform',
      discriminator: [77, 92, 204, 58, 187, 98, 91, 12],
    },
    {
      name: 'Pool',
      discriminator: [241, 154, 109, 4, 17, 177, 109, 188],
    },
  ],
  events: [
    {
      name: 'BurnNftEvent',
      discriminator: [112, 17, 197, 220, 144, 151, 201, 159],
    },
    {
      name: 'BuycNFTEvent',
      discriminator: [145, 75, 56, 119, 233, 28, 85, 100],
    },
    {
      name: 'CreateAmmPoolEvent',
      discriminator: [135, 21, 41, 106, 115, 247, 242, 81],
    },
    {
      name: 'CreateCollectionEvent',
      discriminator: [133, 52, 245, 101, 31, 0, 151, 128],
    },
    {
      name: 'CreateCollectionEvent2',
      discriminator: [26, 253, 197, 7, 255, 59, 118, 103],
    },
    {
      name: 'DeListcNFTEvent',
      discriminator: [175, 38, 227, 131, 1, 60, 30, 100],
    },
    {
      name: 'DepositEvent',
      discriminator: [120, 248, 61, 83, 31, 142, 107, 144],
    },
    {
      name: 'DepositEvent2',
      discriminator: [174, 137, 98, 74, 124, 157, 106, 192],
    },
    {
      name: 'ListcNFTEvent',
      discriminator: [76, 78, 244, 227, 9, 110, 209, 81],
    },
    {
      name: 'MintCNftEvent',
      discriminator: [5, 136, 181, 161, 147, 109, 50, 100],
    },
    {
      name: 'SwapNftEvent',
      discriminator: [253, 200, 69, 181, 14, 181, 56, 250],
    },
    {
      name: 'TransferNftEvent',
      discriminator: [89, 236, 27, 23, 250, 8, 20, 172],
    },
    {
      name: 'Withdraw2Event',
      discriminator: [32, 198, 49, 10, 1, 160, 16, 65],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidParams',
      msg: 'Invalid Params',
    },
    {
      code: 6001,
      name: 'InvalidNFTsProofsLength',
      msg: 'Invalid nfts proof length',
    },
    {
      code: 6002,
      name: 'InvalidFeeValue',
      msg: 'Invalid fee value',
    },
    {
      code: 6003,
      name: 'InvalidAdmin',
      msg: 'Invalid admin',
    },
    {
      code: 6004,
      name: 'AlreadyInitialized',
      msg: 'Already initialized',
    },
    {
      code: 6005,
      name: 'NotInitialized',
      msg: 'Not initialized',
    },
    {
      code: 6006,
      name: 'InvalidAccount',
      msg: 'Invalid account',
    },
    {
      code: 6007,
      name: 'MaxSupplyExceeded',
      msg: 'Max supply exceeded',
    },
    {
      code: 6008,
      name: 'NoEmptyLeaf',
      msg: 'No empty leaf',
    },
    {
      code: 6009,
      name: 'InvalidSupplyValue',
      msg: 'Invalid total supply value. only 1000 or 10000',
    },
    {
      code: 6010,
      name: 'MaxSupplyLimit',
      msg: 'The NFTs maximum mint quantity has been reached.',
    },
    {
      code: 6011,
      name: 'InvalidTreasury',
      msg: 'Invalid treasury address',
    },
    {
      code: 6012,
      name: 'InvalidPaymentMint',
      msg: 'Payment mint address not match',
    },
    {
      code: 6013,
      name: 'InvalidEndTokenId',
      msg: 'Invalid end tokenId',
    },
    {
      code: 6014,
      name: 'InvalidMetadataUriConfig',
      msg: 'Invalid meteadata uri config',
    },
    {
      code: 6015,
      name: 'InvalidOrderArgs',
      msg: 'Invalid order args',
    },
    {
      code: 6016,
      name: 'InvalidPriceArgsLength',
      msg: 'Invalid price args length. should be 1 or 2 or 3',
    },
    {
      code: 6017,
      name: 'AllMinted',
      msg: 'All minted',
    },
    {
      code: 6018,
      name: 'PoolHasNoLP',
      msg: 'Pool has no LP',
    },
    {
      code: 6019,
      name: 'SoldOut2',
      msg: "All NFTs of this level have been sold out. Can't mint more NFTs",
    },
    {
      code: 6020,
      name: 'InvalidNativePayment',
      msg: 'Unsupported payment methods. Only Native SOL',
    },
    {
      code: 6021,
      name: 'InvalidTokenPayment',
      msg: 'Unsupported payment methods. Only Tokens like BONK, USDC, JUP...',
    },
    {
      code: 6022,
      name: 'InvalidZeroValue',
      msg: 'Invalid zero value',
    },
    {
      code: 6023,
      name: 'InsufficientInputAmount',
      msg: 'Insufficient Input Amount',
    },
    {
      code: 6024,
      name: 'InsufficientLiquidity',
      msg: 'Insufficient liquidity. Pool has not enough liquidity to swap the amount',
    },
    {
      code: 6025,
      name: 'InvalidGetAmountOut',
      msg: 'Input value exceeds the reserve when getAmountOut',
    },
    {
      code: 6026,
      name: 'InvalidGetAmountIn',
      msg: 'Input value exceeds the reserve when getAmountIn',
    },
  ],
  types: [
    {
      name: 'BurnNftEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'leaf_nonce',
            type: 'u64',
          },
          {
            name: 'leaf_index',
            type: 'u32',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'BuycNFTEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'buyer',
            type: 'pubkey',
          },
          {
            name: 'seller',
            type: 'pubkey',
          },
          {
            name: 'token_id',
            type: 'u32',
          },
          {
            name: 'sales_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CollectionConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name_prefix',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'price_params',
            type: {
              vec: {
                defined: {
                  name: 'PriceParams',
                },
              },
            },
          },
          {
            name: 'collection_mint',
            type: 'pubkey',
          },
          {
            name: 'merkle_tree',
            type: 'pubkey',
          },
          {
            name: 'creator',
            type: 'pubkey',
          },
          {
            name: 'public_max_token_id',
            type: 'u16',
          },
          {
            name: 'pool_max_token_id',
            type: 'u16',
          },
          {
            name: 'next_token_id',
            type: 'u16',
          },
          {
            name: 'is_one_pic',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'CreateAmmPoolEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'pool',
            type: 'pubkey',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'buy_fee_rate',
            type: 'u16',
          },
          {
            name: 'sell_fee_rate',
            type: 'u16',
          },
          {
            name: 'is_native_token',
            type: 'bool',
          },
          {
            name: 'quote_mint',
            type: 'pubkey',
          },
          {
            name: 'quote_decimal',
            type: 'u8',
          },
          {
            name: 'reserve_nft',
            type: 'u64',
          },
          {
            name: 'reserve_token',
            type: 'u64',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CreateAmmPoolParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'reserve_nft',
            type: 'u64',
          },
          {
            name: 'reserve_token',
            type: 'u64',
          },
          {
            name: 'sell_nfts_fee',
            type: 'u64',
          },
          {
            name: 'buy_nfts_fee',
            type: 'u64',
          },
          {
            name: 'is_native_token',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'CreateCollectionEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'creator',
            type: 'pubkey',
          },
          {
            name: 'platform',
            type: 'pubkey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'uri_prefix',
            type: 'string',
          },
          {
            name: 'is_one_pic',
            type: 'bool',
          },
          {
            name: 'total_supply',
            type: 'u64',
          },
          {
            name: 'presale_pct',
            type: 'u16',
          },
          {
            name: 'price_params',
            type: {
              vec: {
                defined: {
                  name: 'PriceParams',
                },
              },
            },
          },
          {
            name: 'create_fee',
            type: 'u64',
          },
          {
            name: 'buy_fee_rate',
            type: 'u16',
          },
          {
            name: 'sell_fee_rate',
            type: 'u16',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'collection_config',
            type: 'pubkey',
          },
          {
            name: 'metadata',
            type: 'pubkey',
          },
          {
            name: 'master_edition',
            type: 'pubkey',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CreateCollectionEvent2',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'creator',
            type: 'pubkey',
          },
          {
            name: 'platform',
            type: 'pubkey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'uri_prefix',
            type: 'string',
          },
          {
            name: 'is_one_pic',
            type: 'bool',
          },
          {
            name: 'total_supply',
            type: 'u64',
          },
          {
            name: 'presale_pct',
            type: 'u16',
          },
          {
            name: 'price_params',
            type: {
              vec: {
                defined: {
                  name: 'PriceParams',
                },
              },
            },
          },
          {
            name: 'create_fee',
            type: 'u64',
          },
          {
            name: 'buy_fee_rate',
            type: 'u16',
          },
          {
            name: 'sell_fee_rate',
            type: 'u16',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'collection_config',
            type: 'pubkey',
          },
          {
            name: 'metadata',
            type: 'pubkey',
          },
          {
            name: 'master_edition',
            type: 'pubkey',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
          {
            name: 'max_depth',
            type: 'u8',
          },
          {
            name: 'max_buffer_size',
            type: 'u8',
          },
          {
            name: 'canopy_depth',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'CreateCollectionParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collection_name',
            type: 'string',
          },
          {
            name: 'collection_symbol',
            type: 'string',
          },
          {
            name: 'collection_uri',
            type: 'string',
          },
          {
            name: 'total_supply',
            type: 'u16',
          },
          {
            name: 'presell_percent',
            type: 'u16',
          },
          {
            name: 'is_one_pic',
            type: 'bool',
          },
          {
            name: 'price_params',
            type: {
              vec: {
                defined: {
                  name: 'PriceParams',
                },
              },
            },
          },
          {
            name: 'create_fee',
            type: 'u64',
          },
          {
            name: 'buy_fee_rate',
            type: 'u16',
          },
          {
            name: 'sell_fee_rate',
            type: 'u16',
          },
          {
            name: 'max_depth',
            type: 'u8',
          },
          {
            name: 'max_buffer_size',
            type: 'u8',
          },
          {
            name: 'canopy_depth',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'DeListcNFTEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'from',
            type: 'pubkey',
          },
          {
            name: 'token_id',
            type: 'u32',
          },
          {
            name: 'sales_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'DepositArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'order_id',
            type: 'string',
          },
          {
            name: 'command',
            type: 'string',
          },
          {
            name: 'extra_info',
            type: 'string',
          },
          {
            name: 'max_index',
            type: 'u8',
          },
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'cost',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'DepositEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'cost',
            type: 'u64',
          },
          {
            name: 'order_id',
            type: 'string',
          },
          {
            name: 'command',
            type: 'string',
          },
          {
            name: 'extra_info',
            type: 'string',
          },
          {
            name: 'max_index',
            type: 'u8',
          },
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'DepositEvent2',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'mint1',
            type: 'pubkey',
          },
          {
            name: 'cost1',
            type: 'u64',
          },
          {
            name: 'mint2',
            type: 'pubkey',
          },
          {
            name: 'cost2',
            type: 'u64',
          },
          {
            name: 'order_id',
            type: 'string',
          },
          {
            name: 'command',
            type: 'string',
          },
          {
            name: 'extra_info',
            type: 'string',
          },
          {
            name: 'max_index',
            type: 'u8',
          },
          {
            name: 'index',
            type: 'u8',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ListcNFTEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'from',
            type: 'pubkey',
          },
          {
            name: 'token_id',
            type: 'u32',
          },
          {
            name: 'sales_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MintCNftEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'leaf_owner',
            type: 'pubkey',
          },
          {
            name: 'leaf_delegate',
            type: 'pubkey',
          },
          {
            name: 'collection_mint',
            type: 'pubkey',
          },
          {
            name: 'collection_creator',
            type: 'pubkey',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'token_id',
            type: 'u64',
          },
          {
            name: 'num_minted',
            type: 'u64',
          },
          {
            name: 'asset_id',
            type: 'pubkey',
          },
          {
            name: 'is_native',
            type: 'bool',
          },
          {
            name: 'payment_mint',
            type: 'pubkey',
          },
          {
            name: 'payment_amount',
            type: 'u64',
          },
          {
            name: 'payment_decimal',
            type: 'u8',
          },
          {
            name: 'payment_fee',
            type: 'u64',
          },
          {
            name: 'is_swap',
            type: 'bool',
          },
          {
            name: 'mint_status',
            type: 'bool',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Platform',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'initialized',
            type: 'bool',
          },
          {
            name: 'administrator',
            type: 'pubkey',
          },
          {
            name: 'treasury',
            type: 'pubkey',
          },
          {
            name: 'pool_manager',
            type: 'pubkey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Pool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'reserve_nft',
            type: 'u64',
          },
          {
            name: 'reserve_token',
            type: 'u64',
          },
          {
            name: 'k_last',
            type: 'u64',
          },
          {
            name: 'sell_nfts_fee',
            type: 'u64',
          },
          {
            name: 'buy_nfts_fee',
            type: 'u64',
          },
          {
            name: 'is_native_token',
            type: 'bool',
          },
          {
            name: 'reserve_token_mint',
            type: 'pubkey',
          },
          {
            name: 'reserve_token_decimals',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'PriceParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'end_token_id',
            type: 'u16',
          },
          {
            name: 'is_native_token',
            type: 'bool',
          },
          {
            name: 'payment_mint',
            type: 'pubkey',
          },
          {
            name: 'sales_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SwapNftEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'source',
            type: 'u8',
          },
          {
            name: 'is_buy',
            type: 'bool',
          },
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'pool',
            type: 'pubkey',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'is_native_token',
            type: 'bool',
          },
          {
            name: 'quote_mint',
            type: 'pubkey',
          },
          {
            name: 'quote_amount',
            type: 'u64',
          },
          {
            name: 'quote_fee',
            type: 'u64',
          },
          {
            name: 'quote_decimal',
            type: 'u8',
          },
          {
            name: 'reserve_nft',
            type: 'u64',
          },
          {
            name: 'reserve_token',
            type: 'u64',
          },
          {
            name: 'nfts',
            type: {
              vec: 'u64',
            },
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TransferNFTParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'data_hash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'creator_hash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'nonce',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u32',
          },
          {
            name: 'proof_length',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'TransferNftEvent',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'new_owner',
            type: 'pubkey',
          },
          {
            name: 'tree',
            type: 'pubkey',
          },
          {
            name: 'tree_config',
            type: 'pubkey',
          },
          {
            name: 'leaf_nonce',
            type: 'u64',
          },
          {
            name: 'leaf_index',
            type: 'u32',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'UpdatePlatformArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'administrator',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'treasury',
            type: {
              option: 'pubkey',
            },
          },
          {
            name: 'pool_manager',
            type: {
              option: 'pubkey',
            },
          },
        ],
      },
    },
    {
      name: 'Withdraw2Args',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'order_id',
            type: 'string',
          },
          {
            name: 'cost',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Withdraw2Event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'system_account',
            type: 'pubkey',
          },
          {
            name: 'receiver_account',
            type: 'pubkey',
          },
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'cost',
            type: 'u64',
          },
          {
            name: 'order_id',
            type: 'string',
          },
          {
            name: 'timestamp',
            type: 'u64',
          },
        ],
      },
    },
  ],
  constants: [
    {
      name: 'CNFT_SEED',
      type: 'string',
      value: 'cNFT',
    },
    {
      name: 'ORDER_SEED',
      type: 'string',
      value: 'order',
    },
    {
      name: 'PLATFORM_SEED',
      type: 'string',
      value: 'platform',
    },
    {
      name: 'POOL_SEED',
      type: 'string',
      value: 'pool',
    },
    {
      name: 'SWAP_DENOMINATOR',
      type: 'u64',
      value: '10000',
    },
    {
      name: 'VIRTUAL_LIQUIDITY_POINT',
      type: 'u16',
      value: '1000',
    },
  ],
}
