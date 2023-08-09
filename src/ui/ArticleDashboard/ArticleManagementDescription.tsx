type ContentProps = {
  styles: string;
  description: string;
};

export default function ArticleManagementDescription(props: ContentProps) {
  return <td className={props.styles}>{props.description}</td>;
}
