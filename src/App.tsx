import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import KaleidoProvider from './contexts/KaleidoProvider'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import './utils/I18n'
import { resolveChainID } from './utils/network'

declare global {
  interface Window {
    ethereum: any
  }
}

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  if (window.ethereum) {
    // window.ethereum.autoRefreshOnNetworkChange = false
    // window.ethereum.on('networkChanged', function (networkId: number) {
    //   window.onbeforeunload = function () {
    //     const network = resolveNetwork(networkId)
    //     if (network !== 'mainnet' && network !== 'rinkeby') {
    //       return t(`Switching to ${resolveNetwork(networkId)} is not supported`)
    //     }
    //     return t(`Switching to ${resolveNetwork(networkId)}`)
    //   }
    // })
  }

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  const network = process.env.REACT_APP_NETWORK
  const rpcUrl = `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={resolveChainID(network)}
        connectors={{
          walletconnect: { rpcUrl },
        }}
      >
        <KaleidoProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </KaleidoProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
