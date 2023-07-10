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
import UserManagementAdmin from "./UserManagementAdmin";

type Props = {
  cuid: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  password: string;
  openDeleteModal: OpenDeleteModal;
};

export default function UserManagementLine(props: PropsWithChildren<Props>) {
  return (
    <tr className="flex border-y-[1px] border-t-black w-[100vw]">
      <>
        <UserManagementFirstName
          firstName={props.firstName}
          styles="py-2 focus:bg-slate-400 w-[14%] flex justify-center items-center"
        />
        <UserManagementLastname
          lastName={props.lastName}
          styles=" focus:bg-slate-400 w-[14%] flex items-center justify-center truncate ..."
        />
        <UserManagementEmail email={props.email} styles="focus:bg-slate-400 w-[14%] flex items-center justify-center" />
        <UserManagementPhone phone={props.phone} styles="focus:bg-slate-400 w-[14%] flex items-center justify-center" />
        <UserManagementAdmin
          isAdmin={props.isAdmin}
          styles="focus:bg-slate-400 w-[14%] flex items-center justify-center"
        />
        <UserManagementPassword
          password={props.password}
          styles="focus:bg-slate-400 w-[14%] flex items-center justify-center"
        />
        <td className="w-[14%] flex items-center justify-center">
          <Composite orientation="horizontal">
            <UserManagementLink cuid={props.cuid} styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
              Modifier
            </UserManagementLink>

            <UserManagementButton
              onClick={() => void props.openDeleteModal(props.cuid, props.firstName)}
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
