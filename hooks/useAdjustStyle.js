import { isBrowser } from '@/lib/utils';
import { useEffect } from 'react';

/**
 * 样式调整的补丁
 */
const useAdjustStyle = () => {
  /**
   * 避免 callout 含有图片时溢出撑开父容器
   */
  const adjustCalloutImg = () => {
    const updates = []
    const callOuts = document.querySelectorAll('.notion-callout-text');
    callOuts.forEach((callout) => {
      const images = callout.querySelectorAll('figure.notion-asset-wrapper.notion-asset-wrapper-image > div');
      const calloutWidth = callout.offsetWidth;
      images.forEach((container) => {
        const imageWidth = container.offsetWidth;
        if (imageWidth + 50 > calloutWidth) {
          updates.push(container);
        }
      });
    });
    requestAnimationFrame(() => {
      updates.forEach(container => container.style.setProperty('width', '100%'));
    });
  };

  useEffect(() => {
    if (isBrowser) {
      let resizeTimer = null;
      const scheduleAdjust = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(adjustCalloutImg, 120);
      };
      if (window.requestIdleCallback) {
        window.requestIdleCallback(adjustCalloutImg, { timeout: 2000 });
      } else {
        window.setTimeout(adjustCalloutImg, 1000);
      }
      window.addEventListener('resize', scheduleAdjust);
      return () => {
        window.clearTimeout(resizeTimer);
        window.removeEventListener('resize', scheduleAdjust);
      };
    }
  }, []);
};

export default useAdjustStyle;
