import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MagnifyingGlassIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Input from '../Input';

import '@testing-library/jest-dom';

describe('Input Component', () => {
  test('renders correctly with default props', () => {
    render(<Input placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<Input className="custom-class" data-testid="input" />);
    const inputWrapper = container.querySelector('[class*="bg-blue-50"]');
    expect(inputWrapper).toHaveClass('custom-class');
  });

  test('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const labelElement = screen.getByText('Username');
    expect(labelElement).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  test('renders with error message when error is true', () => {
    render(
      <Input 
        error={true} 
        errorMessage="This field is required" 
        placeholder="Test input"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('does not show error message when error is false', () => {
    render(
      <Input 
        error={false} 
        errorMessage="This field is required" 
        placeholder="Test input"
      />
    );
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  test('renders with left icon (Heroicons)', () => {
    render(
      <Input 
        icon={<MagnifyingGlassIcon data-testid="search-icon" className="h-5 w-5" />} 
        placeholder="Search"
      />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('renders with right icon (Heroicons)', () => {
    render(
      <Input 
        rightIcon={<XMarkIcon data-testid="clear-icon" className="h-5 w-5" />}
        placeholder="Clearable input" 
      />
    );
    expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
  });

  test('renders with button and text', () => {
    render(<Input buttonText="Search" placeholder="Test input" />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('renders with button icon (Heroicons)', () => {
    render(
      <Input 
        buttonIcon={<ArrowRightIcon data-testid="submit-icon" className="h-5 w-5" />} 
        placeholder="Submit input"
      />
    );
    expect(screen.getByTestId('submit-icon')).toBeInTheDocument();
  });

  test('applies fullWidth style when fullWidth is true', () => {
    const { container } = render(<Input fullWidth={true} placeholder="Test input" />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveClass('w-full');
  });

  test('applies variant styles correctly', () => {
    const { container } = render(<Input variant="secondary" placeholder="Test input" />);
    const inputContainer = container.querySelector('[class*="bg-purple-50"]');
    expect(inputContainer).toHaveClass('bg-purple-50');
    expect(inputContainer).toHaveClass('border-main-300');
  });

  test('applies size styles correctly', () => {
    const { container } = render(<Input size="lg" placeholder="Test input" />);
    const inputContainer = container.querySelector('[class*="text-lg"]');
    expect(inputContainer).toHaveClass('text-lg');
  });

  test('calls onButtonClick when button is clicked', async () => {
    const handleClick = jest.fn();
    render(
      <Input 
        buttonText="Click me" 
        onButtonClick={handleClick} 
        placeholder="Test input" 
      />
    );
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Test input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('passes additional HTML attributes to input element', () => {
    render(<Input placeholder="Test input" maxLength={10} aria-label="test-input" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('aria-label', 'test-input');
  });

  test('input value changes when typing', async () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  });

  test('renders input with disabled state', () => {
    render(<Input placeholder="Test input" disabled />);
    expect(screen.getByPlaceholderText('Test input')).toBeDisabled();
  });

  test('renders with both buttonText and buttonIcon correctly', () => {
    render(
      <Input 
        buttonText="Submit" 
        buttonIcon={<ArrowRightIcon data-testid="arrow-icon" className="h-5 w-5" />}
        placeholder="Test input" 
      />
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  test('handles controlled input correctly', async () => {
    const onChange = jest.fn();
    render(<Input value="Controlled" onChange={onChange} placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveValue('Controlled');
    
    await userEvent.type(input, 'New value');
    expect(onChange).toHaveBeenCalled();
  });

  test('combines icons and button correctly', () => {
    render(
      <Input 
        icon={<MagnifyingGlassIcon data-testid="search-icon" className="h-5 w-5" />}
        rightIcon={<XMarkIcon data-testid="clear-icon" className="h-5 w-5" />}
        buttonText="Go"
        placeholder="Complex input"
      />
    );
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });
});