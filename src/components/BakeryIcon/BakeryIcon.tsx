import React from 'react'
import styled from 'styled-components'
import lp from '../../assets/img/lp.svg'

const BekeryIcon: React.FC = () => (
  <StyledBakeryIcon>
    <img src={lp} height="70" alt="bakery" />
  </StyledBakeryIcon>
)

const StyledBakeryIcon = styled.div`
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

export default BekeryIcon
