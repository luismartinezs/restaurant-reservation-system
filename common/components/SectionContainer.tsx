import { Container } from '@mantine/core'
import React from 'react'

export const SectionContainer = ({children}:{
  children: React.ReactNode
}) => {
  return (
    <Container>
      <div className="my-16">
      {children}
      </div>
      </Container>
  )
}
