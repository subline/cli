<template>
    <div id="app">
        <ul>
            <li>
                <h3 class="fs30">png</h3>
                <div class="icon icon-logo">132</div>
            </li>
            <li>
                <h3 class="fs30">svg</h3>
                <div>
                    <SvgIcon svgName="logo"></SvgIcon>
                </div>
            </li>
        </ul>
        <router-view/>
    </div>
</template>

<script>
    import SvgIcon from 'svg'
    import Utils from 'utils'
    import A from 'a'
    export default {
        name: 'App',
        mounted() {
            Utils.demo()
            A.demo()
        },
        components: {
            SvgIcon
        }
    }
</script>

<style lang="less">
    @import '~@/assets/less/main.less';
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        .fs30 {
            font-size: 30px;
        }
        .svg-logo {
            width: 200px;
            height: 80px;
        }
    }
</style>
