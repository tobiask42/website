import { renderWithContext } from '../utils/renderWithContext';
import { axe, toHaveNoViolations } from 'jest-axe';
import { screen, waitFor } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';

expect.extend(toHaveNoViolations);

describe('ContactForm', () => {
  it('hat keine Barrierefreiheitsfehler', async () => {
    const { container } = renderWithContext(<ContactForm />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /kontaktformular/i })).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
