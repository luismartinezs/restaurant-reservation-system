import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

export const Restaurant = ({ blok }) => {
  console.log('====RESTAURANT====');

  console.log(JSON.stringify(blok, null, 2));

  return (
    <div {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
