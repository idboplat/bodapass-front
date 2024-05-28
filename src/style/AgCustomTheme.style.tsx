import styled from "@emotion/styled";

const AgCustomTheme = styled.div<{ height?: number; isScroll: boolean }>`
  &[class*="ag-theme-"] {
    --ag-header-background-color: #e2e3f0;
    --ag-border-color: #cbd3e2;
    --ag-cell-horizontal-border: 0.5px solid #e8ebf1;
  }

  height: ${({ height }) => (height || 690) + "px"};

  .ag-body-vertical-scroll-viewport {
    overflow-y: "hidden";
  }

  .ag-body-vertical-scroll-viewport {
    overflow-y: scroll;
  }

  .ad-root-wrapper {
    border-radius: 5px;
  }

  .ag-ltr .ag-cell {
    border-right: 0.5px solid #e8ebf1;
    border-left: 0.5px solid #e8ebf1;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .ag-header-group-cell-with-group {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.5px solid #cbd3e2;
    border-left: 0.5px solid #cbd3e2;
  }

  .ag-header-group-cell-with-group {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0.5px solid #cbd3e2;
    border-left: 0.5px solid #cbd3e2;
  }

  .ag-header-cell,
  .ag-header-group-cell {
    padding: 0;
    cursor: pointer;
    border-right: 0.5px solid #cbd3e2;
    border-left: 0.5px solid #cbd3e2;
  }

  .ag-header-group-cell-label,
  .ag-header-cell-label {
    justify-content: center;
  }

  .topGrid {
    height: 100%;
    flex: 1 1 auto;
  }

  .footerGrid {
    flex: none;
    height: 42px;
  }

  .footerGrid .ag-header {
    display: none;
  }

  .ag-body-vertical-scroll-viewport {
    overflow-y: ${({ isScroll }) => (isScroll ? "scroll" : "hidden")};
  }
`;

export default AgCustomTheme;
