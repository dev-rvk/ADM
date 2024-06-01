// import KeyboardSVG from '../public/images/skin-light/ic_keyboard_678_48dp.svg';
// import MoreSVG from '../public/images/skin-light/ic_more_horiz_678_48dp.svg';
// import CameraSVG from '../public/images/skin-light/ic_photo_camera_678_48dp.svg';
// import PowerSVG from '../public/images/skin-light/ic_power_settings_new_678_48px.svg';
// import VolumeDownSVG from '../public/images/skin-light/ic_volume_down_678_48px.svg';
// import VolumeUpSVG from '../public/images/skin-light/ic_volume_up_678_48px.svg';
// import BackSVG from '../public/images/skin-light/System_Back_678.svg';
// import HomeSVG from '../public/images/skin-light/System_Home_678.svg';
// import OverviewSVG from '../public/images/skin-light/System_Overview_678.svg';
// import CancelSVG from '../public/images/buttons/cancel.svg';
// import OfflineSVG from '../public/images/buttons/offline.svg';
// import RefreshSVG from '../public/images/buttons/refresh.svg';
// import SettingsSVG from '../public/images/buttons/settings.svg';
// import MenuSVG from '../public/images/buttons/menu.svg';
// import ArrowBackSVG from '../public/images/buttons/arrow_back.svg';
// import ToggleOnSVG from '../public/images/buttons/toggle_on.svg';
// import ToggleOffSVG from '../public/images/buttons/toggle_off.svg';

export enum Icon {
    BACK,
    HOME,
    OVERVIEW,
    POWER,
    VOLUME_UP,
    VOLUME_DOWN,
    MORE,
    CAMERA,
    KEYBOARD,
    CANCEL,
    OFFLINE,
    REFRESH,
    SETTINGS,
    MENU,
    ARROW_BACK,
    TOGGLE_ON,
    TOGGLE_OFF,
}

export default class SvgImage {
    static Icon = Icon;

