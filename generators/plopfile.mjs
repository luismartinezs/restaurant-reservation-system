export default function plopGenerator(plop) {
  plop.setGenerator("route", {
    description: "Blok",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "blok name (same as the name in storyblok CMS)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../common/blocks/{{pascalCase name}}.tsx",
        templateFile: "templates/blok/blok.tsx.hbs",
      },
      {
        type: "append",
        path: "../app/restaurants/[id]/layout.tsx",
        pattern: /(\/\/ c16e1d9a append blok imports here)/gi,
        template: `import { {{pascalCase name}} } from '@/common/blocks/{{pascalCase name}}';`,
      },
      {
        type: "append",
        path: "../app/restaurants/[id]/layout.tsx",
        pattern: /(\/\/ 8ce379f0 append blok components here)/gi,
        template: `  "{{name}}": {{pascalCase name}},`,
      },
    ],
  });
}
