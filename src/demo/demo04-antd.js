import { Button, Flex } from "antd";

const boxStyle = {
    width: '50%',
    height: 100,
    border: '1px solid #40a9ff',
};

const Antd = () => {
    return (
        <Flex style={boxStyle} justify={'space-between'} align={'flex-start'}>
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
            <Button type="primary">Primary</Button>
        </Flex>
    );
};

export default Antd;