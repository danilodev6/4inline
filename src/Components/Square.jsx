export const Square = ({
  children,
  updateBoard,
  index,
  onHover,
  onLeave,
  isHovered,
  isSelected,
}) => {
  const isSelectedClass = `${isSelected ? "isSelected" : ""}`;

  const handleMouseEnter = () => onHover(index);
  const handleMouseLeave = () => onLeave();

  return (
    <div
      className={`square ${isHovered ? "hover" : ""} ${isSelectedClass ? "isSelected" : ""}`}
      onClick={() => updateBoard(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
