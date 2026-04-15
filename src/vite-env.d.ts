/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: number;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean;
        "disable-zoom"?: boolean;
        "disable-pan"?: boolean;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        "environment-image"?: string;
        "shadow-intensity"?: string;
        "exposure"?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
