/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/

// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
    // This plugin will open a window to prompt the user to enter a number, and
    // it will then create that many rectangles on the screen.
    // This shows the HTML page in "ui.html".
    figma.showUI(__html__);
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    figma.ui.onmessage = msg => {
        // One way of distinguishing between different types of messages sent from
        // your HTML page is to use an object with a "type" property like this.
        if (msg.type === 'create-shapes') {
            const nodes = [];
            for (let i = 0; i < msg.count; i++) {
                const rect = figma.createRectangle();
                rect.x = i * 150;
                rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
        figma.closePlugin();
    };
    // If the plugins isn't run in Figma, run this code
}
else {
    // This plugin will open a window to prompt the user to enter a number, and
    // it will then create that many shapes and connectors on the screen.
    // This shows the HTML page in "ui.html".
    figma.showUI(__html__);
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    figma.ui.onmessage = msg => {
        // One way of distinguishing between different types of messages sent from
        // your HTML page is to use an object with a "type" property like this.
        if (msg.type === 'create-shapes') {
            const numberOfShapes = msg.count;
            const nodes = [];
            for (let i = 0; i < numberOfShapes; i++) {
                const shape = figma.createShapeWithText();
                // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
                shape.shapeType = 'ROUNDED_RECTANGLE';
                shape.x = i * (shape.width + 200);
                shape.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
                figma.currentPage.appendChild(shape);
                nodes.push(shape);
            }
            ;
            for (let i = 0; i < (numberOfShapes - 1); i++) {
                const connector = figma.createConnector();
                connector.strokeWeight = 8;
                connector.connectorStart = {
                    endpointNodeId: nodes[i].id,
                    magnet: 'AUTO',
                };
                connector.connectorEnd = {
                    endpointNodeId: nodes[i + 1].id,
                    magnet: 'AUTO',
                };
            }
            ;
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
        figma.closePlugin();
    };
}
;

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZUFBZTtBQUMzQztBQUNBO0FBQ0EsZ0NBQWdDLHdCQUF3QixzQkFBc0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsd0JBQXdCLHNCQUFzQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwQkFBMEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW4uIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgc3VjaCBhcyB0aGUgbmV0d29yayBieSBjcmVhdGluZyBhIFVJIHdoaWNoIGNvbnRhaW5zXG4vLyBhIGZ1bGwgYnJvd3NlciBlbnZpcm9ubWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxuLy8gUnVucyB0aGlzIGNvZGUgaWYgdGhlIHBsdWdpbiBpcyBydW4gaW4gRmlnbWFcbmlmIChmaWdtYS5lZGl0b3JUeXBlID09PSAnZmlnbWEnKSB7XG4gICAgLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgd2luZG93IHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXG4gICAgLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxuICAgIC8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18pO1xuICAgIC8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xuICAgIC8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxuICAgIC8vIHBvc3RlZCBtZXNzYWdlLlxuICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXG4gICAgICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy5cbiAgICAgICAgaWYgKG1zZy50eXBlID09PSAnY3JlYXRlLXNoYXBlcycpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgICAgICAgICAgICAgcmVjdC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiB7IHI6IDEsIGc6IDAuNSwgYjogMCB9IH1dO1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxuICAgICAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9O1xuICAgIC8vIElmIHRoZSBwbHVnaW5zIGlzbid0IHJ1biBpbiBGaWdtYSwgcnVuIHRoaXMgY29kZVxufVxuZWxzZSB7XG4gICAgLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgd2luZG93IHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXG4gICAgLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgc2hhcGVzIGFuZCBjb25uZWN0b3JzIG9uIHRoZSBzY3JlZW4uXG4gICAgLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG4gICAgLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4gICAgLy8gY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGJlIHBhc3NlZCB0aGUgXCJwbHVnaW5NZXNzYWdlXCIgcHJvcGVydHkgb2YgdGhlXG4gICAgLy8gcG9zdGVkIG1lc3NhZ2UuXG4gICAgZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAgICAgLy8gT25lIHdheSBvZiBkaXN0aW5ndWlzaGluZyBiZXR3ZWVuIGRpZmZlcmVudCB0eXBlcyBvZiBtZXNzYWdlcyBzZW50IGZyb21cbiAgICAgICAgLy8geW91ciBIVE1MIHBhZ2UgaXMgdG8gdXNlIGFuIG9iamVjdCB3aXRoIGEgXCJ0eXBlXCIgcHJvcGVydHkgbGlrZSB0aGlzLlxuICAgICAgICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtc2hhcGVzJykge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZTaGFwZXMgPSBtc2cuY291bnQ7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlNoYXBlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSBmaWdtYS5jcmVhdGVTaGFwZVdpdGhUZXh0KCk7XG4gICAgICAgICAgICAgICAgLy8gWW91IGNhbiBzZXQgc2hhcGVUeXBlIHRvIG9uZSBvZjogJ1NRVUFSRScgfCAnRUxMSVBTRScgfCAnUk9VTkRFRF9SRUNUQU5HTEUnIHwgJ0RJQU1PTkQnIHwgJ1RSSUFOR0xFX1VQJyB8ICdUUklBTkdMRV9ET1dOJyB8ICdQQVJBTExFTE9HUkFNX1JJR0hUJyB8ICdQQVJBTExFTE9HUkFNX0xFRlQnXG4gICAgICAgICAgICAgICAgc2hhcGUuc2hhcGVUeXBlID0gJ1JPVU5ERURfUkVDVEFOR0xFJztcbiAgICAgICAgICAgICAgICBzaGFwZS54ID0gaSAqIChzaGFwZS53aWR0aCArIDIwMCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogeyByOiAxLCBnOiAwLjUsIGI6IDAgfSB9XTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChzaGFwZSk7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChudW1iZXJPZlNoYXBlcyAtIDEpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25uZWN0b3IgPSBmaWdtYS5jcmVhdGVDb25uZWN0b3IoKTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3Iuc3Ryb2tlV2VpZ2h0ID0gODtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IuY29ubmVjdG9yU3RhcnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZHBvaW50Tm9kZUlkOiBub2Rlc1tpXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgbWFnbmV0OiAnQVVUTycsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25uZWN0b3IuY29ubmVjdG9yRW5kID0ge1xuICAgICAgICAgICAgICAgICAgICBlbmRwb2ludE5vZGVJZDogbm9kZXNbaSArIDFdLmlkLFxuICAgICAgICAgICAgICAgICAgICBtYWduZXQ6ICdBVVRPJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAgICAgLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfTtcbn1cbjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==