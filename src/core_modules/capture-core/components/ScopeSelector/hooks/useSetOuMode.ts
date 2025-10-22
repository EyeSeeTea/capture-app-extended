import { useLocation } from 'react-router-dom';
import { useNavigate, buildUrlQueryString, useLocationQuery } from '../../../utils/routing';

export const useSetOuMode = () => {
    const { navigate } = useNavigate();
    const { pathname } = useLocation();
    const restOfQueries = useLocationQuery();

    const setOuMode = (ouMode: string, pageToPush: string = pathname) => {
        navigate(`${pageToPush}?${buildUrlQueryString({ ...restOfQueries, ouMode })}`);
    };

    return {
        setOuMode,
    };
};
