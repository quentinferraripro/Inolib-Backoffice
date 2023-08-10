"use client";

import "react-quill/dist/quill.snow.css";

import { gql, useMutation, useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState, type ChangeEventHandler, type FormEvent } from "react";
import ReactQuill from "react-quill";

import quillTitleConfig from "../../../config/quillTitleConfig";
import quillContentConfig from "../../../config/quillContentConfig";
import { setAttribute } from "../../../helpers";
import ArticleUpdateModal from "../../../ui/ArticleDashboard/ArticleUpdateModal";

type Data = {
  findArticle: Article[];
};

type Article = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  description?: string;
};

type Props = {
  params: {
    id: string;
  };
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

const ArticleUpdate = ({ params }: Props) => {
  const ARTICLE = gql`
    query findArticle($id: Cuid!) {
      findArticle(id: $id) {
        id
        title
        content
        createdAt
        description
      }
    }
  `;

  // requete UPDATE
  const UPDATE_ARTICLE = gql`
    mutation updateArticle(
      $id: Cuid!
      $title: String!
      $content: String!
      $createdAt: DateTime!
      $description: String!
    ) {
      updateArticle(id: $id, title: $title, content: $content, createdAt: $createdAt, description: $description) {
        id
        title
        content
        createdAt
        description
      }
    }
  `;

  const { data, error, loading } = useQuery<Data>(ARTICLE, {
    variables: {
      id: params.id,
    },
  });

  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      const response = await updateArticle({
        variables: {
          id: params.id,
          title,
          content,
          createdAt: new Date(createdAt),
          description,
        },
      });

      window.location.reload();
      console.log(response);
    })();
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
  const [createdAt, setCreatedAt] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //gestion du re-render du composant lors du clic des bouton de la toolbar
  const [changed, setChanged] = useState(false);

  const handleTitle = (titleValue: string) => {
    setTitle(titleValue);
  };

  const handleContent = (contentValue: string) => {
    setContent(contentValue);
  };

  const handleCreatedAt: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCreatedAt(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleToolbarEvent = useCallback(() => {
    setChanged(!changed);
  }, [changed]);

  const formatedDate = data?.findArticle[0]?.createdAt.slice(0, 10) ?? undefined;

  useEffect(() => {
    if (data?.findArticle[0]) {
      setTitle(data?.findArticle[0].title ?? "");
      setContent(data?.findArticle[0].content ?? "");
      setCreatedAt(formatedDate);
      setDescription(data?.findArticle[0].description ?? "");
    }

    const titleEditor = quillTitleRef.current?.getEditor();
    const contentEditor = quillContentRef.current?.getEditor();

    const keyboardTitle = titleEditor?.getModule("keyboard") as { bindings: unknown[] } | undefined;
    const keyboardContent = contentEditor?.getModule("keyboard") as { bindings: unknown[] } | undefined;

    // empeche de sortir de la toolbar avec tab
    delete keyboardTitle?.bindings[9];
    delete keyboardContent?.bindings[9];

    const titleEditorElement = titleEditor?.root;
    const titleToolbar = titleEditorElement?.parentElement?.parentElement?.querySelector(".ql-toolbar");
    const titleToolbarElements = titleToolbar?.querySelectorAll("button, span");

    const contentEditorElement = contentEditor?.root;
    const contentToolbar = contentEditorElement?.parentElement?.parentElement?.querySelector(".ql-toolbar");
    const contentToolbarElements = contentToolbar?.querySelectorAll("button, span");
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

    if (titleEditorElement?.getAttribute("aria-label") === null) {
      titleEditorElement?.setAttribute("aria-label", "zone d'édition du titre");
    }

    if (contentEditorElement?.getAttribute("aria-label") === null) {
      contentEditorElement?.setAttribute("aria-label", "zone d'édition du contenu");
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
                element.setAttribute("aria-label", "le gras désactivé");
                break;
              }

              case "ql-bold ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "gras activé");
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
                    item.setAttribute("aria-label", "texte aligné à gauche");
                    break;
                  }

                  case "center": {
                    item.setAttribute("aria-label", "texte aligné au centre");
                    break;
                  }

                  case "right": {
                    item.setAttribute("aria-label", "texte aligné à droite");
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

              case "ql-italic ql-active": {
                element.addEventListener("click", handleToolbarEvent, { once: true });
                element.setAttribute("aria-label", "Italique activé");
                break;
              }
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
  }, [handleToolbarEvent, data?.findArticle, formatedDate]);

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
              <div>
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
                <label className="flex flex-col mt-16 text-l font-bold">
                  Modifier la description :
                  <input
                    type="text"
                    className="border-[1px] border-[#0B3168] rounded-md h-8 mt-4 font-normal"
                    value={description}
                    onChange={handleDescription}
                  />
                </label>
                <input className="mt-20" type="date" value={createdAt} onChange={handleCreatedAt} />
                {console.log("date de creation", createdAt)}

                <button onClick={handleOpenModal} type="button">
                  Valider
                </button>

                {open && (
                  <ArticleUpdateModal
                    title={title}
                    open={open}
                    titleCloseButton="Fermer"
                    titleCreateButton="Mettre à jour"
                    styles="absolute top-1/2 bg-yellow-600 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center"
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                  />
                )}
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ArticleUpdate;
