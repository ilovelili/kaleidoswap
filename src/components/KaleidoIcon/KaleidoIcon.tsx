import React from 'react'

interface KaleidoIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const KaleidoIcon: React.FC<KaleidoIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    aria-labelledby=""
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    🌟
  </span>
)

export default KaleidoIcon
