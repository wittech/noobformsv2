import masterData from '../api/masterData';

export const CLICK_MENU = "CLICK_MENU";
export const DRAG_TOOLITEM_START = "DRAG_TOOLITEM_START";
export const SELECT_TOOLPANEL_TREE = "SELECT_TOOLPANEL_TREE"
export const FETCH_HIERARCHY = "FETCH_HIERARCHY"
export const SELECT_CONTROL = "SELECT_CONTROL"

export function menuClicked(menuName) { 
    return {
      type: CLICK_MENU,
      payload: menuName
    };
}

export function toolItemDragged(toolName) { 
  return {
    type: DRAG_TOOLITEM_START,
    payload: toolName
  };
}

export function selectToolPanelTree(hierarchyId) {
  return {
    type: SELECT_TOOLPANEL_TREE,
    payload: hierarchyId
  };
}


export const fetchHierarchy = () => async dispatch => { 
  console.log('[action]fetchHierarchy');
  const response = await masterData.get('hierarchy')

  dispatch({
    type: FETCH_HIERARCHY,
    payload: response
  });
}

export const selectedControl = (controlId) => {
  return {
    type: SELECT_CONTROL,
    payload: controlId
  }
}