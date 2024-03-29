import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import KaleidoIcon from '../../../components/KaleidoIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useKaleido from '../../../hooks/useKaleido'
import { getTokenAddress, getTokenSupply } from '../../../kaleido/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'
import useIsMounted from '../../../hooks/useIsMounted'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [end, sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const { t } = useTranslation()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const kaleido = useKaleido()
  const tokenBalance = useTokenBalance(getTokenAddress(kaleido))
  const { account }: { account: any } = useWallet()
  const isMounted = useIsMounted()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getTokenSupply(kaleido)
      if (isMounted()) {
        setTotalSupply(supply)
      }
    }
    if (kaleido) {
      fetchTotalSupply()
    }
  }, [kaleido, setTotalSupply, isMounted])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <KaleidoIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text={t('Your KALEIDO Balance')} />
                <Value
                  value={!!account ? getBalanceNumber(tokenBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> KALEIDO
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text={t('Total KALEIDO Supply')} />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
          />
        </CardContent>
        <Footnote>
          New rewards per block
          <FootnoteValue>10 KALEIDO</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
