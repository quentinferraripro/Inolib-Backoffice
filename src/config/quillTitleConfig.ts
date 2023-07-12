const config = {
  modules: {
    toolbar: [
      [{ size: ["18px", "20px", "22px", "24px", "26px", "28px"] }],

      [{ align: [] }],
      ["bold", "underline", "italic"],
      [
        {
          color: ["#0B3168", "black", "white"],
        },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  },
  formats: ["size", "align", "bold", "underline", "italic", "color", "list"],
};

export default config;
