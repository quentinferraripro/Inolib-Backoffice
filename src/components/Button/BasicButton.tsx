type ButtonProps = {
  color: "blue" | "white";
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  styles?: string;
};

export default function BasicButton(props: ButtonProps) {
  const primaryColor = props.color === "white" ? "white" : "[#0B3168]";
  const secondaryColor = props.color === "white" ? "[#0B3168]" : "white";
  const styles = props.styles !== undefined ? props.styles : "";
  return (
    <button
      className={`bg-${primaryColor} rounded-md px-8 py-4 text-${secondaryColor} text-xl ${styles} hover:scale-105 transition ease-in delay-75`}
      type={props.type}
    >
      {props.label}
    </button>
  );
}
