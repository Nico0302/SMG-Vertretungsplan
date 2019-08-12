import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, ToastAndroid, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const houses = [
    '#99203b',
    '#388e3c',
    '#ffc107',
    '#3f51b5'
];

class Logo extends PureComponent {
    state = {
        color: houses[0]
    };

    changeHouse = () => {
        this.setState({
            color: houses[(houses.indexOf(this.state.color)+1)%houses.length]
        }, () => {
            if (Platform.OS === 'android')
                ToastAndroid.show('🧙 Changed House', ToastAndroid.SHORT)
        });
    }

    render() {
        const { size } = this.props;
        const { color } = this.state;

        return (
            <TouchableWithoutFeedback
                delayLongPress={200}
                onLongPress={this.changeHouse}
            >
                <Svg
                    width={size}
                    height={size}
                    viewBox="0 0 4075 4075"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit={1.414}
                >
                    <Path d="M412.306 3264.76c-112.668-148.91-205.14-312.99-273.006-486.54C47.484 2543.44.368 2291.82.167 2038.98c-.216-273.2 54.797-546.33 161.415-797.15 133.089-313.102 347.372-592.958 614.732-804.085C1031.99 235.848 1336.82 96.313 1656.6 35.753 1781.39 12.118 1908.17.319 2035.69.167h3.29c283.21.337 565.38 59.645 823.7 174.383 205.67 91.35 396.15 217.393 560.98 370.612 204.02 189.647 368.88 421.018 480.83 676.748 103.86 237.24 161.51 495.46 169.12 754.7 9.51 324.07-58.23 647.58-198.13 939.43-58.93 122.95-130.22 239.73-212.4 348.4-.36.53-.74 1.04-1.15 1.53a2051.617 2051.617 0 0 1-212.74 239.39c-232.46 223.65-518.49 391.42-827.32 483.89-313.13 93.76-648.68 110.4-969.96 48.77-314.69-60.37-615.19-197.32-868.38-395.43-138.906-108.68-263.511-235.74-370.098-376.35-.4-.47-.776-.97-1.126-1.48zM2020.67 3734.3h-864.84c26.53 48 54.43 95.21 83.72 141.47 194.47 84.48 402.16 137.72 613.55 157.03 55.73 5.08 111.64 7.83 167.57 8.25V3734.3zm911.37 0H2054v306.73c257.32-2.31 514-53.79 751.74-152.71 15.96-6.64 31.84-13.5 47.62-20.56 27.47-43.7 53.69-88.22 78.68-133.46zm-1814.34 0H971.91c48.13 30.34 97.55 58.64 148.12 84.75 21.42 11.05 43.04 21.71 64.83 31.98a2811.2 2811.2 0 0 1-67.16-116.73zm1984.73 0h-132.48a2811.536 2811.536 0 0 1-61.81 107.94c66.71-32.34 131.59-68.4 194.29-107.94zM914.516 3271.86H459.334c130.016 165.76 286.42 311.17 461.45 429.11h179.066c-72.69-137.89-134.28-281.73-185.261-428.9l-.073-.21zM2020.67 751.559h-993.54C960.12 907.702 906.139 1069.57 864.555 1234.6h524.805l-7 33.33H856.334a3472.587 3472.587 0 0 0-35.859 166.5c-31.342 164.99-50.801 332.31-58.787 500.26H1089l-13 33.34H760.253a3722.45 3722.45 0 0 0-2.712 125.73c-.858 182.88 11.699 366.13 38.153 547.06h441.856l-12.03 33.34H800.729c29.934 191.99 75.598 381.18 137.572 564.37H1529l-13 33.33H949.781c25.449 72.6 53.489 144.22 84.159 214.65 31.67 72.74 66.26 144.39 103.76 214.46h882.97v-429.11H1948l106-67.86v34.53h1095.33c62.04-183.48 107.69-372.59 137.61-564.37h-418.49l-18.23-33.34h441.76c26.68-182.42 39.2-367.09 38.12-551.44-.23-40.47-1.13-80.93-2.69-121.35h-446.96l19-33.34h426.53c-4.08-85.84-11.15-171.51-21.27-256.77l32.46-10.09c10.66 88.6 18.04 177.64 22.22 266.86h679.2c-4.81-94.87-16.31-189.41-34.49-282.63-25.66-131.56-64.89-260.43-116.48-384.13h-621.88c14.1 58.9 26.64 118.19 37.65 177.79l-36.41-12.56a3453.716 3453.716 0 0 0-35.67-165.23h-362.86l-56.94-33.33h411.57a3357.323 3357.323 0 0 0-41.05-148.22c-34.32-113.69-74.75-225.663-121.52-334.821H2054V963h-33.33V751.559zM3137.85 3271.86H2054v429.11h896.16c73.6-137.6 135.99-281.52 187.69-429.11zm477.48 0h-442.16c-15.39 44.4-31.74 88.47-49.05 132.15-40.16 101.3-85.56 200.61-136.33 296.96h165.79c174.84-117.76 331.38-262.9 461.75-429.11zm-2848.36-597.7H137.098c64.497 191.85 158.195 373.85 276.842 537.51 6.528 9.01 13.132 17.96 19.811 26.86h469.42c-61.408-183.66-106.591-372.71-136.201-564.37zm3170.38 0H3320.7c-29.6 191.69-74.77 380.81-136.18 564.37h456.4c4.26-5.69 8.5-11.39 12.71-17.12 122.09-166.31 217.96-351.66 283.72-547.25zM726.895 1968.03H34.787c-5.723 167.01 9.155 334.65 44.61 497.34a1972.349 1972.349 0 0 0 46.821 175.45h635.763c-26.118-180.28-38.532-362.71-37.782-545 .175-42.6 1.071-85.21 2.696-127.79zm3313.115 0H3360.8a3786.75 3786.75 0 0 1 2.36 194.19c-2.16 160.05-14.53 320.14-37.47 478.6h622.54c33.89-106.95 58.81-216.78 74.13-328.07 15.71-114.05 21.59-229.55 17.65-344.72zm-3217.933-700.1H186.945c-35.064 83.97-64.396 170.33-87.583 258.37-35.118 133.34-56.168 270.52-63.159 408.39h692.114c10.583-224.62 41.499-448.31 93.76-666.76zM990.91 751.559H500.87C378.76 897.413 277.614 1060.58 201.22 1234.6h629.008a3392.734 3392.734 0 0 1 34.85-128.73c35.113-120.25 76.96-238.773 125.832-354.311zm2582.87 0h-477.16a3133.898 3133.898 0 0 1 27.5 67.095c53.73 135.536 98.12 274.566 133.47 415.946h615.78c-62.27-142.05-140.93-276.88-234.12-400.677a1998.662 1998.662 0 0 0-65.47-82.364zM1198.11 349.976H956.93c-152.992 98.312-292.695 217.287-413.685 352.607-4.64 5.19-9.253 10.404-13.838 15.643h475.833c55.54-127.119 119.7-250.435 192.87-368.25zm822.56 0h-783.12a2700.752 2700.752 0 0 0-34.22 55.704c-60.27 100.796-114.08 205.26-161.66 312.546h979v-368.25zm829.55 0H2054v368.25h991.99c-56.38-127.366-121.51-250.703-195.77-368.25zm267.47 0h-228.21c73.07 117.737 137.22 241.111 192.8 368.25h462.91c-124.4-141.871-268.73-266.182-427.5-368.25zM1324.56 164.239a1952.074 1952.074 0 0 0-99.04 40.775c-73.81 32.782-145.59 70.118-214.88 111.628h208.51c33.33-51.973 68.46-102.824 105.41-152.403zm696.11-130.664c-216.43 1.889-433.15 38.955-638.31 109.719-43.57 56.008-84.7 113.924-123.44 173.348h761.75V33.575zm33.33-.004v283.071h774.81c-33.43-51.226-68.64-101.299-105.65-150.069-4.33-5.706-8.69-11.394-13.07-17.062-199.7-71.046-410.59-110.016-621.06-115.356a2035.88 2035.88 0 0 0-35.03-.584zm714.28 137.678c35.03 47.319 68.41 95.831 100.17 145.393H3064c-68.8-41.233-140.09-78.356-213.46-111.01a1951.813 1951.813 0 0 0-82.26-34.383z" />
                    <Path
                        d="M2644.142 2415.658l70.032 80 60.027-30c105.257 172.06 236.646 434.15 250.112 610-653.904-69.23-1077.985 121.62-1570.706 610-20.79-186.14-9.995-383.27 90.04-510l-50.022-60c73.513-63.76 145.005-118.27 190.085-190 29.393-46.77-19.629-87.84-50.022-80l-260.117 70c-75.144 20.72-245.14-32.4-220.1-120 29.104-101.81 61.939-160.1 60.028-200-2.852-59.29-47.802-54.64-50.023-100-1.02-20.72 12.396-37.16 20.01-60-20.4-12.23-49.373-31.07-50.023-40-4.062-56 35.356-73.17 20.009-110-24.691-59.25-60.658-46.72-130.059-40-33.285 3.23-123.485-9.33-80.036-90l120.054-220c47.281-86.64 144.655-109.17 130.059-180-17.068-82.83-56.726-91.21-10.005-150l158.922-253.36 506.578 298.21c.29 98.72-13.607 197.27-43.08 291.66l-9.034 28.32 874.824 281.65s28.112 43.69 62.398 123.52c6.973 16.23 2.48 41.06-25.162 40.75l-64.789-.75zM1347.82 1297.398l15.747-101.74c-107.588-54.83-216.457-155.71-330.148-300-15.887-20.16 0-50 0-50 672.282 90.27 947.876 116.93 1340.603 90 411.035 302.25 731.609 424.36 1170.526 570 0 0 5.653 31.36-10.004 50-116.443 138.66-270.222 174.43-510.23 160-60.927 183.24-161.763 350.37-299.865 500.92l-864.979-278.75c29.474-102.83 41.129-209.57 39.068-316.63l-550.718-323.8z"
                        fill={color}
                    />
                </Svg>
            </TouchableWithoutFeedback>
        )
    }
}

export default Logo;