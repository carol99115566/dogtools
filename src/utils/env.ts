const initialSearch = location.search

export const supportSepolia = () => {
  return initialSearch.includes('sepolia')
}

export const supportETHBundle = () => {
  return initialSearch.includes('eth')
}

export const supportSnipe = () => {
  return initialSearch.includes('snipe')
}
