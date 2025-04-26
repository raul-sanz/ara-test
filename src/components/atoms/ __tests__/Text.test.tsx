import React from 'react';
import { render, screen } from '@testing-library/react';
import Text  from '../Text';

describe('<Text />', () => {
  it('renderiza como un párrafo por defecto', () => {
    render(<Text>Hola mundo</Text>);
    const text = screen.getByText('Hola mundo');
    expect(text.tagName).toBe('P');
  });

  it('cambia el tag con `as`', () => {
    render(<Text as="h2" type="subtitle">Soy un subtítulo</Text>);
    const text = screen.getByText('Soy un subtítulo');
    expect(text.tagName).toBe('H2');
  });

  it('acepta clases personalizadas', () => {
    render(<Text className="my-custom-class">Texto extra</Text>);
    const el = screen.getByText('Texto extra')
    expect(el.classList.contains('my-custom-class')).toBe(true);
  });

  it('combina múltiples variantes', () => {
    render(<Text type="caption" color="secondary" weight="bold">¡Cuidado!</Text>);
    const el = screen.getByText('¡Cuidado!');
    expect(el.classList.contains('text-main-300')).toBe(true);
  });
});