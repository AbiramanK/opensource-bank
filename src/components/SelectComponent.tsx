import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export interface SelectComponentOptionsInterface {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ISelectComponentProps {
  id: string;
  value: string | undefined;
  handleChange: Function;
  options: Array<SelectComponentOptionsInterface> | undefined;
  label: string;
  size: "small" | "medium";
  minWidth?: number;
}

export default function SelectComponent(props: ISelectComponentProps) {
  return (
    <React.Fragment>
      <FormControl sx={{ m: 0, minWidth: props?.minWidth ?? 120 }} size="small">
        <InputLabel id={`${props?.id}-select-label`}>{props?.label}</InputLabel>
        <Select
          labelId={`${props?.id}-select-label`}
          id={`${props?.id}-select`}
          value={props?.value ?? ""}
          label={props?.label}
          onChange={(event: SelectChangeEvent) => props?.handleChange(event)}
          defaultValue={props?.value ?? ""}
          size={props?.size}
        >
          {props?.options?.map(
            (option: SelectComponentOptionsInterface, index: number) => (
              <MenuItem
                key={index}
                disabled={option?.disabled ?? false}
                value={option?.id}
              >
                {option?.label}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
