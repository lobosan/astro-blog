export const observeVfHideSkeleton = (targetSelector: string) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          const target = node.matches(targetSelector) ? node : node.querySelector(targetSelector);
          if (target) {
            const skeletonLoader = target.closest(".viafoura")?.querySelector(".skeleton-loader");
            skeletonLoader?.classList.add("hidden");
          }
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
};
