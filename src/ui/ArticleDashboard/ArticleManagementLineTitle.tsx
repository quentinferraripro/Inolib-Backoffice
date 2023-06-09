import ArticleManagementLineCreation from "./ArticleManagementLineCreation";
type TitleProps = {
  styles: string;
  title: string;
};

export default function ArticleManagementLineTitle(props: TitleProps) {
  return (
    <>
      <th className={props.styles} scope="col">
        {props.title}
      </th>
      <ArticleManagementLineCreation title={props.title} />
    </>
  );
}
