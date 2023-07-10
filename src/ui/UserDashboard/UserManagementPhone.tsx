type PhoneProps = {
  styles: string;
  phone: string;
};

export default function UserManagementPhone(props: PhoneProps) {
  return <td className={props.styles}>{props.phone}</td>;
}
