import { useHistory } from 'react-router-dom';
import { getLocationQuery } from './getLocationQuery';

export const useNavigate = () => {
    const history = useHistory();

    const persistOuModeQueryParam = (path: string) => {
        const { ouMode } = getLocationQuery();
        if (!ouMode) return path;

        const [pathname, queryString] = path.split('?');
        const params = new URLSearchParams(queryString);

        if (!params.has('ouMode')) {
            params.set('ouMode', ouMode);
            return `${pathname}?${params.toString()}`;
        }
        return path;
    };

    const navigate = (path: string, scrollToTop = true) => {
        history.push(persistOuModeQueryParam(path));
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }
    };

    return { navigate };
};
