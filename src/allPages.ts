export const allPages: any = [
  {
    name: "Introduction",
    pages: [
      {
        name: "Introduction",
        href: "/docs",
      },
      {
        name: "Writing Guide",
        href: "/docs/writing",
      },
    ],
  },
  {
    name: "Mines",
    pages: [
      {
        name: "Spawn World",
        href: "/docs/worlds/spawn",
        dropdown: [
          { name: "Wood Mine", href: "/docs/mines/wood" },
          { name: "Stone Mine", href: "/docs/mines/stone" },
          { name: "Coal Mine", href: "/docs/mines/coal" },
        ],
      },
    ],
  },
  {
    name: "Staff Concepts",
    pages: [{ name: "Classified Resources", href: "/docs/classified" }],
  },
  {
    name: "Other",
    pages: [
      { name: "Cease", href: "/cease" },
      { name: "Stats", href: "/stats" },
      {
        name: "Join Offical Box Discord",
        href: "https://discord.gg/HrbY4qkMRE",
        description: "Talk to the community of FireAnIce",
      },
      {
        name: "Join Wiki Discord",
        href: "https://discord.gg/6rUxe2wa4X",
        description: "Report issues using the Wiki",
      },
    ],
  },
];
