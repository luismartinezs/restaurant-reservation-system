import { storyblokEditable } from "@storyblok/react/rsc";

export const Test = ({ blok }) => {
  console.log('====TEST====');

  console.log("test component", JSON.stringify(blok, null, 2));

  return <div className="text-2xl mb-10" {...storyblokEditable(blok)}>{blok.test}</div>;
};
