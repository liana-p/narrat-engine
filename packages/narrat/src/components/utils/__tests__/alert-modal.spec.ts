import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import AlertModal from '../alert-modal.vue';

describe('AlertModal.vue test', () => {
  it('renders a modal with the right title and text', () => {
    const title = 'Alert Modal test title';
    const text = 'Alert modal test text';
    render(AlertModal, {
      props: {
        title,
        text,
      }
    });
    screen.getByText(title);
    screen.getByText(text);
  })
});
