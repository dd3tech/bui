import React, { FC } from 'react';
import { ArgTypes, Args } from './types';
export declare const TableWrapper: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {
    compact?: boolean;
    inAddonPanel?: boolean;
}, import("@storybook/theming").Theme>;
export declare enum ArgsTableError {
    NO_COMPONENT = "No component found.",
    ARGS_UNSUPPORTED = "Args unsupported. See Args documentation for your framework."
}
export declare type SortType = 'alpha' | 'requiredFirst' | 'none';
export interface ArgsTableRowProps {
    rows: ArgTypes;
    args?: Args;
    updateArgs?: (args: Args) => void;
    resetArgs?: (argNames?: string[]) => void;
    compact?: boolean;
    inAddonPanel?: boolean;
    initialExpandedArgs?: boolean;
    sort?: SortType;
}
export interface ArgsTableErrorProps {
    error: ArgsTableError;
}
export declare type ArgsTableProps = ArgsTableRowProps | ArgsTableErrorProps;
/**
 * Display the props for a component as a props table. Each row is a collection of
 * ArgDefs, usually derived from docgen info for the component.
 */
export declare const ArgsTable: FC<ArgsTableProps>;
