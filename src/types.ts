import { SystemStyleObject } from 'styled-system__css';
export * from 'theme-ui';

export type ModifierName = string;

export type ModifierNames = ModifierName[];

/**
 * The single modifier key or array of modifier keys
 */
export type ModifierKeys = ModifierNames | ModifierName;

export type ModifierConfigValue = (props: any) => SystemStyleObject;

export interface ModifiersConfig {
  [key: string]: ModifierConfigValue;
}

export interface UseThemeFunction {
  (theme: any): SystemStyleObject;
}

export interface ApplyModifiersArgs {
  config: ModifiersConfig;
  modifierProp?: string;
  [index: string]: any;
}
