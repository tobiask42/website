import { renderWithContext } from '../utils/renderWithContext';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from '@/components/ContactForm';

expect.extend(toHaveNoViolations);

describe('ContactForm', () => {
  it('hat keine Barrierefreiheitsfehler', async () => {
    const { container } = renderWithContext(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
