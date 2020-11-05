import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logo from '../../assets/img/logo.svg'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={120} alt="logo" />}
        title={t('KaleidoSwap Bakery is Ready')}
        subtitle={t(
          'Stake KaleidoSwap LP tokens to claim your own KALEIDO token!',
        )}
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        <span role="img" aria-labelledby="">
          🏆
        </span>
        <b>{t('Pro Tip')}</b>:{' '}
        {t(
          'KALEIDO-ETH LP token pool yields 4.8x more token rewards per block.',
        )}{' '}
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text={t('👓 See the Menu')} to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
