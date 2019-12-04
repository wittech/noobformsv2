import React from 'react';
import './noobForm.css'
// controls
import Section from '../controls/section';
import RichText from '../controls/richtext';
import Combobox from '../controls/combo';
import ShowMessage, {NotifType} from '../helper/notification';


import { useDrag } from 'react-dnd'

// Separate the content-part into a standalone component from the control wrapper
// Reason: this will be the only part that will be resized or moved while dragging (moving or resizing)
// We don't want to include the resizer or landing pads in the drag image

export const ControlDragTypes = {
    CONTROL: 'Control'
}

const getContentDiv = (controlData) => {
    // Wrap the contents so that when resizing or moving, they will be together
    // Also this should be floated. We don't want to resize or move the parent
    let content = null;
    switch(controlData.ctrlType) {
        case 'section':
            content = <Section {...controlData}></Section>
            break;
        case 'richtext':
            content = <RichText {...controlData}></RichText>
            break;
        case 'combo':
            content = <Combobox {...controlData}></Combobox>
            break;
        case undefined:
            content = <div className="emptyControl"></div>
            break
        default:
            content = <div>{controlData.i}</div>
            break;
    }

    return content;
}

const handleEndDrag = (item, monitor) => {
    if (monitor.didDrop()) {
        return;
    }

    ShowMessage('Control was not moved', 
    NotifType.info, 
    'Please drop the control into an empty cell, or make sure there is sufficient space for larger controls')
}

const NoobControlContent = (controlData) => {
    const [{ isDragging }, drag] = useDrag({
        item: { 
            ...controlData,
            type: ControlDragTypes.CONTROL,
            
            // x: controlData.x,
            // y: controlData.y,
            // w: controlData.w,
            // h: controlData.h,
            // i: controlData.i
        },
        canDrag: !!controlData.ctrlType, // Do not allow empty controls to be dragged
        end: (item, monitor) => handleEndDrag(item, monitor),
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

    const styles = {
        opacity: isDragging? 0.5 : 1,
    };
    return <div className="contentWrapper" ref={drag} style={styles}>
        {getContentDiv(controlData)}
    </div>        
}

export default NoobControlContent;