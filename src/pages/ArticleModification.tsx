import { type PropsWithChildren } from "react";
import { gql, useMutation } from "@apollo/client";

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: Cuid!) {
    updateDocument(id: $id) {
      id
    }
  }
`;

type Data = {
  updateDocument: {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: string;
  };
};

type Props = {
  focusableIndex?: number;
  cuid: string;
  title: string;
  createdAt: string;
  content: string;
};

export default function ArticleModification(props: PropsWithChildren<Props>) {
  const [updateArticle, { data, error, loading }] = useMutation<Data>(UPDATE_ARTICLE);

  const handleUpdate = async () => {
    const response = await updateArticle({
      variables: {
        id: props.cuid,
      },
    });
    window.location.reload(false);
    console.log(response);
  };
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h1>Modification des articles</h1>
        <label>
          Title
          <input />
        </label>
        <label>
          Content
          <input />
        </label>
        <button type="submit">valider</button>
      </form>
    </div>
  );
}
