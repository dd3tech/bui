import { ArgTypes } from '@storybook/api';
import type { SvelteComponentDoc } from 'sveltedoc-parser/typings';
import { ArgTypesExtractor } from '../../lib/docgen';
export declare const extractArgTypes: ArgTypesExtractor;
export declare const createArgTypes: (docgen: SvelteComponentDoc) => ArgTypes;
