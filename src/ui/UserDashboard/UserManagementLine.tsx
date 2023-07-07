import { type PropsWithChildren } from "react";

import { Composite } from "../Composite";

import { type OpenDeleteModal } from "./UserManagementModule";

import UserManagementLink from "./UserManagementLink";
import UserManagementButton from "./UserManagementButton";
import UserManagementFirstName from "./UserManagementFistName";
import UserManagementLastname from "./UserManagementLastName";
import UserManagementEmail from "./UserManagementEmail";
import UserManagementPhone from "./UserManagementPhone";
import UserManagementPassword from "./UserManagementPassword";

type Props = {
  cuid: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  openDeleteModal: OpenDeleteModal;
};

export default function UserManagementLine(props: PropsWithChildren<Props>) {
  const firstName = props.firstName !== undefined ? props.firstName : "";
  const lastName = props.lastName !== undefined ? props.lastName : "";
  const email = props.email !== undefined ? props.email : "";
  const phone = props.phone !== undefined ? props.phone : "";
  const password = props.password !== undefined ? props.password : "";

  const nohtmlFirstName = firstName?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlLastName = lastName?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlEmail = email?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlPassword = phone?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlPhone = password?.replace(/(<([^>]+)>)/gi, "");

  return (
    <tr className="flex border-y-[1px] border-t-black w-[100vw] justify-between">
      <>
        <UserManagementFirstName
          firstName={nohtmlFirstName}
          styles="py-2 focus:bg-slate-400 w-1/5 flex justify-center items-center"
        />
        <UserManagementLastname
          lastName={nohtmlLastName}
          styles=" focus:bg-slate-400 w-1/5 flex items-center justify-center truncate ..."
        />
        <UserManagementEmail email={nohtmlEmail} styles="focus:bg-slate-400 w-1/5 flex items-center justify-center" />
        <UserManagementPhone phone={nohtmlPhone} styles="focus:bg-slate-400 w-1/5 flex items-center justify-center" />
        <UserManagementPassword
          password={nohtmlPassword}
          styles="focus:bg-slate-400 w-1/5 flex items-center justify-center"
        />
        <td className="w-1/5 flex items-center justify-center">
          <Composite orientation="horizontal">
            <UserManagementLink cuid={props.cuid} styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
              Modifier
            </UserManagementLink>

            <UserManagementButton
              onClick={() => void props.openDeleteModal(props.cuid, nohtmlFirstName)}
              styles="p-2 mx-4 bg-red-600 rounded-lg"
            >
              Supprimer
            </UserManagementButton>
          </Composite>
        </td>
      </>
    </tr>
  );
}
