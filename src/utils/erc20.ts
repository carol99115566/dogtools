// ERC-20 标准的 ABI 片段
export const ERC20_ABI = [
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() external view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
]
