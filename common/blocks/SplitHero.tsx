import { SplitHeroStoryblok } from '@/lib/storyblok/component-types-sb'
import React from 'react'
import { SplitHero as SplitHeroComponent } from '../components/SplitHero'
import invariant from 'tiny-invariant'
import {Image} from './Image'
import { Logo } from './Logo'

export const SplitHero = ({blok}:{
  blok: SplitHeroStoryblok
}) => {
  const {title, textContent, logo, image } = blok

  invariant(title, 'Missing title')
  invariant(image, 'Missing image')

  return (
    <SplitHeroComponent
      title={title}
      textContent={textContent}
      image={<Image blok={image[0]} />}
      logo={<Logo blok={logo && logo[0]} />}
    />
  )
}
