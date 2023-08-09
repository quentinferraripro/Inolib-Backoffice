"use client";

import { useMutation, useQuery, gql } from "@apollo/client";
import { useState } from "react";

import UserManagementLine from "./UserManagementLine";
import UserDeleteModal from "./UserDeleteModal";

type DeleteUserData = {
  deleteUser: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    isAdmin: boolean;
    password?: string;
  };
};

type GetUserData = {
  users: User[];
};

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  isAdmin?: boolean;
  password?: string;
};

export type OpenDeleteModal = (cuid: string, firstName: string) => void;

export const DELETE_USER = gql`
  mutation deleteUser($id: Cuid!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetUserData {
    users {
      id
      firstName
      lastName
      email
      phone
      isAdmin
      password
    }
  }
`;

export default function UserManagementModule() {
  const [deleteModalState, setDeleteModalState] = useState({
    cuid: "",
    isOpen: false,
    firstName: "",
  });

  const { data, error, loading } = useQuery<GetUserData>(GET_USER_DATA);
  const [deleteUser] = useMutation<DeleteUserData>(DELETE_USER);

  const handleDeleteModalClose = () => {
    setDeleteModalState({ ...deleteModalState, isOpen: false });
  };

  const handleDeleteModalDelete = async () => {
    const response = await deleteUser({
      variables: {
        id: deleteModalState.cuid,
      },
    });

    window.location.reload();
    console.log(response);
  };

  const openDeleteModal: OpenDeleteModal = (cuid, firstName) => {
    setDeleteModalState({ ...deleteModalState, cuid, isOpen: true, firstName });
  };

  return (
    <>
      <div className="mt-10">
        {error !== undefined ? (
          <p>{error.message}</p>
        ) : loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="border-y-2 border-y-black">
            <caption className="text-2xl font-bold mb-6 ">Espace de gestion des utilisateurs</caption>
            <thead className="border-b-2 border-b-black">
              <tr className="flex border-y-[1px] border-t-black w-full">
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Nom</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Prénom</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Email</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Téléphone</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Rôle</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Mot de passe</th>
                <th className="focus:bg-slate-400 w-[14%] flex items-center justify-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data !== undefined
                ? data.users.map((user) => (
                    <UserManagementLine
                      key={user.id}
                      cuid={user.id}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      email={user.email}
                      phone={user.phone}
                      isAdmin={user.isAdmin}
                      password={user.password}
                      openDeleteModal={openDeleteModal}
                    />
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>

      {deleteModalState.isOpen && (
        <UserDeleteModal
          open={deleteModalState.isOpen}
          firstName={deleteModalState.firstName}
          titleCloseButton="Fermer"
          titleDeleteButton="Supprimer"
          styles="absolute top-1/2 bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center"
          onClose={handleDeleteModalClose}
          onDelete={() => void (async () => await handleDeleteModalDelete())()}
        />
      )}
    </>
  );
}
