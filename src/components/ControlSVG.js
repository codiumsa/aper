import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useSVGStyles = makeStyles(() => ({
  cls1: { fill: '#3c676d' },
  cls2: { fill: '#284548' },
  cls3: { fill: '#718ca4' },
  cls4: { fill: '#82a8d1' },
  cls5: { fill: '#fff1a6', cursor: 'pointer' },
  cls6: { fill: '#e8d986', cursor: 'pointer' }
}));
const ControlSVG = ({ onButtonClick, className }) => {
  const classes = useSVGStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="511.99"
      height="512"
      viewBox="0 0 511.99 512"
      className={className}
    >
      <defs />
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className={classes.cls1}
            d="M361.72,261,251,150.28a52.55,52.55,0,0,0-74.31,0L15.39,311.58a52.55,52.55,0,0,0,0,74.31L126.11,496.61a52.55,52.55,0,0,0,74.31,0l161.3-161.3A52.55,52.55,0,0,0,361.72,261Z"
          />
          <path
            className={classes.cls2}
            d="M361.72,261l-20.6-20.61a52.55,52.55,0,0,1,0,74.31L179.81,476a52.55,52.55,0,0,1-74.31,0l20.61,20.6a52.55,52.55,0,0,0,74.31,0l161.3-161.3A52.55,52.55,0,0,0,361.72,261Z"
          />
          <path
            className={classes.cls3}
            d="M381.85,157.88a27.74,27.74,0,1,1-27.73-27.74A27.74,27.74,0,0,1,381.85,157.88Z"
          />
          <path
            className={classes.cls3}
            d="M484.5,167.13a16,16,0,0,1-4.71-11.22,125,125,0,0,0-123.7-123.7A16.11,16.11,0,0,1,356.42,0,157.18,157.18,0,0,1,512,155.59a16.1,16.1,0,0,1-27.49,11.54Z"
          />
          <path
            className={classes.cls4}
            d="M420.8,177.7a16,16,0,0,1-4.72-11.22,71.3,71.3,0,0,0-70.56-70.57,16.1,16.1,0,0,1,.32-32.2A103.49,103.49,0,0,1,448.28,166.16,16.09,16.09,0,0,1,420.8,177.7Z"
          />
          <g id="boton-amarillo" onClick={onButtonClick}>
            <path
              className={classes.cls5}
              d="M235.39,323.44a50.84,50.84,0,1,1-50.84-50.84A50.84,50.84,0,0,1,235.39,323.44Z"
            />
            <path
              className={classes.cls6}
              d="M220.5,287.49a51.28,51.28,0,0,0-9.18-7.27,50.84,50.84,0,0,1-70,70,50.84,50.84,0,1,0,79.16-62.73Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default ControlSVG;
