import { useHistory, useLocation } from 'react-router-dom';
import ILocationState from '../../interfaces/LocationState.interface';
import IChildrenProps from '../../interfaces/ChildrenProps.interface';
import './BackButton.scss';

export default function BackButton({ children }: IChildrenProps) {
  const history = useHistory();
  const location = useLocation<ILocationState>();

  const handleGoBackClick = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    <button type="button" className="backButton" onClick={handleGoBackClick}>
      {children} Go Back
    </button>
  );
}
