module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // 添加对 BPMN 文件的支持
            webpackConfig.module.rules.push({
                test: /\.bpmn$/,
                type: 'asset/source'
            });

            return webpackConfig;
        }
    }
};
