export default function getBrowserName() {
  const agent = window.navigator.userAgent.toLowerCase();
  return agent.indexOf('edge') > -1 ? 'edge'
    : agent.indexOf('edg') > -1 ? 'chromium based edge'
      : agent.indexOf('chrome') > -1 && window.chrome ? 'chrome'
        : agent.indexOf('trident') > -1 ? 'ie'
          : agent.indexOf('firefox') > -1 ? 'firefox'
            : agent.indexOf('safari') > -1 ? 'safari'
              : 'other';
}