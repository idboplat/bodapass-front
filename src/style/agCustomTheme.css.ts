import { globalStyle } from '@vanilla-extract/css';

/** vars */
globalStyle('[class*=ag-theme-]', {
  vars: {
    '--ag-header-background-color': '#e2e3f0',
    '--ag-border-color': '#cbd3e2',
    '--ag-cell-horizontal-border': '0.5px solid #e8ebf1',
  },
});

/**  hide and scroll */
globalStyle('.ag-body-vertical-scroll-viewport', {
  overflowY: 'hidden',
});

globalStyle('.ag-theme-quartz.scroll .ag-body-vertical-scroll-viewport', {
  overflowY: 'scroll',
});

globalStyle('.ag-theme-quartz.hide', {
  display: 'none',
});

/** .etc */
globalStyle('.ag-theme-quartz', {});

globalStyle('.ag-root-wrapper', {
  borderRadius: 5,
});

globalStyle('.ag-header, .ag-advanced-filter-header', {
  borderBottomColor: '#cbd3e2',
});

globalStyle('.ag-ltr .ag-cell', {
  borderRight: '0.5px solid #e8ebf1',
  borderLeft: '0.5px solid #e8ebf1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
});

globalStyle('.ag-header-group-cell-with-group', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '0.5px solid #cbd3e2',
  borderLeft: '0.5px solid #cbd3e2',
});

globalStyle('.ag-header-cell, .ag-header-group-cell', {
  padding: 0,
  cursor: 'pointer',
  borderRight: '0.5px solid #cbd3e2',
  borderLeft: '0.5px solid #cbd3e2',
});

globalStyle('.ag-header-group-cell-label, .ag-header-cell-label', {
  justifyContent: 'center',
});

globalStyle('.topGrid', {
  height: '100%',
  flex: '1 1 auto',
});

globalStyle('.footerGrid', {
  flex: 'none',
  height: 42,
});

globalStyle('.footerGrid .ag-header', {
  display: 'none',
});
