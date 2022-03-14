// This plugin creates 5 rectangles on the screen.
//const numberOfRectangles = 5

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// for (let node of figma.currentPage.selection) {
//   console.log(node.type);
//   if (isConstraintsLike(node)) {
//     console.log(node.constraints);
//   }
// }

switch (figma.command) {

  case "layout_mode": {
    for (let node of figma.currentPage.selection) {
      if (isFrameLike(node)) {
        if (node.layoutMode === "HORIZONTAL") {
          node.layoutMode = "VERTICAL";
        } else if (node.layoutMode === "VERTICAL") {
          node.layoutMode = "HORIZONTAL";
        }
        const tmp = node.primaryAxisSizingMode;
        node.primaryAxisSizingMode = node.counterAxisSizingMode;
        node.counterAxisSizingMode = tmp;
      }
    }
    break;
  }

  case "align_left": {
    for (let node of figma.currentPage.selection) {
      if (isFrameLike(node)) {
        switch (node.counterAxisAlignItems) {
          case "MAX":
            node.counterAxisAlignItems = "CENTER";
            break;
          case "CENTER":
            node.counterAxisAlignItems = "MIN";
            break;
        }
      }
    }
    break;
  }

  case "align_right": {
    for (let node of figma.currentPage.selection) {
      if (isFrameLike(node)) {
        switch (node.counterAxisAlignItems) {
          case "MIN":
            node.counterAxisAlignItems = "CENTER";
            break;
          case "CENTER":
            node.counterAxisAlignItems = "MAX";
            break;
        }
      }
    }
    break;
  }

  case "align_up": {
    for (let node of figma.currentPage.selection) {
      if (isFrameLike(node)) {
        switch (node.primaryAxisAlignItems) {
          case "MAX":
            node.primaryAxisAlignItems = "CENTER";
            break;
          case "CENTER":
            node.primaryAxisAlignItems = "MIN";
            break;
        }
      }
    }
    break;
  }

  case "align_down": {
    for (let node of figma.currentPage.selection) {
      if (isFrameLike(node)) {
        switch (node.primaryAxisAlignItems) {
          case "MIN":
            node.primaryAxisAlignItems = "CENTER";
            break;
          case "CENTER":
            node.primaryAxisAlignItems = "MAX";
            break;
        }
      }
    }
    break;
  }

  // Frame
  // 横向：
  // - Hug: layoutAlign=INHERIT layoutGrow=0 primaryAxisAlignItems=MIN primaryAxisSizingMode=AUTO
  // - Fill: layoutAlign=STRETCH layoutGrow=0 primaryAxisAlignItems=MIN primaryAxisSizingMode=FIXED
  // - Fixed: layoutAlign=INHERIT layoutGrow=0 primaryAxisAlignItems=MIN primaryAxisSizingMode=FIXED
  // 纵向：
  // - Hug: layoutAlign=INHERIT layoutGrow=0 primaryAxisAlignItems=MIN primaryAxisSizingMode=AUTO counterAxisSizingMode=AUTO
  // - Fill: layoutAlign=INHERIT layoutGrow=1 primaryAxisAlignItems=MIN primaryAxisSizingMode=AUTO counterAxisSizingMode=FIXED
  // - Fixed: layoutAlign=INHERIT layoutGrow=0 primaryAxisAlignItems=MIN primaryAxisSizingMode=AUTO counterAxisSizingMode=FIXED

  case "layout_align_primary_fill": {
    for (let node of figma.currentPage.selection) {
      if (node.type === 'FRAME') {
        if (node.layoutMode === 'HORIZONTAL') {
          layoutAlignPrimaryFill(node);
        } else if (node.layoutMode === 'VERTICAL') {
          layoutAlignCounterFill(node);
        }
      }
    }
    break;
  }

  case "layout_align_primary_hug": {
    for (let node of figma.currentPage.selection) {
      if (node.type === 'FRAME') {
        if (node.layoutMode === 'HORIZONTAL') {
          layoutAlignPrimaryHug(node);
        } else if (node.layoutMode === 'VERTICAL') {
          layoutAlignCounterHug(node);
        }
      }
    }
    break;
  }

  case "layout_align_counter_fill": {
    for (let node of figma.currentPage.selection) {
      if (node.type === 'FRAME') {
        if (node.layoutMode === 'HORIZONTAL') {
          layoutAlignCounterFill(node);
        } else if (node.layoutMode === 'VERTICAL') {
          layoutAlignPrimaryFill(node);
        }
      }
    }
    break;
  }

  case "layout_align_counter_hug": {
    for (let node of figma.currentPage.selection) {
      if (node.type === 'FRAME') {
        if (node.layoutMode === 'HORIZONTAL') {
          layoutAlignCounterHug(node);
        } else if (node.layoutMode === 'VERTICAL') {
          layoutAlignPrimaryHug(node);
        }
      }
    }
    break;
  }

}

figma.closePlugin();

function isFrameLike(node: BaseNode): node is FrameNode | ComponentNode | InstanceNode {
  return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE"
}

function isConstraintsLike(node: BaseNode): node is SceneNode & ConstraintMixin {
  return true;
}

function layoutAlignPrimaryFill(node: FrameNode) {
  node.layoutAlign = 'STRETCH';
  node.primaryAxisSizingMode = 'FIXED';
}

function layoutAlignPrimaryHug(node: FrameNode) {
  node.layoutAlign = 'INHERIT';
  node.primaryAxisSizingMode = 'AUTO';
}

function layoutAlignCounterFill(node: FrameNode) {
  node.layoutGrow = 1;
  node.counterAxisSizingMode = 'FIXED';
}

function layoutAlignCounterHug(node: FrameNode) {
  node.layoutGrow = 0;
  node.counterAxisSizingMode = 'AUTO';
}