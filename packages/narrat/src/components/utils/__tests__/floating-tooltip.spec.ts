import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import FloatingTooltip from '../floating-tooltip.vue';

const title = 'Tooltip test title';
const text = 'Tooltip test text';
const width = 200;

describe('FloatingTooltip.vue tests', () => {
  it('renders a tooltip with the right title and text', () => {
    render(FloatingTooltip, {
      props: {
        title,
        text,
        width: 200,
        x: 0,
        y: 0,
      }
    });
    screen.getByText(title);
    screen.getByText(text);
  });

  it('renders tooltips at the right width', () => {
    const width = 200;
    render(FloatingTooltip, {
      props: {
        title,
        text,
        width,
        x: 0,
        y: 0,
      }
    });
    const titleElement = screen.getByText(title);
    const tooltip: HTMLElement = titleElement.parentElement!;
    expect(tooltip).toBeTruthy();
    expect(tooltip).toHaveStyle({ width: `${width}px` });
  });

  it('adapts the position of the tooltip to the screen size', () => {
    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight;
    it('shifts x to the left if the tooltip is too wide', () => {
      render(FloatingTooltip, {
        props: {
          title,
          text,
          width,
          x: maxWidth,
          y: 0,
        }
      });
      const titleElement = screen.getByText(title);
      const tooltip: HTMLElement = titleElement.parentElement!;
      const correctX = maxWidth - width;
      console.log(maxWidth, width, correctX)
      expect(tooltip).toBeTruthy();
      expect(tooltip).toHaveStyle({ left: `${correctX}px` });
    });
  });
});
