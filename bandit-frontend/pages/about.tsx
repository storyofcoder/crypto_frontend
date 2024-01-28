import React from 'react'

import Hero from '../src/views/About/components/hero'
import Backers from '../src/views/About/components/backers'
import Bandit from '../src/views/About/components/bandit'
import Roadmap from '../src/views/About/components/roadmap'
import Team from '../src/views/About/components/team'
import { PageMeta } from '../src/components/molecules/AppLayout/PageMeta'

const about = () => {
  return (
    <div>
      <PageMeta />
      <Hero />
      <Backers />
      <Bandit />
      <Roadmap />
      <Team />
    </div>
  )
}

export default about
