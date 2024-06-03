import { style, globalStyle } from '@vanilla-extract/css';

export const wrap = style({
  display: 'flex',
});

globalStyle(`${wrap} > span`, { flex: 2 });

globalStyle(`${wrap} > button`, { flex: 1 });
