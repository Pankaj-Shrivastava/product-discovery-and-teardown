import React from 'react'
import {
  Compass,
  TrendingUp,
  Users,
  Cpu,
  Brain,
  ShieldCheck,
  type LucideProps,
} from 'lucide-react'

interface PillarIconProps extends LucideProps {
  name: string
}

export const PillarIcon: React.FC<PillarIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Compass':
      return <Compass {...props} />
    case 'TrendingUp':
      return <TrendingUp {...props} />
    case 'Users':
      return <Users {...props} />
    case 'Cpu':
      return <Cpu {...props} />
    case 'Brain':
      return <Brain {...props} />
    case 'ShieldCheck':
      return <ShieldCheck {...props} />
    default:
      return <Compass {...props} />
  }
}
