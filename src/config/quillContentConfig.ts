const config = {
  modules: {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      [{ align: [] }],
      ["bold", "underline", "italic"],
      [
        {
          color: ["#0B3168", "black", "white"],
        },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
  formats: ["size", "align", "bold", "underline", "italic", "color", "list", "link", "image"],
};

export default config;
