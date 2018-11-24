module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	plugins: ['html'],
	settings: {
		'html/html-extensions': ['.html', '.vue'],
		'html/indent': '+2',
	},
	extends: 'standard',
	env: {
		browser: true,
	},
    //off 0 关闭规则
    //warn 1 开启规则，使用警告
    //error 2 开启规则，使用错误
	rules: {
		// "semi": ["error", "always"],
		"linebreak-style": [2, "windows"],
		"arrow-parens": 0,
        'indent': ["off", "tab"],
        "space-before-function-paren": [2, "never"], //禁止在参数的 ( 前面有空格。
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-console": process.env.NODE_ENV === 'production' ? 1 : 0
	}
}
