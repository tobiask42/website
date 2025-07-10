export function parseLinktreeEnv(env?: string): { label: string; href: string }[] {
  if (!env) return [];

  return env
    .split(',')
    .map((pair) => pair.split('>'))
    .filter(([label, href]) => label && href)
    .map(([label, href]) => ({
      label: label.trim(),
      href: href.trim()
    }));
}
