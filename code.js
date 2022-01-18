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
    case "layout_mode":
        for (let node of figma.currentPage.selection) {
            if (isFrameLike(node)) {
                if (node.layoutMode === "HORIZONTAL") {
                    node.layoutMode = "VERTICAL";
                }
                else if (node.layoutMode === "VERTICAL") {
                    node.layoutMode = "HORIZONTAL";
                }
            }
        }
        break;
    case "align_left":
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
    case "align_right":
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
    case "align_up":
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
    case "align_down":
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
// const nodes: SceneNode[] = [];
// for (let i = 0; i < numberOfRectangles; i++) {
//   const rect = figma.createRectangle();
//   rect.x = i * 150;
//   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//   figma.currentPage.appendChild(rect);
//   nodes.push(rect);
// }
// figma.currentPage.selection = nodes;
// figma.viewport.scrollAndZoomIntoView(nodes);
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
function isFrameLike(node) {
    return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "INSTANCE";
}
function isConstraintsLike(node) {
    return true;
}
