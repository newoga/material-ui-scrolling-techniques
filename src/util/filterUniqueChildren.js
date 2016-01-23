import React from 'react';

export default function filterUniqueChildren(children, ...displayNames) {
  const filteredChildren = {};

  React.Children.forEach(children, (child) => {
    if (child) {
      if (displayNames.indexOf(child.type.displayName) < 0) {
        console.warn(`Component '${child.type.displayName || child.type}' is not allowed.`);
      } else {
        if (filteredChildren[child.type.displayName]) {
          console.warn(`Cannot provide more than one instance of '${child.type.displayName}'.`);
        } else {
         filteredChildren[child.type.displayName] = child;
        }
      }
    }
  });

  return filteredChildren;
}
