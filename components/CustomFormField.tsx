/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { E164Number } from "libphonenumber-js/core";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// Define the custom props.
interface CustomProps {
  control: Control<any>;
  // name is used to render different kind of names.
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  // fieldType is used to render different kind of fields.
  fieldType: FormFieldType;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  // destructure the props further
  // const {} = props
  // Only if the FormFieldType is INPUT, return & render the input etc...
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='DK'
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      );
    default:
      break;
  }
};

// Accept the props in the CustomFormField.
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {/* if the fieldType is not checkbox & if the label exists, render the label. */}
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
