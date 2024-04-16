type BoardsControlLabelProps = {
  boardsCount: number;
};

const BoardsControlLabel = ({ boardsCount }: BoardsControlLabelProps) => {
  return (
    <div className="mb-[1.1875rem] block px-6 text-xs font-bold uppercase tracking-[0.15rem] lg:px-8">
      All Boards ({boardsCount})
    </div>
  );
};

export default BoardsControlLabel;
