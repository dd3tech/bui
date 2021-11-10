import { FC } from 'react';
import { Args, BaseAnnotations, BaseMeta } from '@storybook/addons';
import { Component } from './types';
declare type MetaProps = BaseMeta<Component> & BaseAnnotations<Args, any>;
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */
export declare const Meta: FC<MetaProps>;
export {};
