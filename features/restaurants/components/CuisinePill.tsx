import { Badge } from "@mantine/core";

// light theme
const cuisineColorMap = {
  Italian: {
    text: "gray.8",
    bg: "red.1",
  },
  Japanese: {
    text: "gray.8",
    bg: "gray.1",
  },
  Mexican: {
    text: "gray.8",
    bg: "green.1",
  },
  French: {
    text: "gray.8",
    bg: "blue.1",
  },
  Indian: {
    text: "gray.8",
    bg: "orange.1",
  },
  Chinese: {
    text: "gray.8",
    bg: "red.2",
  },
  American: {
    text: "gray.8",
    bg: "blue.2",
  },
  Canadian: {
    text: "gray.8",
    bg: "red.1",
  },
  MiddleEastern: {
    text: "gray.8",
    bg: "yellow.2",
  },
  German: {
    text: "gray.8",
    bg: "yellow.1",
  },
  British: {
    text: "gray.8",
    bg: "indigo.1",
  },
  Spanish: {
    text: "gray.8",
    bg: "orange.2",
  },
  Vegan: {
    text: "gray.8",
    bg: "lime.2",
  },
  Vietnamese: {
    text: "gray.8",
    bg: "teal.1",
  },
  Thai: {
    text: "gray.8",
    bg: "pink.1",
  },
  Mediterranean: {
    text: "gray.8",
    bg: "cyan.1",
  },
  Hungarian: {
    text: "gray.8",
    bg: "grape.1",
  },
  Australian: {
    text: "gray.8",
    bg: "indigo.2",
  },
  Seafood: {
    text: "gray.8",
    bg: "cyan.2",
  },
  Korean: {
    text: "gray.8",
    bg: "pink.2",
  },
  Taiwanese: {
    text: "gray.8",
    bg: "violet.1",
  },
  SriLankan: {
    text: "gray.8",
    bg: "orange.2",
  },
  Portuguese: {
    text: "gray.8",
    bg: "green.2",
  },
  default: {
    text: "gray.8",
    bg: "gray.2",
  }
};

// dark theme
// const cuisineColorMap = {
//   Italian: {
//     text: "red.1",
//     bg: "red.9",
//   },
//   Japanese: {
//     text: "gray.1",
//     bg: "gray.8",
//   },
//   Mexican: {
//     text: "green.1",
//     bg: "green.9",
//   },
//   French: {
//     text: "blue.1",
//     bg: "blue.9",
//   },
//   Indian: {
//     text: "orange.1",
//     bg: "orange.9",
//   },
//   Chinese: {
//     text: "red.2",
//     bg: "red.8",
//   },
//   American: {
//     text: "blue.2",
//     bg: "blue.8",
//   },
//   Canadian: {
//     text: "red.1",
//     bg: "red.9",
//   },
//   MiddleEastern: {
//     text: "yellow.2",
//     bg: "yellow.9",
//   },
//   German: {
//     text: "yellow.1",
//     bg: "yellow.8",
//   },
//   British: {
//     text: "indigo.1",
//     bg: "indigo.9",
//   },
//   Spanish: {
//     text: "orange.2",
//     bg: "orange.8",
//   },
//   Vegan: {
//     text: "lime.2",
//     bg: "lime.9",
//   },
//   Vietnamese: {
//     text: "teal.1",
//     bg: "teal.9",
//   },
//   Thai: {
//     text: "pink.1",
//     bg: "pink.9",
//   },
//   Mediterranean: {
//     text: "cyan.1",
//     bg: "cyan.9",
//   },
//   Hungarian: {
//     text: "grape.1",
//     bg: "grape.9",
//   },
//   Australian: {
//     text: "indigo.2",
//     bg: "indigo.8",
//   },
//   Seafood: {
//     text: "cyan.2",
//     bg: "cyan.8",
//   },
//   Korean: {
//     text: "pink.2",
//     bg: "pink.8",
//   },
//   Taiwanese: {
//     text: "violet.1",
//     bg: "violet.9",
//   },
//   SriLankan: {
//     text: "orange.2",
//     bg: "orange.8",
//   },
//   Portuguese: {
//     text: "green.2",
//     bg: "green.8",
//   },
//   default: {
//     text: "gray.2",
//     bg: "gray.8",
//   }
// };

export function CuisinePill({ cuisine }: { cuisine: string }) {
  const color =
    cuisine in cuisineColorMap
      ? cuisineColorMap[cuisine as keyof typeof cuisineColorMap]
      : cuisineColorMap.default;

  return <Badge color={color.bg} c={color.text}>{cuisine}</Badge>;
}