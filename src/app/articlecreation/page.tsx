"use client";

import "react-quill/dist/quill.snow.css";

import { gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import quillTitleConfig from "../../config/quillTitleConfig";
import quillContentConfig from "../../config/quillContentConfig";
import { setAttribute } from "../../helpers";
import CreateModal from "../../ui/ArticleDashboard/ArticleCreateModal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

          listbox.setAttribute("aria-label", target.getAttribute("aria-label") as string);
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

const ArticleCreation = () => {
  //gestion de la modale
  const [open, setOpen] = useState(false);

  const handleCloseCreationModal = () => setOpen(false);
  const handleOpenCreationModal = () => {
    setOpen(true);
    if (createModalRef.current) {
      createModalRef.current.focus();
    }
  };

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
  const handleCreation = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      const response = await createArticle({
        variables: {
          title,
          content,
        },
      });

      window.location.reload();
      console.log(response);
    })();
  };

  const createModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    const titlecontentButton = titleToolbar?.querySelector(".ql-color");
    if (titlecontentButton?.getAttribute("aria-label") === null) {
      titlecontentButton?.setAttribute("aria-label", "changer couleur texte");
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
                  switch ((element as HTMLButtonElement).value) {
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
              setAttribute(element, "aria-activedescendant", selectedItem?.getAttribute("id"));
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
              setAttribute(element, "aria-activedescendant", selectedItem?.getAttribute("id"));
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
                  switch ((element as HTMLButtonElement).value) {
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
              setAttribute(element, "aria-activedescendant", selectedItem?.getAttribute("id"));
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
              setAttribute(element, "aria-activedescendant", selectedItem?.getAttribute("id"));
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
  }, [handleToolbarEvent]);

  return (
    <div className="mx-28 mt-10 text-[#0B3168]">
      <header>
        <h1 className="text-3xl font-bold underline mb-10">Créer votre article</h1>
      </header>
      <form onSubmit={handleCreation}>
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
        <p className="text-xl² mt-16 mb-5 font-bold">Contenu de votre article</p>
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
        <div className="my-16 flex">
          <button className="p-2 border-[1px] font-s border-[#0B3168] rounded lg mr-10 hover:scale-105 transition ease-in delay-75">
            ajouter une image
          </button>

          <button
            className="bg-[#0B3168] rounded-lg p-2 text-white hover:scale-105 transition ease-in delay-75"
            onClick={handleOpenCreationModal}
            type="button"
          >
            Valider
          </button>
        </div>
        {open && (
          <CreateModal
            title={title}
            open={open}
            titleCloseButton="Fermer"
            titleCreateButton="Creer"
            styles="absolute top-1/2 left-1/4"
            onClose={handleCloseCreationModal}
            onCreate={handleCreation}
          />
        )}
      </form>
    </div>
  );
};

export default ArticleCreation;
