type Props = {
  color: string;
  handleClick: () => void;
  handkeClick1: (a: number) => void;
};

// định nghĩa kdl theo kiểu component
// export const Abc: React.FC<Props> = (props) => {
//   return <div>ABC</div>;
// };

export const DemoComponent = (props: Props) => {
  const { color, handleClick, handkeClick1 } = props;
  console.log("color: ", color);

  return (
    <div>
      <div onClick={handleClick}>DemoComponent</div>
      <div
        onClick={() => {
          handkeClick1(123);
        }}
      >
        Handle Click 1
      </div>

      <h1 className="font-900 text-30 text-red-800 bg-[#9A6EFF] hover:bg-black transition-all cursor-pointer duration-500">
        Demo TailWind CSS
      </h1>
    </div>
  );
};
