import { getTooltipConfig, tooltipsConfig } from '@/config';
import { useTooltips } from '@/stores/tooltip-store';

export function processTooltipsInText(text: string) {
  const keywords = tooltipsConfig().keywords;
  for (const keyword of keywords) {
    // Finding the keyword with word boundaries and also making sure we don't replace what's already been.
    const reg = new RegExp(`\\b${keyword.keyword}\\b[^<]`, 'g');
    text = text.replace(reg, addTooltipToKeyword(keyword.keyword));
  }
  return text;
}

const wiwi = window as any;
wiwi.onTooltipEnter = (keyword: string) => {
  console.log('onTooltipEnter', keyword);
  useTooltips().addTooltip(keyword);
};
wiwi.onTooltipLeave = () => {
  console.log('onTooltipLeave');
  useTooltips().deleteTooltip();
};
export function addTooltipToKeyword(keyword: string) {
  const config = getTooltipConfig(keyword);
  if (config) {
    return `<span class='highlighted-tooltip-keyword'
      onmouseenter="onTooltipEnter('${keyword}')"
      onmouseleave="onTooltipLeave()">${config.title ?? config.keyword}</span>`;
  }
  return keyword;
}
