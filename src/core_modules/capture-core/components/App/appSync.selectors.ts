import { createSelector } from 'reselect';

type ReduxState = {
    currentSelections: {
        programId?: string;
        trackedEntityTypeId?: string;
        orgUnitId?: string;
        ouMode?: string;
    };
    viewEventPage: {
        eventId?: string;
    };
    editEventPage: {
        eventId?: string;
    };
};

const programIdSelector = (state: ReduxState) => state.currentSelections.programId;
const trackedEntityTypeIdSelector = (state: ReduxState) => state.currentSelections.trackedEntityTypeId;
const orgUnitIdSelector = (state: ReduxState) => state.currentSelections.orgUnitId;
const ouModeSelector = (state: ReduxState) => state.currentSelections.ouMode;
const viewEventIdSelector = (state: ReduxState) => state.viewEventPage.eventId;
const eventIdSelector = (state: ReduxState) => state.editEventPage.eventId;

export const paramsSelector = createSelector(
    programIdSelector,
    trackedEntityTypeIdSelector,
    orgUnitIdSelector,
    ouModeSelector,
    eventIdSelector,
    viewEventIdSelector,
    (programId?: string, trackedEntityTypeId?: string, orgUnitId?: string, ouMode?: string, eventId?: string, viewEventId?: string) => ({
        programId,
        trackedEntityTypeId,
        orgUnitId,
        ouMode,
        eventId,
        viewEventId,
    }),
);
