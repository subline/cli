<!-- svg-sprite组件 -->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    // 引入所有的svg的文件
    const requireAll = requireContext => {
        return requireContext.keys().map(requireContext)
    }
    const req = require.context('./icon', true, /\.svg$/)
    requireAll(req)

    export default {
        name: 'svg-icon',
        props: {
            svgName: {
                type: String,
                required: true
            },
            className: {
                type: String
            }
        },
        computed: {
            iconName() {
                return `#svg-${this.svgName}`
            },
            svgClass() {
                if (this.className) {
                    return `svg-icon ${this.className}`
                }
                return `svg-icon svg-${this.svgName}`
            }
        }
    }
</script>

<style lang="less" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
