// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface CloudinaryImageStoryblok {
  src?: string;
  alt?: string;
  preload?: boolean;
  component: "CloudinaryImage";
  _uid: string;
  [k: string]: any;
}

export interface HeroStoryblok {
  image?: ImageStoryblok[];
  title?: string;
  subtitle?: string;
  component: "hero";
  _uid: string;
  [k: string]: any;
}

export interface HeroTitleStoryblok {
  title?: string;
  showFeaturedImage?: boolean;
  component: "HeroTitle";
  _uid: string;
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface ImageStoryblok {
  image?: AssetStoryblok;
  cloudinaryId?: string;
  url?: string;
  width?: string;
  height?: string;
  component: "image";
  _uid: string;
  [k: string]: any;
}

export interface LogoStoryblok {
  image?: AssetStoryblok;
  cloudinaryId?: string;
  url?: string;
  component: "logo";
  _uid: string;
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | CloudinaryImageStoryblok
    | HeroStoryblok
    | HeroTitleStoryblok
    | ImageStoryblok
    | LogoStoryblok
    | PageStoryblok
    | PostStoryblok
    | RestaurantStoryblok
    | RichTextStoryblok
    | SideNoteStoryblok
    | SplitHeroStoryblok
    | TestStoryblok
    | YoutubeVideoStoryblok
  )[];
  title?: string;
  description?: string;
  tags?: string;
  featuredImage?: string;
  socialImage?: string;
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface PostStoryblok {
  body?: (
    | CloudinaryImageStoryblok
    | HeroStoryblok
    | HeroTitleStoryblok
    | ImageStoryblok
    | LogoStoryblok
    | PageStoryblok
    | PostStoryblok
    | RestaurantStoryblok
    | RichTextStoryblok
    | SideNoteStoryblok
    | SplitHeroStoryblok
    | TestStoryblok
    | YoutubeVideoStoryblok
  )[];
  title?: string;
  description?: string;
  tags?: string;
  featuredImage?: string;
  socialImage?: string;
  postTitle?: string;
  createdAt?: string;
  component: "post";
  _uid: string;
  [k: string]: any;
}

export interface RestaurantStoryblok {
  body?: (
    | CloudinaryImageStoryblok
    | HeroStoryblok
    | HeroTitleStoryblok
    | ImageStoryblok
    | LogoStoryblok
    | PageStoryblok
    | PostStoryblok
    | RestaurantStoryblok
    | RichTextStoryblok
    | SideNoteStoryblok
    | SplitHeroStoryblok
    | TestStoryblok
    | YoutubeVideoStoryblok
  )[];
  title?: string;
  description?: string;
  socialImage?: string;
  component: "restaurant";
  _uid: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface RichTextStoryblok {
  content?: RichtextStoryblok;
  component: "RichText";
  _uid: string;
  [k: string]: any;
}

export interface SideNoteStoryblok {
  content?: RichtextStoryblok;
  type?: "" | "note" | "warning";
  component: "SideNote";
  _uid: string;
  [k: string]: any;
}

export interface SplitHeroStoryblok {
  title?: string;
  textContent?: string;
  logo?: LogoStoryblok[];
  image?: ImageStoryblok[];
  component: "split hero";
  _uid: string;
  [k: string]: any;
}

export interface TestStoryblok {
  test?: string;
  component: "test";
  _uid: string;
  [k: string]: any;
}

export interface YoutubeVideoStoryblok {
  youtubeId?: string;
  timestamp?: string;
  caption?: string;
  component: "YoutubeVideo";
  _uid: string;
  [k: string]: any;
}
