import React from 'react';
import ImageMapper from './imageMapperLib';
import './imageMap.css';
import noobControlHoc from '../hoc/noobControlsHoc';

// Should use different names if there are more than 1 instance of maps in the web page
// Otherwise the mouse pointer will have conflicts
// The coordinates are against the orig image dimension because imgWidth is specified
const MAP ={
    name: "myMap",
    areas: [
        {name: "Room 1", shape: "circle", coords: [170, 20, 15 ], preFillColor: "blue"},
        {name: "Room 2", shape: "circle", coords: [400, 120, 15 ], preFillColor: "#ffcf0c"},
        {name: "Room 3", shape: "circle", coords: [70, 100, 15 ], preFillColor: "green"},
    ]
};

const MAP2 ={
    name: "myMap2",
    areas: [
        {name: "Room A", shape: "circle", coords: [140, 20, 15 ], preFillColor: "red"},
        {name: "Room B", shape: "circle", coords: [200, 150, 15 ], preFillColor: "#ffcf0c"},
        {name: "Room C", shape: "circle", coords: [90, 120, 15 ], preFillColor: "magenta"},
        {name: "Room D", shape: "circle", coords: [40, 180, 15 ], preFillColor: "cyan"},
        {name: "Room E", shape: "circle", coords: [390, 25, 15 ], preFillColor: "orange"},
        {name: "Room F", shape: "circle", coords: [380, 190, 15 ], preFillColor: "maroon"},
    ]
};



class ImageMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
            scaledImgW: null,
            scaledImgH: null,
            hoveredArea: null
        }
        this.imageLoadHandler = this.imageLoadHandler.bind(this);
    }

    imageLoadHandler(e) {

        let origImgW = e.srcElement.width;
        let origImgH = e.srcElement.height;
        if (!!this.props.maxWidth) {
            
            this.setState({
                imageLoaded: true,
                origImgW,
                origImgH
            });    
        }
        else {
            this.setState({
                imageLoaded: true,
                origImgW,
                origImgH
            });    
        }
    }

    componentDidMount() {
        var img = new Image();
        img.onload = this.imageLoadHandler;
        img.src="http://1.bp.blogspot.com/-IiQzSfQwqys/UMc798CtfzI/AAAAAAAAAG0/IQCyIR2eZeU/s1600/layout.gif";
    }

    enterArea(area) {
        console.log('enterArea', area)
		this.setState({
			hoveredArea: area,
		});
	}
    
    leaveArea(area) {
		this.setState({
			hoveredArea: null,
		});
    }

    getTipPosition(area) {
        // if (!area) {
        //     return {top: '170px', left: '100px'};
        // }
        console.log('[getTipPosition]', area.center[1], area.center[0]);
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }
    
    computeWidthHeight(origImgW, origImgH, maxWidthPx) {
        if (!!maxWidthPx) {
            let propsMaxWidth = parseFloat(maxWidthPx) - 25;
            let scaledImageH = propsMaxWidth / origImgW * origImgH;
            return {
                w: propsMaxWidth,
                h: scaledImageH
            }
        }
        else {
            return {
                w: origImgW,
                h: origImgH
            }
        }
    }
    
    render() {
        if (!this.state.imageLoaded) {
            return <div>Loading Image...</div>;
        }
        let classNames = this.props.selected === true ? 'ctrl-selected' : '';
        var computedSize = this.computeWidthHeight(this.state.origImgW, this.state.origImgH, this.props.maxWidth);

        return <div style={{ position: "relative" }} className={classNames}>
            <ImageMapper src="http://1.bp.blogspot.com/-IiQzSfQwqys/UMc798CtfzI/AAAAAAAAAG0/IQCyIR2eZeU/s1600/layout.gif"
                map={this.props.useOther ? MAP2 : MAP}
                onMouseEnter={area => this.enterArea(area)}
                onMouseLeave={area => this.leaveArea(area)}
                width={computedSize.w} // get it from the container width
                height={computedSize.h} // calculate based on the image aspect ratio
                imgWidth={this.state.origImgW}
                // onClick={area => this.clickArea(area)}
        >
        </ImageMapper>
        {this.state.hoveredArea && (
            <span className="imageMapToolTip" style={{ ...this.getTipPosition(this.state.hoveredArea) }}>
                {this.state.hoveredArea.name}                
            </span>
        )}
        </div>
    }
}

export default noobControlHoc(ImageMap);