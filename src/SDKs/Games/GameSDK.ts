import { BaseSDK } from "../BaseSDK";

export enum GameTypeStatus {
    ComingSoon = "Coming Soon",
    Active = "Active",
    Retired = "Retired",
}

export interface GameType {
    id?: number;
    name: string;
    displayName: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    minRounds: number;
    maxRounds: number;
    moveTypes: MoveType[];
    status: GameTypeStatus;
}

export interface MoveType {
    id?: number;
    name: string;
    displayName: string;
}

export class GameSDK extends BaseSDK {
    async getGameTypes(): Promise<GameType[]> {
        return await this.httpUtil.get<GameType[]>('/game-types');
    }
}