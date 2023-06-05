import { type PropsWithChildren } from "react";

import ArticleManagementTabList from "./ArticleManagementTabList";

type Props = {
  focusableIndex?: number;
  title: string;
  id: number;
  creationDate: number;
};

const tabs = [
  { id: 1, title: "Handicap et blabla", creationDate: 1 },
  { id: 2, title: "Inclusivité et BlaBla", creationDate: 5 },
  { id: 3, title: "Salon du blabla", creationDate: 6 },
  { id: 4, title: "Inolib et Blabla", creationDate: 7 },
];

export default function ArticleManagementModule(props: PropsWithChildren<Props>) {
  return (
    <table className="w-full">
      <tbody>
        {tabs.map((tab) => (
          <tr key={tab.id} className="flex border-y-[1px] border-t-black">
            <ArticleManagementTabList title={tab.title} creationDate={tab.creationDate} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
console.log(<ArticleManagementTabList />);
