
import { Group, Stack, Text } from "@mantine/core";
import { Spoiler } from "./OtherFields";

interface LineFielLinedProps {
    label: string;
    children: React.ReactNode;
    isEditing: boolean;
}
const SingleLineField: React.FC<LineFielLinedProps> = ({ label, children,isEditing }) => (
    <tr>
        <td
            style={{
                textAlign: 'right',
                marginRight: '2rem',
                paddingBottom: '0.5rem',
                minWidth: '10rem',
                verticalAlign:'baseline',
            }}
        >
            <Text fw={600}>{label}:</Text>
        </td>
        <td style={{ paddingBottom: '0.5rem', maxWidth: '30rem', wordBreak:'break-word' }}>
            {children}
        </td>
    </tr>
);

const MultiLineField: React.FC<LineFielLinedProps> = ({ label, children }) => (
    <>
        <tr>
            <td>
                <Text fw={600}>{label}:</Text>
            </td>
        </tr>
        <tr>
            <td colSpan={2} style={{wordBreak:'break-word'}}>{children}</td>
        </tr>
    </>
);

export interface EditableFieldProps {
    children?: React.ReactNode;
    label: string;
    value: any;
    setValue?: (value: any) => void;
    isEditing: boolean;
    isHidden?: boolean;
    isMobile?: boolean;
    component: React.FC<any>;
    options?: { value: string; label: string }[];
    icon?: React.ReactNode;
    placeholder?: string;
    error?: string;
    spoiler?: boolean;
    description?: string;
    showEstTime?: boolean;
    showAnyWay?: boolean;
    compProps?: { [key: string]: any };
    multiline?: boolean;
    fallback?: EditableFieldProps; // Fallback props
  }
  
  export const EditableField: React.FC<EditableFieldProps> = ({
    children,
    label,
    value,
    setValue,
    isEditing,
    isHidden = false,
    isMobile,
    component: Component,
    options,
    icon,
    placeholder,
    error,
    spoiler,
    description,
    showEstTime,
    showAnyWay,
    compProps,
    multiline,
    fallback, // Fallback props
    ...props
  }) => {
    // If hidden or no value and not editing and not showAnyWay, render fallback
    if (isHidden || (!value && !isEditing && !showAnyWay)) {
      if (fallback) {
        const { component: FallbackComponent, ...fallbackProps } = fallback;
        const FieldComponent = isMobile || multiline || fallbackProps.multiline
          ? MultiLineField
          : SingleLineField;
  
        return (
          <FieldComponent label={fallbackProps.label} isEditing={fallbackProps.isEditing}>
            <FallbackComponent {...fallbackProps} />
          </FieldComponent>
        );
      }
      // If no fallback, return null
      return null;
    }
  
    const fieldComponent = (
      <Component
        value={value}
        setValue={setValue}
        isEditing={isEditing}
        isMobile={isMobile}
        options={options}
        icon={icon}
        placeholder={placeholder}
        error={error}
        {...props}
        showEstTime={showEstTime}
        description={description}
        {...compProps}
      />
    );
  
    const FieldComponent = isMobile || multiline ? MultiLineField : SingleLineField;
  
    return (
      <FieldComponent label={label} isEditing={isEditing}>
        {spoiler ? (
          <Spoiler>{children || fieldComponent}</Spoiler>
        ) : (
          children || fieldComponent
        )}
      </FieldComponent>
    );
  };

interface MobileStackPcGroupProps {
    isMobile: boolean;
    children: React.ReactNode;
}

export const MobileStackPcGroup: React.FC<MobileStackPcGroupProps> = ({ children, isMobile }) => {
    const LayoutComponent = isMobile ? Stack : Group;
  
    return <LayoutComponent align="center">{children}</LayoutComponent>;
  };

