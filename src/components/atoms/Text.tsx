import { tv, VariantProps } from 'tailwind-variants';
import { clsx } from 'clsx';
import React from 'react';

const textStyles = tv({
  base: 'text-inherit leading-relaxed',
  variants: {
    type: {
      title: 'text-4xl font-bold',
      subtitle: 'text-2xl font-semibold',
      paragraph: 'text-base',
      span: 'text-sm',
      caption: 'text-xs text-muted-foreground',
      lead: 'text-lg text-muted',
      quote: 'italic border-l-4 pl-4 border-gray-300',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-gray-900',
      primary: 'text-main-400',
      secondary: 'text-main-300',
      soft: 'text-gray-500',
      muted: 'text-muted-foreground',
      error: 'text-red-500',
    },
  },
  defaultVariants: {
    type: 'paragraph',
    align: 'left',
    weight: 'normal',
    color: 'default',
  },
});

export interface TextProps extends
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
  VariantProps<typeof textStyles> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const Text = ({
  as: Component = 'p',
  type,
  align,
  weight,
  color,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <Component
      className={clsx(textStyles({ type, align, weight, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
