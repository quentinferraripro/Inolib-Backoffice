type EmailProps = {
  styles: string;
  email: string;
};

export default function UserManagementEmail(props: EmailProps) {
  return <td className={props.styles}>{props.email}</td>;
}
