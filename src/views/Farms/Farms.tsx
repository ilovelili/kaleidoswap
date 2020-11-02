import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import logo from '../../assets/img/logo.svg'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import Farm from '../Farm'
import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={logo} height="120" />}
                subtitle={t(
                  'Earn KALEIDO tokens by staking KaleidoSwap SLP Tokens.',
                )}
                title="Select Your Favorite Kaleido Pools"
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
