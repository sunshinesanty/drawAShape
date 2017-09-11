import * as React from 'react';
export const Equilateral: React.StatelessComponent<any> = () => {
    return (
        <figure>
            <div className="triangleContainer">
                <svg version="1.1" x="0px" y="0px">
                    <polygon fill="#006330" points="170,0 0,210 335,192 " />
                </svg>
            </div>
        </figure>
    );
};
export const AcuteAngled: React.StatelessComponent<any> = () => {
    return (
        <figure>
            <div className="triangleContainer">
                <svg version="1.1" x="0px" y="0px">
                    <polygon fill="#006330" points="210,0 0,210 305,392 " />
                </svg>
            </div>
        </figure>
    );
};
export const ObtuseAngled: React.StatelessComponent<any> = () => {
    return (
        <figure>
            <div className="triangleContainer">
                <svg version="1.1" x="0px" y="0px">
                    <polygon fill="#006330" points="310,180 90,0 305,452 " />
                </svg>
            </div>
        </figure>
    );
};
export const RightAngle: React.StatelessComponent<any> = () => {
    return (
        <figure>
            <div className="triangleContainer">
                <svg version="1.1" x="0px" y="0px">
                    <polygon fill="#006330" points="20 20, 580 340, 20 580" />
                </svg>
            </div>
        </figure>
    );
};
export const Invalid: React.StatelessComponent<any> = () => {
    return (
        <figure>
            <div className="triangleContainer">
                <svg version="1.1" height="100%" width="100%">
                    <circle cx="50%" cy="50%" r="20%" fill="#880000" />
                </svg>
            </div>
        </figure>
    );
};

/*
80,
5 200,
5 250,
80 250,
80 200,
155 80,
155 25,
80 25,
80
 */