import React from 'react'
import styled from 'styled-components'
import AvatarPill from '../../atoms/Pill/AvatarFilterPill'

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

const chainList = [
  { key: 'ethereum', name: 'Ethereum', chainId: 1 },
  { key: 'binance', name: 'Binance', chainId: 56 },
  // { chainId: 9090, name: 'SOLANA' },
  // { chainId: 9091, name: 'CARDANO' },
  // { chainId: 137, name: 'POLYGON' },
  ...(!isProduction
    ? [
        { key: 'rinkeby', name: 'Rinkeby', chainId: 4 },
        { key: 'binance testnet', name: 'Binance Testnet', chainId: 97 },
        // { chainId: 80001, name: 'MUMBAI' },
      ]
    : []),
]

const ChainFilterTemplete = ({ onClick, selectedChain }: any) => {
  return (
    <GridView>
      {chainList.map((props) => (
        <AvatarPill
          key={props.name}
          onClick={() => onClick(props.key)}
          active={selectedChain.includes(props.key)}
          {...props}
        />
      ))}
    </GridView>
  )
}

const GridView = styled.div`
  max-height: 200px;
  overflow: auto;
`

export default ChainFilterTemplete
