import clsx from 'clsx';
import { ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'font-medium bg-main-400 text-white rounded-md active:opacity-80 cursor-pointer transition-colors duration-300',
  variants: {
    color: {
      primary: 'bg-main-400 text-white hover:opacity-80',
      secondary: 'bg-main-300 hover:opacity-80 text-main-400',
      neutro: 'bg-white text-black hover:opacity-80'
    },
    size: {
      sm: 'py-1 px-3 text-xs',
      md: 'py-1.5 px-4 text-sm',
      lg: 'py-2 px-6 text-md'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    },
    rounded: {
      true: 'rounded-full'
    }

  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    },
    {
      rounded: true,
      class: 'p-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});

interface ButtonProps extends
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonStyles> {
    children?: ReactNode;
    className?: string;
  }


const Button: React.FC<ButtonProps> = (
  {
    rounded, 
    children, 
    color, size, 
    className,
    ...props 
  }
) => {
  return (
    <button className={clsx(buttonStyles({ size, color, rounded }), className)} {...props}>
      {children}
    </button>
  );
}

export default Button