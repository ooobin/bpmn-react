import Mock from "mockjs";

// 使用mockjs模拟数据
Mock.mock("http://localhost:3000/intelligentcloud/userinfo/adminLogin", "post", () => {
    console.log("adminLogin");
    return {
        code: 1,
        message: "1001",
        data: {
            data: "success",
        },
    };
});

Mock.mock("http://localhost:3000/intelligentcloud/product/listAllProduct", "post", () => {
    console.log("listAllProduct");
    return {
        code: 1,
        message: "success",
        data: [
            {
                id: "1",
                productNo: "1",
                productName: "产品测试",
                description: "产品测试",
            },
            {
                id: "2",
                productNo: "2",
                productName: "产品测试2",
                description: "产品测试2",
            },
        ],
    };
});
