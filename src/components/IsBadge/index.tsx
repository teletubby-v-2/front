import { Badge } from 'antd'
import React from 'react'

export interface IsBadgeProps {
  badge?: boolean
}

export const IsBadge: React.FC<IsBadgeProps> = ({ badge, children }) => {
  if (badge) {
    return (
      <Badge dot className="mr-1">
        <>{children}</>
      </Badge>
    )
  }

  return <>{children}</>
}
