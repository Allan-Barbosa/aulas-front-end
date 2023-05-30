import { Button as ButtonNativeBase, Text } from 'native-base';

export function Button({ title, ...rest }) {
    return (
        <ButtonNativeBase
            w={200}
            borderRadius={36}
            height={44}
            {...rest}
        >
            <Text color="white" fontSize="md">
                {title}
            </Text>
        </ButtonNativeBase>
    );
}