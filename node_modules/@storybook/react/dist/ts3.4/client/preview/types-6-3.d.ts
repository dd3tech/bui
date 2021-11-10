import { ComponentProps, JSXElementConstructor } from 'react';
import { Story, Meta } from './types-6-0';
export * from './types-6-0';
/**
 * For the common case where a component's stories are simple components that receives args as props:
 *
 * ```tsx
 * export default { ... } as ComponentMeta<typeof Button>;
 * ```
 */
export declare type ComponentMeta<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Meta<ComponentProps<T>>;
/**
 * For the common case where a story is a simple component that receives args as props:
 *
 * ```tsx
 * const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
 * ```
 */
export declare type ComponentStory<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Story<ComponentProps<T>>;
