type ContentProps = {
  styles: string;
  content: string;
};

export default function ArticleManagementContent(props: ContentProps) {
  return <td className={props.styles}>{props.content}</td>;
}
