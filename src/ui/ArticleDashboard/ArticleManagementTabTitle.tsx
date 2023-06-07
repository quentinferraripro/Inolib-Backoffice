import ArticleManagementTabCreation from "./ArticleManagementTabCreation";
type TitleProps = {
  styles: string;
  title: string;
};

export default function ArticleManagementTabTitle(props: TitleProps) {
  return (
    <>
      <th className={props.styles} scope="col">
        {props.title}
      </th>
      <ArticleManagementTabCreation title={props.title} />
    </>
  );
}
