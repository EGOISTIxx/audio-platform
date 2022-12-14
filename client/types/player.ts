import {ITrack} from "./track";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    currentTime: number;
    pause: boolean;
    collapsed: boolean;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    SET_COLLAPSED = "SET_COLLAPSED",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}
interface SetCollapsedAction {
    type: PlayerActionTypes.SET_COLLAPSED,
    payload: boolean;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetVolumeAction
    | SetCurrentTimeAction
    | SetCollapsedAction
