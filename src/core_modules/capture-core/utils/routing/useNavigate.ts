import { useHistory } from 'react-router-dom';
import { persistOuModeQueryParam } from 'capture-core/extended/ouMode/persistOuMode';

export const useNavigate = () => {
    const history = useHistory();

    const navigate = (path: string, scrollToTop = true) => {
        history.push(persistOuModeQueryParam(path));
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }
    };

    return { navigate };
};
