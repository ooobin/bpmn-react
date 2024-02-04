import Mock from "mockjs";
import qs from "qs";

/**
 * 通过 Mock.mock() 方法模拟请求
 */
Mock.mock("http://localhost:3100/i-demo/api/test", "post", () => {
    console.log("test");
    return {
        code: 1,
        message: "success",
        data: {
            code: 1,
            message: 'success',
            data: "success",
        },
    };
});

Mock.mock('http://localhost:3100/i-demo/api/test', 'post', (req) => {
    const params = qs.parse(req.body);

    if (params.productId === '1') {
        return {
            code: 1,
            message: 'success',
            data: [],
        };
    } else {
        return {
            code: 1,
            message: 'success',
            data: [],
        };
    }
});
