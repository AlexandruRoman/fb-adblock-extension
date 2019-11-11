const detectMultipleChunks = container => {
  function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      walkTheDOM(node, func);
      node = node.nextSibling;
    }
  }

  const contructText = chunks => {
    let array = Array.from(chunks);
    if (array.length < 1) return "";

    return array
      .map(node => {
        let letterElement = node;
        if (!node || !node.getAttribute("data-content")) letterElement = node.firstChild;
        let content = "";
        if (letterElement && letterElement.nodeName == "SPAN") {
          if (letterElement.getBoundingClientRect().width > 0) content = letterElement.getAttribute("data-content");
        }
        if (content.match(/[Sponsored]/)) return content.split("");
        return "";
      })
      .join("");
  };

  let chunks = [];

  walkTheDOM(container, node => {
    if (node && node.childElementCount >= 9) chunks = node.childNodes;
  });

  const text = contructText(chunks);
  return text.includes("Sponsored");
};

const removeFeedAds = container => {
  const subtitle = document.querySelector(`#${container.id} [data-testid=testid-storysub-title]`);
  if (subtitle && detectMultipleChunks(subtitle)) {
    container.style.opacity = "0.5";
    //         container.parentNode.removeChild(container)
  }
};

export const startRemoving = () => {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('[role="feed"]');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      const target = mutation.target;
      if (target.id && target.id.includes("hyperfeed_story_id_")) removeFeedAds(target);
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  document.querySelectorAll('[id^="hyperfeed_story_id_"]').forEach(removeFeedAds);
};
