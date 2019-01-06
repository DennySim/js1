'use strict';

function createElement(node) {
  const element = document.createElement(node.name);

  for (let prop in node.props) {
    if (prop === 'class') {
      node.props[prop].split(' ').forEach(cls =>
      {
        if (!(cls === "")) {
          element.classList.add(cls);
        }
      })
    }
  }

  for (let child of node.childs) {

    if (typeof child === 'string' || typeof child === 'number') {

      const textNode = document.createTextNode(child);
      element.appendChild(textNode);
    } else {
      const newNode = createElement(child);
      element.appendChild(newNode)
    }
  }
  return element;
}