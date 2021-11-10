import { ArgsEnhancer } from '@storybook/client-api';
/**
 * Automatically add action args for argTypes whose name
 * matches a regex, such as `^on.*` for react-style `onClick` etc.
 */
export declare const inferActionsFromArgTypesRegex: ArgsEnhancer;
/**
 * Add action args for list of strings.
 */
export declare const addActionsFromArgTypes: ArgsEnhancer;
