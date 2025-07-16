import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import ContactForm from '@/components/ContactForm';
import { vi } from 'vitest';
import { IntlProvider } from 'next-intl';
import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('next/link', async () => {
  const React = await import('react');
  type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  };
  return {
    __esModule: true,
    default: React.forwardRef<HTMLAnchorElement, LinkProps>(
      ({ href, children, ...rest }, ref) => (
        <a href={href} ref={ref} {...rest}>
          {children}
        </a>
      )
    ),
  };
});

// Dummy i18n translations
const messages = {
  form: {
    title: 'Kontaktformular',
    name: 'Name',
    email: 'E-Mail',
    message: 'Nachricht',
    privacy: 'Ich akzeptiere die Datenschutzbedingungen.',
    submit: 'Senden',
    privacyRequired: 'Bitte akzeptiere die Datenschutzerklärung.',
    errorName: 'Bitte gib deinen Namen ein.',
    errorEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    errorMessage: 'Bitte gib eine Nachricht ein.',
  },
};

describe('ContactForm', () => {
  it('shows validation errors if fields are empty', async () => {
    render(
      <IntlProvider locale="de" messages={messages}>
        <ContactForm />
      </IntlProvider>
    );

    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: /senden/i });
    await user.click(submitButton);

    expect(await screen.findByText(/Bitte gib deinen Namen ein/)).toBeInTheDocument();
    expect(await screen.findByText(/Bitte gib eine gültige E-Mail-Adresse ein/)).toBeInTheDocument();
    expect(await screen.findByText(/Bitte gib eine Nachricht ein/)).toBeInTheDocument();
    expect(await screen.findByText(/Bitte akzeptiere die Datenschutzerklärung/)).toBeInTheDocument();
  });
});
