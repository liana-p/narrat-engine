import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import AlertModal from '../alert-modal.vue';
import { createPinia, setActivePinia } from 'pinia';
import cloneDeep from 'clone-deep';
import { mockConfig } from '@/tests/mock-config';
import { useConfig } from '@/stores/config-store';

describe('AlertModal.vue test', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const config = cloneDeep(mockConfig);
    useConfig().setConfig(config);
  });
  it('renders a modal with the right title and text', () => {
    const title = 'Alert Modal test title';
    const text = 'Alert modal test text';
    render(AlertModal, {
      props: {
        title,
        text,
      },
    });
    screen.getByText(title);
    screen.getByText(text);
  });
});
