/**
 * This may be a horrible way to do it, but this function is called from React
 * components to "collect" all elements that represent AST nodes that are
 * currently "focused", i.e. the position of the caret corresponds with this
 * node.
 * Since a node can appear multiple times in the parser output, multiple elements
 * can be highlighted. The question is: which element should we scroll to?
 * My current answer: The one that is closest to the vertical center of the
 * view.
 * React components cannot solve this themselves since they don't have knowledge
 * over other elements.
 * So this function works as follows:
 *   - At render, the tree root initializes a new set of nodes.
 *   - Whenever a child node is rendered and "in focus", it adds a ref to the
 *     list of elements.
 *   - After render, the tree root triggers the focus logic. The element that is
 *     closest to the center is scrolled into the view.
 */
let nodes;

export default function(message, arg) {
  switch (message) {
    case 'init':
      nodes = new Set();
      break;
    case 'add':
      nodes.add(arg);
      break;
    case 'focus': {
      const root = arg.current;
      const size = nodes.size;
      try {
        if (size === 1) {
          nodes.values().next().value.current.scrollIntoView();
        } else if (size > 1) {
          const rootRect = root.getBoundingClientRect();
          const center = (rootRect.y + rootRect.height) / 2 + rootRect.y;
          const closest = Array.from(nodes).reduce((closest, element) => {
            if (!element.current) {
              return closest;
            }
            const elementRect = element.current.getBoundingClientRect();
            const distance = elementRect.y - center;
            const minDistance = Math.min(
              Math.abs(distance),
              Math.abs(distance + elementRect.height),
            );

            if (!closest || closest[1] > minDistance) {
              return [element.current, minDistance];
            }
            return closest;
          }, null);
          if (closest) {
            closest[0].scrollIntoView();
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Unable to scroll node into view:', e.message);
      }

    }
  }
}
