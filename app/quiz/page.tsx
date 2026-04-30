'use client';

import { useEffect } from 'react';
import QuizShell from '@/components/QuizShell';

export default function QuizPage() {
  // iFrame height bridge — notifies Webflow parent of document height
  // so the iframe resizes automatically without inner scrollbars.
  useEffect(() => {
    const sendHeight = () => {
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: 'aspire-quiz-resize', height: document.documentElement.scrollHeight },
          '*'
        );
      }
    };

    sendHeight();

    // Re-send on resize (orientation change, window resize)
    window.addEventListener('resize', sendHeight);

    // MutationObserver to catch DOM changes (quiz step transitions)
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);

  return <QuizShell />;
}
