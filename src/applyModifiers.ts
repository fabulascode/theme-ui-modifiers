import { ApplyModifiersArgs, Theme } from './types';

export function useModifiers(args: ApplyModifiersArgs) {
  const { config, modifierProp = 'modifiers', modifiers = [], ...props } = args;

  return (theme: Theme) => {
    let map = {};
    if (typeof modifiers === 'string') {
      const fn = config[modifiers];
      if (typeof fn === 'function') {
        map = Object.assign(map, fn({ ...props, theme }));
      } else if (typeof fn === 'object') {
        map = Object.assign(map, fn);
      }
    } else if (Array.isArray(modifiers)) {
      for (const modifier of modifiers) {
        const fn = config[modifier];
        if (typeof fn === 'function') {
          map = Object.assign(map, fn({ ...props, theme }));
        } else if (typeof fn === 'object') {
          map = Object.assign(map, fn);
        }
      }
    }
    return map;
  };
}

export function getVariant(
  theme: any,
  variant: string
): { [index: string]: any } {
  const [v, ...rest] = variant.split('.');
  if (rest.length === 0) {
    return theme[v];
  }
  return getVariant(theme[v], rest.join('.'));
}
