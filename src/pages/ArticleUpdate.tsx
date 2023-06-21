import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { nanoid } from "nanoid";
import { gql, useMutation, useQuery } from "@apollo/client";
import UpdateModal from "../ui/ArticleDashboard/UpdateModal";

import quillTitleConfig from "../config/quillTitleConfig";
import quillContentConfig from "../config/quillContentConfig";
import { useParams } from "react-router-dom";

type Data = {
  findDocument: Document[];
};

type Document = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

const observeOptions = (listbox: Element, listboxLabel: string) => {
  const classObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target as Element;

      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (target.classList.contains("ql-selected")) {
          listbox.querySelectorAll(".ql-picker-item").forEach((option) => {
            option.removeAttribute("aria-selected");
          });
          target.setAttribute("aria-selected", "");

          listbox.setAttribute("aria-label", target.getAttribute("aria-label"));
        } else if (listbox.querySelector(".ql-selected") === null) {
          listbox.querySelectorAll(".ql-picker-item").forEach((option) => {
            option.removeAttribute("aria-selected");
          });

          listbox.setAttribute("aria-label", listboxLabel);
        }
      }
    });
  });

  classObserver.observe(listbox, { attributes: true, subtree: true });

  return classObserver;
};

export default function ArticleUpdate() {
  const { id } = useParams();
  const ARTICLE = gql`
    query findDocument($id: Cuid!) {
      findDocument(id: $id) {
        id
        title
        content
        createdAt
      }
    }
  `;
  // requete UPDATE
  const UPDATE_ARTICLE = gql`
    mutation updateDocument($id: Cuid!, $title: String!, $content: String!) {
      updateDocument(id: $id, title: $title, content: $content) {
        id
        title
        content
        createdAt
      }
    }
  `;

  const { data, error, loading } = useQuery<Data>(ARTICLE, {
    variables: {
      id,
    },
  });

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await updateArticle({
      variables: {
        id,
        title,
        content,
      },
    });

    window.location.reload();
    console.log(response);
  };

  const [updateArticle] = useMutation(UPDATE_ARTICLE);

  //gestion de la modale
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  const quillTitleRef = useRef<ReactQuill | null>(null);
  const quillContentRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

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

  useEffect(() => {
    if (data?.findDocument[0]) {
      setTitle(data?.findDocument[0].title || "");
      setContent(data?.findDocument[0].content || "");
    }

    const titleEditor = quillTitleRef.current?.getEditor();
    const contentEditor = quillContentRef.current?.getEditor();

    const keyboardTitle = titleEditor?.getModule("keyboard") as { bindings: unknown[] } | undefined;
    const keyboardContent = contentEditor?.getModule("keyboard") as { bindings: unknown[] } | undefined;

    // empeche de sortir de la toolbar avec tab
    delete keyboardTitle?.bindings[9];
    delete keyboardContent?.bindings[9];

    const contentToolbar = contentEditor?.root.parentElement?.parentElement?.querySelector(".ql-toolbar");
    const contentToolbarElements = contentToolbar?.querySelectorAll("button, span");
    const titleToolbar = titleEditor?.root.parentElement?.parentElement?.querySelector(".ql-toolbar");
    const titleToolbarElements = titleToolbar?.querySelectorAll("button, span");

    const classObservers: MutationObserver[] = [];

    // gestion des nom des boutons deroulants
    const aligncontentButton = contentToolbar?.querySelector(".ql-align");
    if (aligncontentButton?.getAttribute("aria-label") === null) {
      aligncontentButton?.setAttribute("aria-label", "changer alignement texte");
    }
    const aligntitleButton = titleToolbar?.querySelector(".ql-align");
    if (aligntitleButton?.getAttribute("aria-label") === null) {
      aligntitleButton?.setAttribute("aria-label", "changer alignement texte");
    }

    const colorcontentButton = contentToolbar?.querySelector(".ql-color");
    if (colorcontentButton?.getAttribute("aria-label") === null) {
      colorcontentButton?.setAttribute("aria-label", "changer couleur texte");
    }
    const colortitleButton = titleToolbar?.querySelector(".ql-color");
    if (colortitleButton?.getAttribute("aria-label") === null) {
      colortitleButton?.setAttribute("aria-label", "changer couleur texte");
    }

    //ecoute chaque bouton, au clic provoque au re-render
    //et il y une surveillance de la className du boutton pour lui ajouter le bon aria-label
    contentToolbarElements?.forEach((element) => {
      switch (element.tagName) {
        case "BUTTON":
          {
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

              case "ql-list":
                {
                  switch (element.value) {
                    case "ordered": {
                      element.addEventListener("click", handleToolbarEvent, { once: true });
                      element.setAttribute("aria-label", "transformer en liste ordonée");
                      break;
                    }
                    case "bullet": {
                      element.addEventListener("click", handleToolbarEvent, { once: true });
                      element.setAttribute("aria-label", "transformer en liste à puce");
                      break;
                    }
                  }
                  break;
                }
                break;
            }
          }
          break;

        case "SPAN": {
          switch (true) {
            case element.className.includes("ql-align"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "changer alignement texte"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "aligner à gauche");
                    break;
                  }

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
                }
              });

              const selectedItem = element.querySelector(".ql-picker-item.ql-selected");

              //ajout d'attribut pour mimer le comportement d'un <select>
              element.setAttribute("role", "listbox");
              element.setAttribute("aria-activedescendant", selectedItem?.getAttribute("id"));
              break;
            }

            case element.className.includes("ql-color"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "changer couleur texte"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "bleu");
                    break;
                  }

                  case "black": {
                    item.setAttribute("aria-label", "noir");
                    break;
                  }

                  case "#0B3168": {
                    item.setAttribute("aria-label", "bleu");
                    break;
                  }

                  case "white": {
                    item.setAttribute("aria-label", "blanc");
                    break;
                  }
                }
              });
              const selectedItem = element.querySelector(".ql-picker-item.ql-selected");

              //ajout d'attribut pour mimer le comportement d'un <select>
              element.setAttribute("role", "listbox");
              element.setAttribute("aria-activedescendant", selectedItem?.getAttribute("id"));
              break;
            }
          }
          break;
        }
      }
    });

    titleToolbarElements?.forEach((element) => {
      switch (element.tagName) {
        case "BUTTON":
          {
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

              case "ql-list":
                {
                  switch (element.value) {
                    case "ordered": {
                      element.addEventListener("click", handleToolbarEvent, { once: true });
                      element.setAttribute("aria-label", "transformer en liste ordonée");
                      break;
                    }
                    case "bullet": {
                      element.addEventListener("click", handleToolbarEvent, { once: true });
                      element.setAttribute("aria-label", "transformer en liste à puce");
                      break;
                    }
                  }
                  break;
                }
                break;
            }
          }
          break;

        case "SPAN": {
          switch (true) {
            case element.className.includes("ql-align"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "changer alignement texte"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "aligner à gauche");
                    break;
                  }

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
                }
              });

              const selectedItem = element.querySelector(".ql-picker-item.ql-selected");

              //ajout d'attribut pour mimer le comportement d'un <select>
              element.setAttribute("role", "listbox");
              element.setAttribute("aria-activedescendant", selectedItem?.getAttribute("id"));
              break;
            }

            case element.className.includes("ql-color"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "changer couleur texte"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "bleu");
                    break;
                  }

                  case "black": {
                    item.setAttribute("aria-label", "noir");
                    break;
                  }

                  case "#0B3168": {
                    item.setAttribute("aria-label", "bleu");
                    break;
                  }

                  case "white": {
                    item.setAttribute("aria-label", "blanc");
                    break;
                  }
                }
              });
              const selectedItem = element.querySelector(".ql-picker-item.ql-selected");

              //ajout d'attribut pour mimer le comportement d'un <select>
              element.setAttribute("role", "listbox");
              element.setAttribute("aria-activedescendant", selectedItem?.getAttribute("id"));
              break;
            }
          }
          break;
        }
      }
    });

    return () => {
      classObservers.forEach((classObserver) => {
        classObserver.disconnect();
      });
    };
  }, [handleToolbarEvent, data?.findDocument]);

  return (
    <>
      {error !== undefined ? (
        <p>{error.message}</p>
      ) : loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="mx-28 mt-10 text-[#0B3168]">
          {data !== undefined ? (
            <>
              <header>
                <h1 className="text-3xl font-bold underline mb-10">Modifier votre article</h1>
              </header>
              <form onSubmit={(event) => void (async (event) => await handleUpdate(event))(event)}>
                <p className="text-xl² mb-5 font-bold">Titre de votre article</p>
                <div>
                  <ReactQuill
                    ref={quillTitleRef}
                    value={title}
                    onChange={handleTitle}
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
                    modules={quillContentConfig.modules}
                    formats={quillContentConfig.formats}
                    style={{ height: "10rem" }}
                  ></ReactQuill>
                </div>
                <div className="my-16">
                  <button className="p-2 border-[1px] border-black rounded lg">ajouter une image</button>
                </div>
                <button onClick={handleOpenModal} type="button">
                  Valider
                </button>
                {open && (
                  <UpdateModal
                    title={title}
                    open={open}
                    titleCloseButton="Fermer"
                    titleCreateButton="Mettre à jour"
                    styles="absolute top-1/2 left-1/2"
                    onClose={handleCloseModal}
                    onSubmit={handleUpdate}
                  />
                )}
              </form>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
