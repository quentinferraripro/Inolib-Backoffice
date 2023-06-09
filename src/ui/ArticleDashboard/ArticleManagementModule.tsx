import ArticleManagementLineList from "./ArticleManagementLineList";

const lines = [
  { id: 1, title: "Handicap et blabla", creationDate: 1 },
  { id: 2, title: "Inclusivité et BlaBla", creationDate: 5 },
  { id: 3, title: "Salon du blabla", creationDate: 6 },
  { id: 4, title: "Inolib et Blabla", creationDate: 7 },
];

export default function ArticleManagementModule() {
  return (
    <table className="w-full">
      <tbody>
        {lines.map((line) => (
          <tr key={line.id} className="flex border-y-[1px] border-t-black">
            <ArticleManagementLineList title={line.title} creationDate={line.creationDate} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
console.log(<ArticleManagementLineList />);
