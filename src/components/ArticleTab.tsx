type PropsArticleTabType = {
  title: string;
  creationDate: number;
};

export default function ArticleTab(props: PropsArticleTabType) {
  return (
    <tr>
      <th scope="col">{props.title}</th>
      <th scope="col">{props.creationDate}</th>
    </tr>
  );
}
