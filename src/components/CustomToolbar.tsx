// import React from "react";
// import { render } from "react-dom";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./styles.css";

// const CustomHeart = () => <span>♥</span>;

// /**
//  * Custom toolbar component including the custom heart button and dropdowns
//  */
// const CustomToolbar = () => (
//   <div id="toolbar">
//     <select className="ql-font">
//       <option value="arial" selected>
//         Arial
//       </option>
//       <option value="comic-sans">Comic Sans</option>
//       <option value="courier-new">Courier New</option>
//       <option value="georgia">Georgia</option>
//       <option value="helvetica">Helvetica</option>
//       <option value="lucida">Lucida</option>
//     </select>
//     <select className="ql-size">
//       <option value="extra-small">Size 1</option>
//       <option value="small">Size 2</option>
//       <option value="medium" selected>
//         Size 3
//       </option>
//       <option value="large">Size 4</option>
//     </select>
//     <select className="ql-align" />
//     <select className="ql-color" />
//     <select className="ql-background" />
//     <button className="ql-clean" />
//     <button className="ql-insertHeart">
//       <CustomHeart />
//     </button>
//   </div>
// );

// // Add sizes to whitelist and register them
// const Size = Quill.import("formats/size") as ReactQuill;
// Size.whitelist = ["extra-small", "small", "medium", "large"];
// Quill.register(Size, true);

// // Add fonts to whitelist and register them
// const Font = (Quill.import("formats/font") as ReactQuill | null) > null;
// Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida"];
// Quill.register(Font, true);

// /**
//  * Editor component with custom toolbar and content containers
//  */
// class Editor extends React.Component {
//   state = { editorHtml: "" };

//   handleChange = (html) => {
//     this.setState({ editorHtml: html as HTMLElement });
//   };

//   static modules = {
//     toolbar: {
//       container: "#toolbar",
//     },
//   };

//   static formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//   ];

//   render() {
//     return (
//       <div className="text-editor">
//         <CustomToolbar />
//         <ReactQuill
//           value={this.state.editorHtml}
//           onChange={this.handleChange}
//           placeholder="zone de texte"
//           modules={Editor.modules}
//           formats={Editor.formats}
//         />
//       </div>
//     );
//   }
// }

// const App = () => (
//   <div className="custom-toolbar-example">
//     <h3>Custom Toolbar with React Quill (Fully working)</h3>
//     <Editor placeholder={"Write something or insert a heart ♥"} />
//   </div>
// );

// render(<App />, document.getElementById("root"));
