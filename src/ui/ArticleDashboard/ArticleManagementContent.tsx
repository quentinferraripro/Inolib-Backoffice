type ContentProps = {
  styles: string;
  content: string;
};

export default function ArticleManagementContent(props: ContentProps) {
  return (
    <>
      <th className={props.styles} scope="col">
        {props.content}
      </th>
    </>
  );
}
