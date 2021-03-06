import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Gauge as CanvasGauge, Donut, TextRenderer} from 'gaugeJS/dist/gauge.min';
import noobControlHoc from '../hoc/noobControlsHoc';
import './gauge.css';
import {ROW_HEIGHT} from '../components/noobControl';

//https://github.com/keanemind/react-gaugejs/blob/master/Gauge.js
/**
 * React wrapper for GaugeJS.
 * @param {*} props
 * @return {Object} React element
 */
function Gauge(props) {
  const canvas = useRef();
  const span = useRef();
  const gauge = useRef();

  useEffect(() => {
    // Observe the span node
    const config = {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    };
    const observer = new MutationObserver((mutationsList, observer) => {
      props.textChangeHandler(span.current.innerText);
    });
    observer.observe(span.current, config);

    // var textRenderer = new TextRenderer(document.getElementById('preview-textfield'))
    // textRenderer.render = function(gauge){
    //   var percentage = gauge.displayedValue / gauge.maxValue;
    //   this.el.innerHTML = (percentage * 100).toFixed(2) + "%"
    //   debugger
      
    // };
    // gauge.current.setTextField(textRenderer);

    return () => {
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    gauge.current = (
      props.donut ? new Donut(canvas.current) : new CanvasGauge(canvas.current)
    );
    gauge.current.setTextField(span.current);
    gauge.current.setOptions(props.options);
    gauge.current.maxValue = props.maxValue;
    gauge.current.setMinValue(props.minValue);
    gauge.current.animationSpeed = props.animationSpeed;
    gauge.current.set(props.value);
  }, [props.donut]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    gauge.current.setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    gauge.current.maxValue = props.maxValue;
  }, [props.maxValue]);

  useEffect(() => {
    gauge.current.setMinValue(props.minValue);
  }, [props.minValue]);

  useEffect(() => {
    gauge.current.animationSpeed = props.animationSpeed;
  }, [props.animationSpeed]);

  useEffect(() => {
    gauge.current.set(props.data.percent);

    // To allow decimal values on the label
    var textRenderer = new TextRenderer(span.current)
    textRenderer.render = function(gauge){
      var percentage = gauge.displayedValue / gauge.maxValue;
      this.el.innerHTML = (percentage * 100).toFixed(2) + "%"
      
    };
    gauge.current.setTextField(textRenderer);

  }, [props.data.percent]);

  /* eslint-disable no-unused-vars */
  const {
    maxValue,
    minValue,
    animationSpeed,
    options,
    donut,
    value,
    textChangeHandler,
    ...passThroughProps
  } = props;
  /* eslint-enable no-unused-vars */

  let classNames = 'gauge';
  if (props.selected === true) {
      classNames += ' ctrl-selected'
  }

  // aspect ratio of w:h is 2:1
  // We compute the height based on the number of rows allocated (default height only)
  // then we compute the width
  let height = props.h * ROW_HEIGHT - 50; // subtract 50 for the gauge size
  let width = height*2;
  if (props.maxWidth) {
    let maxWidth = parseInt(props.maxWidth);
    if (width > maxWidth) {
      width = maxWidth;
      height = width / 2;
    }
  }
  
  let heightPx = `${height}px`; // subtract 50 for the gauge size
  let widthPx = `${height*2}px`;

  // TODO: Ruined the web resizing after fixing the report alignment/sizing
  // Separate the function for web/reporting if necessary
  // Another issue: the gauge canvas does not appear if the gauge is not visible during the time it was rendered (e.g. default tab is not forms designer)
  // Might not need to fix since there won't be any gauge in the default layout
  return (
    <div className={classNames}>
      <div className="controlLabel">{props.data.label}</div>
      <div className="gauge-svgContainer">
      <div className="gauge-svgContainer2">
        <canvas ref={canvas} style={{width:widthPx, height: heightPx}} className="canvas-preview" ></canvas>
        <div ref={span} className="preview-textfield gauge-label"></div>
      </div>      
      </div>      
    </div>
  );
}

Gauge.defaultProps = {
  maxValue: 100,
  minValue: 0,
  animationSpeed: 100000,
  options: {
    angle: 0.0,
    lineWidth: 0.15,
    radiusScale: 0.9,
    pointer: {
      length: 0.5,
      strokeWidth: 0.05,
      color: 'black',
    },
    limitMax: false,
    limitMin: false,
    // colorStart: 'red',
    // colorStop: 'green',
    strokeColor: '#ff0000',
    generateGradient: true,
    highDpiSupport: true,
    staticZones: [
      {strokeStyle: "red", min: 0, max: 20}, // Red from 100 to 130
      {strokeStyle: "gold", min: 20, max: 80}, // Yellow
      {strokeStyle: "green", min: 80, max: 100}, // Green
    ],  
    // These are the small labels around the gauge
    staticLabels: {
      font: "15px",  // Specifies font
      labels: [0, 20, 80, 100],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    fractionDigits: 2
  },
  donut: false,
  textChangeHandler: () => {},
  value: 85.5, // Do not set to 0...bug in the library...will render a small dot on upper left corner. set to a very small number instead like 0.0001
};

Gauge.propTypes = {
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  animationSpeed: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  donut: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  textChangeHandler: PropTypes.func.isRequired,
};

export default noobControlHoc(Gauge);