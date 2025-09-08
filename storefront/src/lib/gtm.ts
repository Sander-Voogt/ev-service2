declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const gtmEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};
