type TitleProps = {
  styles: string;
  title: string;
};

export default function ArticleManagementTitle(props: TitleProps) {
  return (
    <>
      <td className={props.styles}>{props.title}</td>
    </>
  );
}
