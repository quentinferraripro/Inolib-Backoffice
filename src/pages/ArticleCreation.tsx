import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { nanoid } from "nanoid";
import { gql, useMutation } from "@apollo/client";

import quillTitleConfig from "../config/quillTitleConfig";
import quillContentConfig from "../config/quillContentConfig";
import TestModal from "@components/TestModal";

//requete POST
const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    newDocument(title: $title, content: $content) {
      id
      title
      content
      createdAt
    }
  }
`;

export default function ArticleCreation() {
  const [createArticle] = useMutation(CREATE_ARTICLE);

  const quillTitleRef = useRef<ReactQuill | null>(null);
  const quillContentRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //gestion du re-render du composant lors du clic des bouton de la toolbar
  const [changed, setChanged] = useState(false);

  const handleTitle = (titleValue: string) => {
    setTitle(titleValue);
  };

  const handleContent = (contentValue: string) => {
    setContent(contentValue);
  };

  const handleToolbarEvent = useCallback(() => {
    setChanged(!changed);
  }, [changed]);

  //a la soumission formulaire appel de la requete POST définie plus haut
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await createArticle({
      variables: {
        title,
        content,
      },
    });

    console.log(response);
  };

  useEffect(() => {
    const contentEditor = quillContentRef.current?.getEditor();

    const keyboardTitle = quillTitleRef.current?.getEditor().getModule("keyboard") as { bindings: unknown[] };
    const keyboardContent = contentEditor?.getModule("keyboard") as { bindings: unknown[] };

    delete keyboardTitle.bindings[9];
    delete keyboardContent.bindings[9];

    const contentToolbar = contentEditor?.root.parentElement?.parentElement?.querySelector(".ql-toolbar");
    const contentToolbarElements = contentToolbar?.querySelectorAll("button, span");

    //ecoute chaque bouton, au clic provoque au re-render
    //et il y une surveillance de la className du boutton pour lui ajouter le bon aria-label
    // ["align", "bold", "underline", "italic", "color", "background", "list", "link", "image"],
    contentToolbarElements?.forEach((element) => {
      switch (element.tagName) {
        case "BUTTON": {
          switch (element.className) {
            case "ql-bold": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Activer gras");
              break;
            }

            case "ql-bold ql-active": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Désactiver gras");
              break;
            }

            case "ql-underline": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Activer soulignement");
              break;
            }

            case "ql-underline ql-active": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Desactiver soulignement");
              break;
            }

            case "ql-italic": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Activer italique");
              break;
            }

            case "ql-italic ql-active": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "Desactiver italique");
              break;
            }

            case "ql-link": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "creer un lien");
              break;
            }

            case "ql-image": {
              element.addEventListener("click", handleToolbarEvent, { once: true });
              element.setAttribute("aria-label", "ajouter une image");
              break;
            }
          }
          break;
        }

        case "SPAN": {
          switch (true) {
            case element.className.includes("ql-align"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              element.setAttribute("aria-label", "changer alignement texte");
              //ajout d'attribut pour mimer le comportement d'un <select>
              element.setAttribute("role", "listbox");

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.removeAttribute("aria-selected");

                switch (item.getAttribute("data-value")) {
                  case "center": {
                    item.setAttribute("aria-label", "aligner au centre");
                    break;
                  }

                  case "right": {
                    item.setAttribute("aria-label", "aligner à droite");
                    break;
                  }

                  case "justify": {
                    item.setAttribute("aria-label", "justifier");
                    break;
                  }

                  default: {
                    item.setAttribute("aria-label", "aligner à gauche");
                    break;
                  }
                }

                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                if (item.className.includes("ql-selected")) {
                  item.setAttribute("aria-selected", "");
                  element.setAttribute("aria-label", item.getAttribute("aria-label"));
                }
              });

              element.setAttribute(
                "aria-activedescendant",
                element.querySelector(".ql-picker-item.ql-selected")?.getAttribute("id")
              );
              break;
            }
          }
          break;
        }
      }
    });
  }, [handleToolbarEvent]);

  return (
    <div className="mx-28 mt-10 text-[#0B3168]">
      <header>
        <h1 className="text-3xl font-bold underline mb-10">Créer votre article</h1>
      </header>
      <form onSubmit={(event) => void (async (event) => await handleSubmit(event))(event)}>
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
        <TestModal />
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}
