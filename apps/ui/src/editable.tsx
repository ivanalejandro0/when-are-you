import React, { useState, useEffect } from "react";

// https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/

interface EditableProps {
  text: React.ReactElement | string
  placeholder?: string
  childRef: React.RefObject<HTMLInputElement | HTMLSelectElement>
  children: React.ReactElement
}

export function Editable ({
  text,
  placeholder,
  children,
  childRef,
  ...props
}: EditableProps): React.ReactElement {
  const [isEditing, setEditing] = useState(false);

  /* Using use effect, when isEditing state is changing, check whether it is set
   * to true, if true, then focus on the reference element */
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  // }, [childRef]);
  }, [isEditing, childRef]);


  if (isEditing) {
    return (
      <div onBlur={() => setEditing(false)}>
        {children}
      </div>
    )
  }

  return (
    <div {...props}>
      <div onClick={() => setEditing(true)}>
        <span>
          { text || placeholder || "Editable content" }
        </span>
      </div>
    </div>
  );
}
