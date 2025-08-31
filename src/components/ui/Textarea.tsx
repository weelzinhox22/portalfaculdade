
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        filled: "bg-muted",
        outline: "border-2",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  autoResize?: boolean
  showCharCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, autoResize, showCharCount, maxLength, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    React.useImperativeHandle(ref, () => internalRef.current!)

    React.useEffect(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto"
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`
      }
    }, [props.value, autoResize])

    const charCount = props.value?.toString().length || 0

    return (
      <div className="w-full">
        <textarea
          className={cn(textareaVariants({ variant, size, className }))}
          ref={internalRef}
          maxLength={maxLength}
          {...props}
        />
        {showCharCount && maxLength && (
          <div className="mt-2 text-right text-sm text-muted-foreground">
            {charCount} / {maxLength}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
