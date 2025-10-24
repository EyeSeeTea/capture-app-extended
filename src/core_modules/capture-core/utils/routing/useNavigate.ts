import { useHistory } from 'react-router-dom';
import { getLocationQuery } from './getLocationQuery';

export const useNavigate = () => {
    const history = useHistory();

    const persistOuModeQueryParam = (path: string) => {
        const { ouMode } = getLocationQuery();
        if (ouMode) {
            const [pathname, queryString] = path.split('?');

            if (queryString) {
                const params = new URLSearchParams(queryString);

                if (!params.has('ouMode')) {
                    params.set('ouMode', ouMode);
                    return `${pathname}?${params.toString()}`;
                }
                return path;
            }
            return `${path}?ouMode=${ouMode}`;
        }
    };


    const navigate = (path: string, scrollToTop = true) => {
        history.push(persistOuModeQueryParam(path));
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }
    };

    return { navigate };
};
