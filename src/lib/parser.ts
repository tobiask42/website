export function parseLinktreeEnv(envValue: string, locale: string) {
  return (envValue || '')
    .split(',')
    .map((entry) => {
      const parts = entry.split('>');
      const [label, maybeAriaOrHref, maybeHref] = parts.map((part) => part.trim());

      let ariaLabel: string | undefined;
      let href: string;

      if (parts.length === 3) {
        ariaLabel = maybeAriaOrHref;
        href = maybeHref;
      } else if (parts.length === 2) {
        ariaLabel = undefined;
        href = maybeAriaOrHref;
      } else {
        return null; // Skip malformed entry
      }

      const localizedHref =
        href.startsWith('/') && !href.startsWith(`/${locale}`)
          ? `/${locale}${href}`
          : href;

      return {
        label,
        href: localizedHref,
        ariaLabel,
      };
    })
    .filter(Boolean); // Remove nulls
}
