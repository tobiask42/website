export function parseLinktreeEnv(envValue: string, locale: string) {
  return (envValue || '')
    .split(',')
    .map((entry) => {
      const [label, href] = entry.split('>');
      const trimmedHref = href?.trim();
      const localizedHref = trimmedHref?.startsWith('/') && !trimmedHref.startsWith(`/${locale}`)
        ? `/${locale}${trimmedHref}`
        : trimmedHref;

      return {
        label: label.trim(),
        href: localizedHref,
      };
    });
}
