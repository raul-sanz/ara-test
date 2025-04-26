import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

import '@testing-library/jest-dom';

describe('Button Component', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-main-400');
    expect(button).toHaveClass('text-white');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('custom-class');
  });

  test('renders button with primary color variant', () => {
    render(<Button color="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('bg-main-400');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:opacity-80');
  });

  test('renders button with secondary color variant', () => {
    render(<Button color="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('bg-main-300');
    expect(button).toHaveClass('text-main-400');
    expect(button).toHaveClass('hover:opacity-80');
  });

  test('renders button with neutro color variant', () => {
    render(<Button color="neutro">Neutro Button</Button>);
    const button = screen.getByRole('button', { name: 'Neutro Button' });
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-black');
    expect(button).toHaveClass('hover:opacity-80');
  });

  test('renders button with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('text-xs');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1');
  });

  test('renders button with medium size', () => {
    render(<Button size="md">Medium Button</Button>);
    const button = screen.getByRole('button', { name: 'Medium Button' });
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1');
  });

  test('renders button with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toHaveClass('text-md');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('px-6');
  });


  test('applies rounded style when rounded prop is true', () => {
    render(<Button rounded>Rounded Button</Button>);
    const button = screen.getByRole('button', { name: 'Rounded Button' });
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('p-1');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole('button', { name: 'Clickable Button' });
    
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', async () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders children properly', () => {
    render(
      <Button>
        <span data-testid="child-element">Child Element</span>
      </Button>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  test('combines multiple variants correctly', () => {
    render(<Button color="secondary" size="lg" rounded>Combined Button</Button>);
    const button = screen.getByRole('button', { name: 'Combined Button' });
    
    expect(button).toHaveClass('bg-main-300');
    expect(button).toHaveClass('text-main-400');
    expect(button).toHaveClass('text-md');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('p-1');
  });

  test('respects compoundVariants for small and medium sizes', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    const smallButton = screen.getByRole('button', { name: 'Small Button' });
    expect(smallButton).toHaveClass('px-3');
    expect(smallButton).toHaveClass('py-1');
    
    rerender(<Button size="md">Medium Button</Button>);
    const mediumButton = screen.getByRole('button', { name: 'Medium Button' });
    expect(mediumButton).toHaveClass('px-3');
    expect(mediumButton).toHaveClass('py-1');
  });
});