import StoryblokProvider from "@/common/components/StoryblokProvider";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoryblokProvider>{children}</StoryblokProvider>;
}
