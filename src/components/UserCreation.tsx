"use client";

import { gql, useMutation } from "@apollo/client";

import { useState, type FormEvent } from "react";

import UserCreateModal from "../ui/UserDashboard/UserCreateModal";

//requete POST
const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $firstName: String!
    $isAdmin: Boolean!
    $lastName: String!
    $phone: String!
    $password: String!
  ) {
    newUser(
      email: $email
      firstName: $firstName
      isAdmin: $isAdmin
      lastName: $lastName
      phone: $phone
      password: $password
    ) {
      email
      firstName
      isAdmin
      lastName
      phone
      password
    }
  }
`;

const UserCreation = () => {
  // gestion de la modale
  const [open, setOpen] = useState(false);

  const handleCloseCreationModal = () => setOpen(false);
  const handleOpenCreationModal = () => {
    setOpen(true);
  };

  const [createUser] = useMutation(CREATE_USER);

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleIsAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true";
    setIsAdmin(value);
  };

  //a la soumission formulaire appel de la requete POST définie plus haut
  const handleCreation = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      const response = await createUser({
        variables: {
          email,
          firstName,
          isAdmin,
          lastName,
          phone,
          password,
        },
      });

      window.location.reload();
      console.log(response);
    })();
  };

  return (
    <>
      <div className="mx-28 mt-10 text-[#0B3168]">
        <>
          <header>
            <h1
              className="text-3xl font-bold underline mb-4
              "
            >
              Créer un nouvel utilisateur.
            </h1>
          </header>
          <div className="flex flex-col">
            <label className="text-xl² mb-5 font-bold">
              Prénom :
              <input
                className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                value={firstName}
                onChange={handleFirstName}
                type="text"
              />
            </label>
            <label className="text-xl² mb-5 font-bold">
              Nom :
              <input
                className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                value={lastName}
                onChange={handleLastName}
                type="text"
              />
            </label>
            <label className="text-xl² mb-5 font-bold">
              Email :
              <input
                className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                value={email}
                onChange={handleEmail}
                type="email"
              />
            </label>
            <label className="text-xl² mb-5 font-bold">
              Téléphone :
              <input
                className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                value={phone}
                onChange={handlePhone}
                type="tel"
              />
            </label>
            <label className="text-xl² mb-5 font-bold">
              mot de passe :
              <input
                className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                value={password}
                onChange={handlePassword}
                type="password"
              />
            </label>
            <label className="text-xl² mb-5 font-bold">
              Admin?
              <select value={isAdmin} onChange={handleIsAdmin}>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>
            <button
              className="bg-[#0B3168] rounded-md px-8 py-4 text-white text-xl hover:scale-105 transition ease-in delay-75 w-24 flex justify-center"
              onClick={handleOpenCreationModal}
              type="button"
            >
              Valider
            </button>
            {open && (
              <UserCreateModal
                email={email}
                firstName={firstName}
                isAdmin={isAdmin}
                lastName={lastName}
                open={open}
                phone={phone}
                password={password}
                titleCloseButton="Fermer"
                titleCreateButton="Mettre à jour"
                styles="absolute top-1/4 bg-yellow-600 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center"
                onClose={handleCloseCreationModal}
                onCreate={handleCreation}
              />
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default UserCreation;
