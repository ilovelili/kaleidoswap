import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useKaleido from '../../hooks/useKaleido'
import { getBakeryContract } from '../../kaleido/utils'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string }>()
  const { pid, lpToken, lpTokenAddress, earnToken, name, icon } = useFarm(
    farmId,
  ) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const kaleido = useKaleido()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  useRedeem(getBakeryContract(kaleido))

  const lpTokenName = useMemo(() => {
    return lpToken
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  const { t } = useTranslation()
  const network = process.env.REACT_APP_NETWORK
  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={t(`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`)}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake lpContract={lpContract} pid={pid} tokenName={lpToken} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️{' '}
          {t(
            'Every time you stake and unstake LP tokens, the contract will automagically harvest KALEIDO rewards for you!',
          )}
        </StyledInfo>
        <Spacer size="md" />
        <StyledLink
          target="__blank"
          href={
            network == 'mainnet'
              ? `https://etherscan.io/address/${lpTokenAddress}`
              : `https://${network}.etherscan.io/address/${lpTokenAddress}`
          }
        >
          {lpTokenName} {t('Info')}
        </StyledLink>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Farm
