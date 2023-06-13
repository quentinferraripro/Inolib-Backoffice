export default {
  modules: {
    toolbar: [
      [{ size: ["18px", "20px", "22px", "24px", "26px", "28px"] }],

      [{ align: [] }],
      ["bold", "underline", "italic"],
      [
        {
          color: ["#0B3168", "black", "white"],
        },
        { background: [] },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
  formats: ["align", "bold", "underline", "italic", "color", "background", "list", "link", "image"],
};
