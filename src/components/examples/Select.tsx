// Components as Namespace Pattern or compound components

interface SelectProps {
  children: React.ReactNode;
}
interface ItemProps {
  label: string;
}

const SelectRoot = ({ children }: SelectProps) => {
  return <div className="select-container">{children}</div>;
};

const SelectItem = ({ label }: ItemProps) => {
  return <div className="select-item">{label}</div>;
};

export const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
});
