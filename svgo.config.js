module.exports = {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false, // Keep viewBox
            convertPathData: {
              floatPrecision: 2, // Round coordinates to 2 decimal places
            },
          },
        },
      },
      "removeDimensions", // Remove width/height attributes
      "removeXMLNS", // Remove xmlns attribute
    ],
  };