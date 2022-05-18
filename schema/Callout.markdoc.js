module.exports = {
  render: "markdoc-callout",
  description: "Display the enclosed content in a callout box",
  children: ["paragraph"],
  attributes: {
    type: {
      type: String,
      default: "caution",
      matches: ["caution", "warning"],
      description:
        'Controls the color and icon of the callout. Can be: "caution", "warning"',
    },
    title: {
      type: String,
      description: "The title displayed at the top of the callout",
    },
  },
};
