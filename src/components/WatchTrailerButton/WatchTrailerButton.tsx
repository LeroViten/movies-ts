import './WatchTrailerButton.scss';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function WatchTrailerButton({
  children,
  onClick,
  ...allyProps
}: IProps) {
  return (
    <button
      type="button"
      className="trailerButton"
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
}
