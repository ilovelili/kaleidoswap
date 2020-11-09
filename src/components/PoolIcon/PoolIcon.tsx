import React from 'react'
import styled from 'styled-components'
import pool from '../../assets/img/pool.svg'

const PoolIcon: React.FC = () => (
  <StyledPoolIcon>
    <img src={pool} height="45" alt="Pool" />
  </StyledPoolIcon>
)

const StyledPoolIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[200]};
  font-size: 36px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: inset 4px 4px 8px ${(props) => props.theme.color.grey[300]},
    inset -6px -6px 12px ${(props) => props.theme.color.grey[100]};
  margin: 0 auto ${(props) => props.theme.spacing[3]}px;
`

export default PoolIcon
