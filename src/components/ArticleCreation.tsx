"use client";

import "react-quill/dist/quill.snow.css";

import { gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState, type ChangeEventHandler, type FormEvent } from "react";

import quillTitleConfig from "../config/quillTitleConfig";
import quillContentConfig from "../config/quillContentConfig";
import { setAttribute } from "../helpers";
import CreateModal from "../ui/ArticleDashboard/ArticleCreateModal";

import ReactQuill from "react-quill";

//requete POST
const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!, $createdAt: DateTime!) {
    newArticle(title: $title, content: $content, createdAt: $createdAt) {
      id
      title
      content
      createdAt
    }
  }
`;

//mise en place de la surveillance de toute les classe nécessaire pour la modification des aria-label
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
  };

  const [createArticle] = useMutation(CREATE_ARTICLE);

  const quillTitleRef = useRef<ReactQuill>(null);
  const quillContentRef = useRef<ReactQuill>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().substring(0, 10));

  //gestion du re-render du composant lors du clic des bouton de la toolbar
  const [changed, setChanged] = useState(false);

  //écouteur d'evenement au format ReactQuill
  const handleTitle = (titleValue: string) => {
    setTitle(titleValue);
  };

  //écouteur d'evenement au format ReactQuill
  const handleContent = (contentValue: string) => {
    setContent(contentValue);
  };

  //écouteur d'evenement au format React classique
  const handleCreatedAt: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCreatedAt(event.target.value);
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
          createdAt: new Date(createdAt),
        },
      });

      window.location.reload();
      console.log(response);
    })();
  };

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
    // const contentEditorSpace = contentEditor?.root.parentElement?.parentElement?.querySelector(".ql-container");
    // const contentEditorSpaceElements = contentEditorSpace?.querySelectorAll("div");
    // const titleEditorSpace = titleEditor?.root.parentElement?.parentElement?.querySelector(".ql-container");
    // const titleEditorSpaceElements = titleEditorSpace?.querySelectorAll("div");

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

    const sizecontentButton = contentToolbar?.querySelector(".ql-size");
    if (sizecontentButton?.getAttribute("aria-label") === null) {
      sizecontentButton?.setAttribute("aria-label", "changer la taille du texte");
    }
    const sizetitleButton = titleToolbar?.querySelector(".ql-size");
    if (sizetitleButton?.getAttribute("aria-label") === null) {
      sizetitleButton?.setAttribute("aria-label", "changer la taille du texte");
    }

    const headercontentButton = contentToolbar?.querySelector(".ql-header");
    if (headercontentButton?.getAttribute("aria-label") === null) {
      headercontentButton?.setAttribute("aria-label", "niveau de titre");
    }
    const headertitleButton = titleToolbar?.querySelector(".ql-header");
    if (headertitleButton?.getAttribute("aria-label") === null) {
      headertitleButton?.setAttribute("aria-label", "niveau de titre");
    }
    // const titleEditionSpace = titleEditorSpace?.querySelector("ql-editor");
    // if (titleEditionSpace?.getAttribute("aria-label") === null) {
    //   titleEditionSpace?.setAttribute("aria-label", "zone d'édition du titre");
    // }

    // const contentEditionSpace = contentEditorSpace?.querySelector("ql-editor ql-blank");
    // if (contentEditionSpace?.getAttribute("aria-label") === null) {
    //   contentEditionSpace?.setAttribute("aria-label", "zone d'édition du titre");
    // }

    //ecoute chaque bouton, au clic provoque au re-render
    //et il y une surveillance de la className du boutton pour lui ajouter le bon aria-label
    contentToolbarElements?.forEach((element) => {
      switch (element.tagName) {
        case "BUTTON":
          {
            switch (element.className) {
              case "ql-bold": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Gras désactivé");
                break;
              }

              case "ql-bold ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Gras activé");
                break;
              }

              case "ql-underline": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Soulignement désactivé");
                break;
              }

              case "ql-underline ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Soulignement activé");
                break;
              }

              case "ql-italic": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Italique désactivé");
                break;
              }

              case "ql-italic ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Italique activé");
                break;
              }

              case "ql-link": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Créer un lien");
                break;
              }

              case "ql-image": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Ajouter une image");
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
                    item.setAttribute("aria-label", "Texte aligné à gauche");
                    break;
                  }

                  case "center": {
                    item.setAttribute("aria-label", "Texte aligné au centre");
                    break;
                  }

                  case "right": {
                    item.setAttribute("aria-label", "Texte aligné à droite");
                    break;
                  }

                  case "justify": {
                    item.setAttribute("aria-label", "Texte justifié");
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

            case element.className.includes("ql-size"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "changer la taille du texte"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "taille texte normale");
                    break;
                  }

                  case "small": {
                    item.setAttribute("aria-label", "taille texte petite");
                    break;
                  }

                  case "large": {
                    item.setAttribute("aria-label", "taille texte grande");
                    break;
                  }

                  case "huge": {
                    item.setAttribute("aria-label", "taille texte très grande");
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

    // titleEditorSpaceElements?.forEach((element) => {
    //   switch (element.tagName) {
    //     case "DIV": {
    //       switch (element.className) {
    //         case "ql-editor": {
    //           element.addEventListener("click", handleToolbarEvent, { once: true });
    //           element.setAttribute("aria-label", "espace d'édition");
    //           break;
    //         }
    //       }
    //     }
    //   }
    // });

    titleToolbarElements?.forEach((element) => {
      switch (element.tagName) {
        case "BUTTON":
          {
            switch (element.className) {
              case "ql-bold": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Gras désactivé");
                break;
              }

              case "ql-bold ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Gras activé");
                break;
              }

              case "ql-underline": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Soulignement désactivé");
                break;
              }

              case "ql-underline ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Soulignement activé");
                break;
              }

              case "ql-italic": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Italique désactivé");
                break;
              }

              case "ql-italic ql-active":
                {
                  element.addEventListener("click", handleToolbarEvent, { once: true });
                  element.setAttribute("aria-label", "Italique activé");
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
                    item.setAttribute("aria-label", "Texte aligné à gauche");
                    break;
                  }

                  case "center": {
                    item.setAttribute("aria-label", "Texte aligné au centre");
                    break;
                  }

                  case "right": {
                    item.setAttribute("aria-label", "Texte aligné a droite");
                    break;
                  }

                  case "justify": {
                    item.setAttribute("aria-label", "texte justifié");
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

            case element.className.includes("ql-header"): {
              element.addEventListener("click", handleToolbarEvent, { once: true });

              const items = element.querySelectorAll(".ql-picker-item");

              items.forEach((item) => {
                item.setAttribute("id", nanoid());
                item.setAttribute("role", "option");

                classObservers.push(observeOptions(element, "niveau de titre"));

                switch (item.getAttribute("data-value")) {
                  case null: {
                    item.setAttribute("aria-label", "aucun choix");
                    break;
                  }

                  case "1": {
                    item.setAttribute("aria-label", "niveau H1");
                    break;
                  }

                  case "2": {
                    item.setAttribute("aria-label", "niveau H2");
                    break;
                  }

                  case "3": {
                    item.setAttribute("aria-label", "niveau H3");
                    break;
                  }

                  case "4": {
                    item.setAttribute("aria-label", "niveau H4");
                    break;
                  }

                  case "5": {
                    item.setAttribute("aria-label", "niveau H5");
                    break;
                  }

                  case "6": {
                    item.setAttribute("aria-label", "niveau H6");
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
      <div>
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
        <label>
          Date de creation
          <input className="mt-16" type="date" value={createdAt} onChange={handleCreatedAt} />
        </label>
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
            styles="absolute top-1/2 bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center"
            onClose={handleCloseCreationModal}
            onCreate={handleCreation}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleCreation;
