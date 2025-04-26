import React, { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const inputStyles = tv({
  base: 'flex items-center rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 transition-all',
  variants: {
    variant: {
      primary: 'bg-blue-50 border border-blue-300 text-blue-900',
      secondary: 'bg-purple-50 border border-main-300 text-purple-900',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    fullWidth: {
      true: 'w-full',
    },
    error: {
      true: 'border-red-500 focus-within:ring-red-200',
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    error: false,
  }
});

const inputElementStyles = tv({
  base: 'outline-none flex-grow bg-main-100',
  variants: {
    size: {
      sm: 'px-2 py-1',
      md: 'px-3 py-2',
      lg: 'px-4 py-3',
    },
    hasLeftIcon: {
      true: 'pl-2',
    },
    hasRightElements: {
      true: 'pr-2',
    }
  },
  defaultVariants: {
    size: 'md',
    hasLeftIcon: false,
    hasRightElements: false,
  }
});

const buttonStyles = tv({
  base: 'h-full flex items-center justify-center transition-colors',
  variants: {
    variant: {
      primary: 'bg-main-400 hover:opacity-80 text-white',
      secondary: 'bg-main-300 hover:opacity-80 text-main-400',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  }
});

const rightIconStyles = tv({
  base: 'flex items-center justify-center',
  variants: {
    size: {
      sm: 'pr-2',
      md: 'pr-3',
      lg: 'pr-4',
    },
  },
  defaultVariants: {
    size: 'md',
  }
});

interface CustomInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputStyles> {
  icon?: ReactNode;
  rightIcon?: ReactNode;
  buttonIcon?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  onRightIconClick?: () => void;
  errorMessage?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      icon,
      rightIcon,
      buttonIcon,
      buttonText,
      onButtonClick,
      onRightIconClick,
      variant,
      size,
      error,
      errorMessage,
      fullWidth,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const hasRightElements = !!(rightIcon || buttonIcon || buttonText);
    const generatedId = useId();

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label  htmlFor={generatedId} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        )}

        <div className={inputStyles({ variant, size, fullWidth, error, className })}>
          {icon && (
            <div className="flex items-center justify-center pl-2">
              {icon}
            </div>
          )}

          <input
             id={generatedId}
            ref={ref}
            className={inputElementStyles({
              size,
              hasLeftIcon: !!icon,
              hasRightElements
            })}
            {...props}
          />

          {rightIcon && (
            <div
              className={rightIconStyles({ size })}
              onClick={onRightIconClick}
              role={onRightIconClick ? "button" : undefined}
            >
              {rightIcon}
            </div>
          )}

          {(buttonIcon || buttonText) && (
            <button
              type="button"
              onClick={onButtonClick}
              className={buttonStyles({ variant, size })}
            >
              {buttonIcon}
              {buttonText && <span className={buttonIcon ? 'ml-1' : ''}>{buttonText}</span>}
            </button>
          )}
        </div>

        {error && errorMessage && (
          <p className=" text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;