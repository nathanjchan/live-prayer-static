import { describe, it, expect } from 'vitest';
import get_channel_info from '../src/get_channel_info';

describe('get_channel_info test', () => {
  it('should return a ChannelInfo object', async () => {
    const channel_info = await get_channel_info('PewDiePie');
    expect(channel_info).toBeTypeOf('object');
    expect(channel_info).toHaveProperty('PewDiePie');
    expect(channel_info.PewDiePie).toHaveProperty('is_live');
    expect(channel_info.PewDiePie).toHaveProperty('title');
  });

  it('should return correct ChannelInfo for LofiGirl', async () => {
    const channel_info = await get_channel_info('LofiGirl');
    expect(channel_info.LofiGirl.is_live).toBe(true);
    expect(channel_info.LofiGirl.title).toBe('Lofi Girl');
  })

  it('should return correct ChannelInfo for CheezyBubble', async () => {
    const channel_info = await get_channel_info('CheezyBubble');
    expect(channel_info.CheezyBubble.is_live).toBe(false);
    expect(channel_info.CheezyBubble.title).toBe('CheezyBubble');
  });
});