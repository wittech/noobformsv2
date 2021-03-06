import React from 'react';
import NoobSplitter from '../components/noobSplitter';
import ToolPanel from '../components/toolPanel';
import DesignerForm from '../components/designerForm';
import DesignerContentbase from './designerContentBase';
import DesignerToolbar from '../components/designerToolbar';
import {connect} from 'react-redux';

const DEFAULT_SPLIT_SIZES = [15, 85];

// Uses RGL for the layouting
class DashboardDesignerContent extends DesignerContentbase {
    
    constructor(props) {
        super(props);
        this.defaultSizes = DEFAULT_SPLIT_SIZES;
    }

    render() {
        console.log('render dashboard designerContent');
        return <NoobSplitter id="designerPanel" onDragEnd={this.onSplitDragEnd} defaultSize={DEFAULT_SPLIT_SIZES}>
            <ToolPanel containerWidth={this.state.leftPixels}/>
            <div>
                <DesignerToolbar containerWidth={this.state.rightPixels}/>                    
                <DesignerForm containerWidth={this.state.rightPixels} controls={this.props.layout}/>
            </div>
        </NoobSplitter>
    }
}

const mapStateToProps = (state) => {
    return {
        layout: state.designer.dashLayout,
        layoutData: state.designer.dashLayoutData,
    };
}

export default connect(mapStateToProps)(DashboardDesignerContent);