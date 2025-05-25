export interface IColumnDefinition {
  key: string;
  label: string;
  mandatory?: boolean;
  visible?: boolean;
  mobileVisible?: boolean;
  template?: any;
  sortable?: boolean;
  width?: string;
}

export interface IQuickActionDefinition {
  label: string;
  icon?: string;
  action: (item: any) => void;
  visible?: (item: any) => boolean;
}

export interface ITableState {
  selectedRows: Set<any>;
  columnOrder: string[];
  visibleColumns: Set<string>;
}