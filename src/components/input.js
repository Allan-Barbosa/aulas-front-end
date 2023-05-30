import { Input as NativeBaseInput, FormControl } from 'native-base';

export function Input({ errorMessage = null, isInvalid, ...rest }) {
    const invalid = !!errorMessage || isInvalid;
    return (
        <FormControl height={"65px"} mb="7px" isInvalid={invalid}>
            <NativeBaseInput
                variant="rounded"
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 2,
                    borderColor: "red.500",
                }}
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}