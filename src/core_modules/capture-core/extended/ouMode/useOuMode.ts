import { useLocation } from 'react-router-dom';
import { useNavigate, buildUrlQueryString, useLocationQuery } from '../../utils/routing';

export const useOuMode = () => {
    const { navigate } = useNavigate();
    const { pathname } = useLocation();
    const { ouMode: selectedOuMode, ...restOfQueries } = useLocationQuery();

    const setOuMode = (ouMode: string, pageToPush: string = pathname) => {
        navigate(`${pageToPush}?${buildUrlQueryString({ ...restOfQueries, ouMode })}`);
    };

    return {
        setOuMode,
        ouMode: selectedOuMode ? String(selectedOuMode) : 'SELECTED',
    };
};
