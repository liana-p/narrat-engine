import { getTooltipConfig, tooltipsConfig } from '@/config';
import { useTooltips } from '@/stores/tooltip-store';
import { getWindow } from './getWindow';

export function processTooltipsInText(text: string) {
  const prefix = tooltipsConfig().options.keywordsPrefix;
  const regex = new RegExp(`${prefix}(\\w*)`, 'gi');
  text = text.replace(regex, addTooltipToKeyword);
  return text;
}

getWindow().onTooltipEnter = (event: MouseEvent, keyword: string) => {
  const position = {
    x: event.clientX,
    y: event.clientY - 20,
  };
  useTooltips().addTooltip(keyword, position);
};

getWindow().onTooltipLeave = () => {
  useTooltips().deleteTooltip();
};
export function addTooltipToKeyword(_: string, $1: string) {
  const keyword = $1.toLowerCase();
  const config = getTooltipConfig(keyword);
  if (config) {
    return `<span class='highlighted-tooltip-keyword'
      onmouseenter="onTooltipEnter(event, '${keyword}')"
      onmouseleave="onTooltipLeave()">${$1}</span>`;
  }
  return keyword;
}
