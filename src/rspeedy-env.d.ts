/// <reference types="@lynx-js/rspeedy/client" />

declare module '@lynx-js/types' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface GlobalProps {
    /**
     * Define your global properties in this interface.
     * These types will be accessible through `lynx.__globalProps`.
     */
  }
  interface IntrinsicElements extends Lynx.IntrinsicElements {
    input: {
      bindinput?: (e: { type: 'input'; detail: { value: string } }) => void;
      type?: string;
      value?: string | undefined;
      placeholder?: string;
      className?: string;
    };
  }
}

// This export makes the file a module
export {}
