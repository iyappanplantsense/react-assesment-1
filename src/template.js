import React from "react";
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Autocomplete,Link } from "@mui/material";

export const CustomText = ({ name, value, label, onChange,i }) => {

    return <TextField id="outlined-basic"  fullWidth name={name} value={value} label={label} onChange={onChange(i)} variant="outlined" />
}

export const CustomButton = ({ label, onClick, variant, color, size = 'medium', disabled = false }) => {
    console.log("Disabled",disabled)
    return <Button variant={variant} onClick={onClick} color={color}  disabled={disabled}>{label}</Button>
}


export const CustomRadio = ({ title, name, options = [],onChange,value,i }) => {
    return <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name={name}
            value={value}
            onChange={onChange(i)}
        >
            {options.map((o) => {
                return <FormControlLabel value={o.value} control={<Radio />} label={o.label} />
            })}
        </RadioGroup>
    </FormControl>
}

export const CustomAutoComplete = ({ name, value={} ,options = [], label, optionLabel,onChange }) => {
    console.log("CustomAutoComplete",optionLabel)
    return <Autocomplete
            fullWidth
        id="combo-box-demo"
         value={options.find( f => f[optionLabel] === value)}
        options={options}
        onChange = {(e,val) => onChange(name,optionLabel,val)}
        autoHighlight
        getOptionLabel={(option) => option[optionLabel]?option[optionLabel] :''}
        renderInput={(params) => <TextField  {...params} label={label} />}
    />
}

export const CustomLinkButton = ({href,disabled,label,onClick}) =>{
return <Link href={href} underline="always" color={disabled?'inherit':'primary'} onClick={onClick} component={'button'} disabled={disabled}>
{label}
</Link>
}