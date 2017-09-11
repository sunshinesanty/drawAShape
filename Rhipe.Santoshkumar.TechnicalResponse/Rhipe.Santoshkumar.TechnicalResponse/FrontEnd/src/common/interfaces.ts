export enum TriangleType {
    Invalid = 0,
    Acute = 1,
    Obtuse = 2,
    RightAngle = 3,
    Equilateral = 4    
}

export interface Payload {
    xUnit: number;
    yUnit: number;
    zUnit: number;
}

export interface AppState {
    isLoading: boolean;
    ResutType: TriangleType;
}