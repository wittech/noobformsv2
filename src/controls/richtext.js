import React, {useState, useEffect} from 'react';
import './common.css';
import './richtext.css';
import 'draft-js/dist/Draft.css';
import { stateFromHTML } from 'draft-js-import-html'


import noobControlHoc from '../hoc/noobControlsHoc';

import { Editor, EditorState, RichUtils, ContentState, convertFromRaw } from 'draft-js';

const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

// This is now just a Read-only component.
// Let the user modify the contents at the Properties Panel area
const RichText = (props) => {
    let initialState;
    debugger
    if (props.data.richTextData) {
        initialState = EditorState.createWithContent(convertFromRaw(props.data.richTextData));
    }
    else {
        //initialState = EditorState.createEmpty();
        initialState = EditorState.createWithContent(ContentState.createFromText('Hello\r\nworld')); // to test if it can handle new line
    }
    const [editorState, setEditorState] = useState(initialState);

    useEffect(() => {      
      setEditorState(initialState)
    }, [props.data.richTextData]);

    //https://github.com/jpuri/react-draft-wysiwyg/issues/4
    //https://codepen.io/Kiwka/pen/YNYvyG
    let classNames = 'richTextMainContainer ';
    if (props.selected === true) {
        classNames += ' ctrl-selected'
    }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
        <div className={classNames}>
            <div className="controlLabel">{props.data.label}</div>
            <div className="RichEditor-root designerRichTextEditor">
                <div className={className}>
                    <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    placeholder={props.data.placeholder}
                    spellCheck={true}
                    readOnly
                    />
                </div>
            </div>
        </div>
    );
}

export default noobControlHoc(RichText);

// Image Props section
export const richTextProps = [
  {
    name: 'richTextData', 
    propType: 'richText',
    toolTip: 'Optional. This data will not be shown if this control is configured to show contents from API.'
  },
  {
    name: 'dataProps', 
    propType: 'section',
  },
  {
    name: 'datasetId', 
    propType: 'number',
  },
  {
    name: 'requestType', 
    propType: 'metadata',
    metadataField: 'requestTypes',
    metadataPropType: 'dropdown'
  },
  {
    name: 'filterName', 
    propType: 'metadata',
    metadataField: 'dimensions',
    metadataPropType: 'treeDropdown'
  },
]