    private static getSvgString(type: Icon): string {
        switch (type) {
            case Icon.KEYBOARD:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48px' height='48px' viewBox='0 0 48 48' fill='var(--svg-button-fill)'>
    <path d='M40 10H8c-2.21 0-3.98 1.79-3.98 4L4 34c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zm-18 6h4v4h-4v-4zm0 6h4v4h-4v-4zm-6-6h4v4h-4v-4zm0 6h4v4h-4v-4zm-2 4h-4v-4h4v4zm0-6h-4v-4h4v4zm18 14H16v-4h16v4zm0-8h-4v-4h4v4zm0-6h-4v-4h4v4zm6 6h-4v-4h4v4zm0-6h-4v-4h4v4z'/>
    <path d='M0 0h48v48H0zm0 0h48v48H0z' fill='none'/>
</svg> `;
            // return KeyboardSVG;
            case Icon.MORE:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48px' height='48px' viewBox='0 0 48 48' fill='var(--svg-button-fill)'>
    <path d='M0 0h48v48H0z' fill='none'/>
    <path d='M12 20c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-12 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'/>
</svg>
`;
            // return MoreSVG;
            case Icon.CAMERA:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48px' height='48px' viewBox='0 0 48 48' fill='var(--svg-button-fill)'>
    <circle cx='24' cy='24' r='6.4'/>
    <path d='M18 4l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4h-6.34L30 4H18zm6 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z'/>
    <path d='M0 0h48v48H0z' fill='none'/>
</svg>
`;
            //return CameraSVG;
            case Icon.POWER:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
    <path fill='none' d='M0 0h48v48H0z'/>
    <path d='M26 6h-4v20h4V6zm9.67 4.33l-2.83 2.83C35.98 15.73 38 19.62 38 24c0 7.73-6.27 14-14 14s-14-6.27-14-14c0-4.38 2.02-8.27 5.16-10.84l-2.83-2.83C8.47 13.63 6 18.52 6 24c0 9.94 8.06 18 18 18s18-8.06 18-18c0-5.48-2.47-10.37-6.33-13.67z' fill='var(--svg-button-fill)' stroke='var(--svg-button-fill)'/>
</svg>
`;
            //return PowerSVG;
            case Icon.VOLUME_DOWN:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
    <path d='M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z' fill='var(--svg-button-fill)' stroke='var(--svg-button-fill)'/>
    <path d='M0 0h48v48H0z' fill='none'/>
</svg>
`;
            //return VolumeDownSVG;
            case Icon.VOLUME_UP:
                return `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
    <path d='M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z' fill='var(--svg-button-fill)' stroke='var(--svg-button-fill)'/>
    <path d='M0 0h48v48H0z' fill='none'/>
</svg>
`;
            //return VolumeUpSVG;
            case Icon.BACK:
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <!-- Generator: Sketch 3.3.2 (12043) - http://www.bohemiancoding.com/sketch -->
    <title>Artboard 1</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Artboard-1" sketch:type="MSArtboardGroup">
            <g id="System_Back" sketch:type="MSLayerGroup">
                <g id="Page-1" sketch:type="MSShapeGroup">
                    <g id="System_Back">
                        <g id="Rectangle-118-+-back-12-Copy-11">
                            <rect id="Rectangle-118" x="0" y="0" width="48" height="48"></rect>
                            <path d="M36.7088473,10.9494765 L36.7088478,37.6349688 C36.7088478,39.4039498 35.4820844,40.0949115 33.9646508,39.1757647 L12.1373795,25.9544497 C10.6218013,25.0364267 10.6199459,23.5491414 12.1373794,22.6299946 L33.9646503,9.40868054 C35.4802284,8.49065763 36.7088473,9.16835511 36.7088473,10.9494765 Z M33.5088482,13.4305237 L33.5088482,35.1305245 L15.5088482,24.2805241 L33.5088482,13.4305237 Z" id="Shape" fill="var(--svg-button-fill)"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`;
            //return BackSVG;
            case Icon.HOME:
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <!-- Generator: Sketch 3.3.2 (12043) - http://www.bohemiancoding.com/sketch -->
    <title>System_Home</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="System_Home" sketch:type="MSArtboardGroup">
            <g id="Rectangle-119-+-home-12-Copy-11" sketch:type="MSLayerGroup">
                <rect id="Rectangle-119" sketch:type="MSShapeGroup" x="0" y="0" width="48" height="48"></rect>
                <path d="M24,35.2 L24,35.2 C30.1855892,35.2 35.2,30.1855892 35.2,24 C35.2,17.8144108 30.1855892,12.8 24,12.8 C17.8144108,12.8 12.8,17.8144108 12.8,24 C12.8,30.1855892 17.8144108,35.2 24,35.2 L24,35.2 Z M24,38.4 L24,38.4 C16.0470996,38.4 9.6,31.9529004 9.6,24 C9.6,16.0470996 16.0470996,9.6 24,9.6 C31.9529004,9.6 38.4,16.0470996 38.4,24 C38.4,31.9529004 31.9529004,38.4 24,38.4 L24,38.4 Z" id="Shape" fill="var(--svg-button-fill)" sketch:type="MSShapeGroup"></path>
            </g>
        </g>
    </g>
</svg>
`;
            //return HomeSVG;
            case Icon.OVERVIEW:
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <!-- Generator: Sketch 3.3.2 (12043) - http://www.bohemiancoding.com/sketch -->
    <title>System_Overview</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="System_Overview" sketch:type="MSArtboardGroup">
            <g id="Rectangle-120-+-recent-12-Copy-11" sketch:type="MSLayerGroup">
                <rect id="Rectangle-120" sketch:type="MSShapeGroup" x="0" y="0" width="48" height="48"></rect>
                <path d="M12.7921429,12.8 L12.7921429,12.8 C12.7959945,12.8 12.8,12.7959954 12.8,12.7921429 L12.8,35.2078571 C12.8,35.2040055 12.7959954,35.2 12.7921429,35.2 L35.2078571,35.2 C35.2040055,35.2 35.2,35.2040046 35.2,35.2078571 L35.2,12.7921429 C35.2,12.7959945 35.2040046,12.8 35.2078571,12.8 L12.7921429,12.8 Z M12.7921429,9.6 L12.7921429,9.6 L35.2078571,9.6 C36.9718035,9.6 38.4,11.029171 38.4,12.7921429 L38.4,35.2078571 C38.4,36.9718035 36.970829,38.4 35.2078571,38.4 L12.7921429,38.4 C11.0281965,38.4 9.6,36.970829 9.6,35.2078571 L9.6,12.7921429 C9.6,11.0281965 11.029171,9.6 12.7921429,9.6 L12.7921429,9.6 Z" id="Shape" fill="var(--svg-button-fill)" sketch:type="MSShapeGroup"></path>
            </g>
        </g>
    </g>
</svg>
`;
            //return OverviewSVG;
            case Icon.CANCEL:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12,2C6.47,2 2,6.47 2,12s4.47,10 10,10 10,-4.47 10,-10S17.53,2 12,2zM12,20c-4.41,0 -8,-3.59 -8,-8s3.59,-8 8,-8 8,3.59 8,8 -3.59,8 -8,8zM15.59,7L12,10.59 8.41,7 7,8.41 10.59,12 7,15.59 8.41,17 12,13.41 15.59,17 17,15.59 13.41,12 17,8.41z'/>
</svg>
`;
            //return CancelSVG;
            case Icon.OFFLINE:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12,2.02c-5.51,0 -9.98,4.47 -9.98,9.98s4.47,9.98 9.98,9.98 9.98,-4.47 9.98,-9.98S17.51,2.02 12,2.02zM12,19.98c-4.4,0 -7.98,-3.58 -7.98,-7.98S7.6,4.02 12,4.02 19.98,7.6 19.98,12 16.4,19.98 12,19.98zM12.75,5l-4.5,8.5h3.14L11.39,19l4.36,-8.5h-3z'/>
</svg>
`;
            //return OfflineSVG;
            case Icon.REFRESH:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M17.65,6.35C16.2,4.9 14.21,4 12,4c-4.42,0 -7.99,3.58 -7.99,8s3.57,8 7.99,8c3.73,0 6.84,-2.55 7.73,-6h-2.08c-0.82,2.33 -3.04,4 -5.65,4 -3.31,0 -6,-2.69 -6,-6s2.69,-6 6,-6c1.66,0 3.14,0.69 4.22,1.78L13,11h7V4l-2.35,2.35z'/>
</svg>
`;
            //return RefreshSVG;
            case Icon.SETTINGS:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M19.43,12.98c0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98l2.11,-1.65c0.19,-0.15 0.24,-0.42 0.12,-0.64l-2,-3.46c-0.09,-0.16 -0.26,-0.25 -0.44,-0.25 -0.06,0 -0.12,0.01 -0.17,0.03l-2.49,1c-0.52,-0.4 -1.08,-0.73 -1.69,-0.98l-0.38,-2.65C14.46,2.18 14.25,2 14,2h-4c-0.25,0 -0.46,0.18 -0.49,0.42l-0.38,2.65c-0.61,0.25 -1.17,0.59 -1.69,0.98l-2.49,-1c-0.06,-0.02 -0.12,-0.03 -0.18,-0.03 -0.17,0 -0.34,0.09 -0.43,0.25l-2,3.46c-0.13,0.22 -0.07,0.49 0.12,0.64l2.11,1.65c-0.04,0.32 -0.07,0.65 -0.07,0.98 0,0.33 0.03,0.66 0.07,0.98l-2.11,1.65c-0.19,0.15 -0.24,0.42 -0.12,0.64l2,3.46c0.09,0.16 0.26,0.25 0.44,0.25 0.06,0 0.12,-0.01 0.17,-0.03l2.49,-1c0.52,0.4 1.08,0.73 1.69,0.98l0.38,2.65c0.03,0.24 0.24,0.42 0.49,0.42h4c0.25,0 0.46,-0.18 0.49,-0.42l0.38,-2.65c0.61,-0.25 1.17,-0.59 1.69,-0.98l2.49,1c0.06,0.02 0.12,0.03 0.18,0.03 0.17,0 0.34,-0.09 0.43,-0.25l2,-3.46c0.12,-0.22 0.07,-0.49 -0.12,-0.64l-2.11,-1.65zM17.45,11.27c0.04,0.31 0.05,0.52 0.05,0.73 0,0.21 -0.02,0.43 -0.05,0.73l-0.14,1.13 0.89,0.7 1.08,0.84 -0.7,1.21 -1.27,-0.51 -1.04,-0.42 -0.9,0.68c-0.43,0.32 -0.84,0.56 -1.25,0.73l-1.06,0.43 -0.16,1.13 -0.2,1.35h-1.4l-0.19,-1.35 -0.16,-1.13 -1.06,-0.43c-0.43,-0.18 -0.83,-0.41 -1.23,-0.71l-0.91,-0.7 -1.06,0.43 -1.27,0.51 -0.7,-1.21 1.08,-0.84 0.89,-0.7 -0.14,-1.13c-0.03,-0.31 -0.05,-0.54 -0.05,-0.74s0.02,-0.43 0.05,-0.73l0.14,-1.13 -0.89,-0.7 -1.08,-0.84 0.7,-1.21 1.27,0.51 1.04,0.42 0.9,-0.68c0.43,-0.32 0.84,-0.56 1.25,-0.73l1.06,-0.43 0.16,-1.13 0.2,-1.35h1.39l0.19,1.35 0.16,1.13 1.06,0.43c0.43,0.18 0.83,0.41 1.23,0.71l0.91,0.7 1.06,-0.43 1.27,-0.51 0.7,1.21 -1.07,0.85 -0.89,0.7 0.14,1.13zM12,8c-2.21,0 -4,1.79 -4,4s1.79,4 4,4 4,-1.79 4,-4 -1.79,-4 -4,-4zM12,14c-1.1,0 -2,-0.9 -2,-2s0.9,-2 2,-2 2,0.9 2,2 -0.9,2 -2,2z'/>
</svg>
`;
            //return SettingsSVG;
            case Icon.MENU:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3,18h18v-2L3,16v2zM3,13h18v-2L3,11v2zM3,6v2h18L21,6L3,6z'/>
</svg>
`;
            //return MenuSVG;
            case Icon.ARROW_BACK:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z'/>
</svg>
`;
            //return ArrowBackSVG;
            case Icon.TOGGLE_ON:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M17,7L7,7c-2.76,0 -5,2.24 -5,5s2.24,5 5,5h10c2.76,0 5,-2.24 5,-5s-2.24,-5 -5,-5zM17,15c-1.66,0 -3,-1.34 -3,-3s1.34,-3 3,-3 3,1.34 3,3 -1.34,3 -3,3z'/>
</svg>
`;
            //return ToggleOnSVG;
            case Icon.TOGGLE_OFF:
                return `<svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M17,7H7c-2.76,0 -5,2.24 -5,5s2.24,5 5,5h10c2.76,0 5,-2.24 5,-5s-2.24,-5 -5,-5zM7,15c-1.66,0 -3,-1.34 -3,-3s1.34,-3 3,-3 3,1.34 3,3 -1.34,3 -3,3z'/>
</svg>
`;
            //return ToggleOffSVG;
            default:
                return '';
        }
    }

    public static create(type: Icon): Element {
        const dummy = document.createElement('div');
        dummy.innerHTML = this.getSvgString(type);
        const svg = dummy.children[0];
        // return svg;
        const titles = svg.getElementsByTagName('title');
        for (let i = 0, l = titles.length; i < l; i++) {
            svg.removeChild(titles[i]);
        }
        return svg;
    }
}
