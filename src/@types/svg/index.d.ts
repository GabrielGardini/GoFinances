declare module "*.svg"{
    import React from "react";
    import {SvgProps} 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
