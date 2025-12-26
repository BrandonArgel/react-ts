// Components as Namespace Pattern or compound components
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}
interface CardHeaderProps {
  title: string;
}
interface CardBodyProps {
  children: ReactNode;
}

// 1. Principal component
const Card = ({ children }: CardProps) => {
  return (
    <div className="border-solid border-white rounded-lg p-4">{children}</div>
  );
};

// 3. Sub-components (the "members" of the namespace)
const CardHeader = ({ title }: CardHeaderProps) => (
  <h2 className="border-b-solid border-b-white pb-2 mb-2 text-lg font-semibold">
    {title}
  </h2>
);

const CardBody = ({ children }: CardBodyProps) => <div>{children}</div>;

// 4. Assign the sub-components as properties of the main component
Card.Header = CardHeader;
Card.Body = CardBody;

export { Card };
