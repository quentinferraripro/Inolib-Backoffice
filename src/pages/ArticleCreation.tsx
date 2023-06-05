import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ArticleCreation() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    const keyboard = quillRef.current?.getEditor().getModule("keyboard") as { bindings: unknown[] };

    delete keyboard.bindings[9];
  }, []);

  return (
    <>
      <header>
        <p className="text-3xl font-bold underline">Hello Article !</p>
      </header>
      <form>
        <div>
          <ReactQuill ref={quillRef} value={content} onChange={handleChange} />
        </div>
        <button className="p-2 border-[1px] border-black rounded lg">ajouter une image</button>
      </form>
    </>
  );
}
