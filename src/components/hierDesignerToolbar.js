import React from 'react';
import './hierDesignerToolbar.css';

// Toolbar for the Hierachy Designer.
// It is permanently placed on top.
// Houses the search bar and other buttons
const HierarchyToolbar = ({onDelete, onInsert, onSave, onSearchText, bEnableDelete}) => {
    let clsNamesDeleteBtn = 'hierDesignerToolbarButton';
    if (!bEnableDelete) {
        clsNamesDeleteBtn += ' hierDesignerToolbarButton-disabled';
    }
    return <div className="hierDesignToolbar">
        <div className="ui icon input small fluid" style={{margin: "5px", width: "100%"}}>
            <input type="text" placeholder="Search tree..." onChange={onSearchText}/>
            <i className="inverted circular filter icon"></i>
        </div>
        <div className="toolBarBtnContainer">
            <div className="hierDesignerToolbarButton" onClick={onSave}>
            <i className="ui icon save"/>
            Save
            </div>
            <div className="hierDesignerToolbarButton" onClick={onInsert}>
            <i className="ui icon plus insert"/>
            Insert
            </div>
            <div className={clsNamesDeleteBtn} onClick={onDelete}>
            <i className="ui icon trash alternate"/>
            Delete
            </div>
        </div>
    </div>
}

export default HierarchyToolbar;