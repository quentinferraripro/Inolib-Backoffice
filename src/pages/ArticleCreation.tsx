import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillTitleConfig from "../config/quillTitleConfig";
import quillContentConfig from "../config/quillContentConfig";

export default function ArticleCreation() {
  const quillTitleRef = useRef<ReactQuill | null>(null);
  const quillContentRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = (titleValue) => {
    console.log(titleValue);
  };

  const handleContent = (contentValue) => {
    console.log(contentValue);
  };

  useEffect(() => {
    const keyboard = quillTitleRef.current?.getEditor().getModule("keyboard") as { bindings: unknown[] };

    delete keyboard.bindings[9];
  }, []);

  useEffect(() => {
    const keyboard = quillContentRef.current?.getEditor().getModule("keyboard") as { bindings: unknown[] };

    delete keyboard.bindings[9];
  }, []);

  // Get ref to the toolbar, its not available through the quill api ughh
  const query = editor.container.parentElement.getElementsByClassName("ql-toolbar");
  if (query.length !== 1) {
    // No toolbars found OR multiple which is not what we expect either
    return;
  }

  const toolBar = query[0];

  // apply aria labels to base buttons
  const buttons = toolBar.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const className = button.getAttribute("class").toLowerCase();

    if (className.indexOf("bold") >= 0) {
      button.setAttribute("aria-label", "Toggle bold text");
    } else if (className.indexOf("italic") >= 0) {
      button.setAttribute("aria-label", "Toggle italic text");
    } else if (className.indexOf("underline") >= 0) {
      button.setAttribute("aria-label", "Toggle underline text");
    } else if (className.indexOf("blockquote") >= 0) {
      button.setAttribute("aria-label", "Toggle blockquote text");
    } else if (className.indexOf("list") >= 0 && button.value === "ordered") {
      button.setAttribute("aria-label", "Toggle ordered list");
    } else if (className.indexOf("list") >= 0 && button.value === "bullet") {
      button.setAttribute("aria-label", "Toggle bulleted list");
    }
  }

  return (
    <div className="mx-28">
      <header>
        <h1 className="text-3xl font-bold underline mb-10">Créer votre article</h1>
      </header>
      <form>
        <p className="text-xl² mb-5 font-bold">Titre de votre article</p>
        <div>
          <ReactQuill
            ref={quillTitleRef}
            value={title}
            onChange={handleTitle}
            placeholder="espace de rédaction"
            modules={quillTitleConfig.modules}
            formats={quillTitleConfig.formats}
            style={{ height: "10rem" }}
          />
        </div>
        <p className="text-xl² my-16 font-bold">Contenu de votre article</p>
        <div>
          <ReactQuill
            ref={quillContentRef}
            value={content}
            onChange={handleContent}
            placeholder="espace de rédaction"
            modules={quillContentConfig.modules}
            formats={quillContentConfig.formats}
            style={{ height: "10rem" }}
          />
        </div>
        <div className="my-16">
          <button className="p-2 border-[1px] border-black rounded lg">ajouter une image</button>
        </div>
      </form>
    </div>
  );
}
