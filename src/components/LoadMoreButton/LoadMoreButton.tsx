import './LoadMoreButton.scss';

interface IProps {
  onLoadMore: () => void;
}

export default function LoadMoreButton({ onLoadMore }: IProps) {
  return (
    <div className="loadMoreWrapper">
      <button type="button" className="loadMoreButton" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
}
