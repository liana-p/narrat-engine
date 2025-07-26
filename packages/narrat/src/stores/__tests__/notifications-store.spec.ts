import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockConfig } from '@/tests/mock-config';
import cloneDeep from 'clone-deep';
import { useConfig } from '@/stores/config-store';
import { useNotifications } from '../notification-store';
import { afterEach } from 'vitest';

describe('Notifications Store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    const config = cloneDeep(mockConfig);
    useConfig().setConfig(config);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('addNotification: adds a notification', () => {
    const notifications = useNotifications();
    notifications.addNotification('Test notification');
    expect(notifications.notifications).toHaveLength(1);
  });
  it('addNotification: deletes the notification after the timeOnScreen', async () => {
    const notifications = useNotifications();
    notifications.addNotification('Test notification');
    expect(notifications.notifications).toHaveLength(1);
    vi.advanceTimersByTime(mockConfig.common.notifications.timeOnScreen * 1000);
    await Promise.resolve();
    expect(notifications.notifications).toHaveLength(0);
  });
});
