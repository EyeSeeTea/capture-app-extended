import React, { createContext, useContext } from 'react';
import type { FiltersConfig, SetFiltersConfig } from 'capture-core/extended/filtersConfig/index';

type FiltersConfigContextValue = {
    filtersConfig: FiltersConfig;
    onSetFiltersConfig: SetFiltersConfig;
};

const FiltersConfigContext = createContext<FiltersConfigContextValue | null>(null);

export const FiltersConfigProvider = ({
    filtersConfig,
    onSetFiltersConfig,
    children,
}: FiltersConfigContextValue & { children: React.ReactNode }) => (
    <FiltersConfigContext.Provider value={{ filtersConfig, onSetFiltersConfig }}>
        {children}
    </FiltersConfigContext.Provider>
);

export const useFiltersConfig = () => {
    const context = useContext(FiltersConfigContext);
    if (!context) {
        throw new Error('useFiltersConfig must be used within FiltersConfigProvider');
    }
    return context;
};

// For class components that can't use hooks
export const FiltersConfigConsumer = FiltersConfigContext.Consumer;

