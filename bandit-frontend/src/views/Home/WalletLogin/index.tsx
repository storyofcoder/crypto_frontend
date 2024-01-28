import { useWeb3React } from '@web3-react/core'
import { getWalletForConnector } from 'connectors'
import { SUPPORTED_WALLETS } from 'constant/wallet'
import { useCallback } from 'react'
import useAuth from '../../../hooks/useAuth'
import {
    AuthWalletOthers,
    AuthWalletWrapper,
    AvatarImage,
    AvatarWrapper
} from '../styles'

export default function WalletLoginComponent() {
    const { connector } = useWeb3React()
    const { login } = useAuth()


    async function handleWalletSelect(connector) {
        try {
            const connectorId = getWalletForConnector(connector)
            await login(connectorId)
        } catch (e) {
            console.log(e)
        }
    }

    const handleConnect = useCallback((wallet) => {
        const option = SUPPORTED_WALLETS[wallet]
        if (option.connector !== connector && !option.href && option.connector) {
            handleWalletSelect(option.connector)
        }
    }, [])

    return (
        <div>
            <AuthWalletWrapper>
                <AuthWalletOthers onClick={() => handleConnect("METAMASK")}>
                    <AvatarWrapper height={28} width={28}>
                        <AvatarImage src={'./assets/images/folder/metamask.png'} height={24} width={24} />
                    </AvatarWrapper>
                    Metamask
                </AuthWalletOthers>
                <AuthWalletOthers onClick={() => handleConnect("WALLET_CONNECT")}>
                    <AvatarImage src={'./assets/images/folder/walletconnect.png'} height={28} width={28} />
                    WalletConnect
                </AuthWalletOthers>
            </AuthWalletWrapper>
        </div>
    )
}
