<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <chat-sidebar></chat-sidebar>
        <chat-bubble></chat-bubble>
        <unread-messages-bubble></unread-messages-bubble>
        <page-loader></page-loader>
        <!-- <side-bar
            :background-color="sidebarBackground"
            short-title="Worko"
            title="Worko"
        >
            <template slot="links">
                <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard'}"/>
                <sidebar-item :link="{name: 'Workspace', icon: 'ni ni-building text-red', path: '/workspace'}"/>
                <sidebar-item :link="{name: 'Logout', icon: 'ni ni-caps-small text-blue', path: '/logout'}"/>
        <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
                <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
                <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
                <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
                <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/>
            </template>
        </side-bar> -->
        <div class="main-content" :data="sidebarBackground" style="height: 100%;">
            <dashboard-navbar v-if="enabledDashboardNavBar()"></dashboard-navbar>

            <div @click="toggleSidebar" class="main-page-content">
                <fade-transition :duration="200" origin="center top" mode="out-in">
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
                <content-footer v-if="!$route.meta.hideFooter"></content-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import ChatSidebar from '../components/Chat/Chat.vue';
    import ChatBubble from '../components/Chat/Bubble.vue';
    import UnreadMessagesBubble from '../components/Chat/UnreadMessagesBubble.vue';
    import DashboardNavbar from './DashboardNavbar.vue';
    import ContentFooter from './ContentFooter.vue';
    import PageLoader from '@/components/Theme/PageLoader.vue';
    import { FadeTransition } from 'vue2-transitions';

    export default {
        components: {
            ChatBubble,
            ChatSidebar,
            UnreadMessagesBubble,
            DashboardNavbar,
            ContentFooter,
            PageLoader,
            FadeTransition
        },
        data() {
            return {
                sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
            };
        },
        methods: {
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            },
            enabledDashboardNavBar() {
                return true; //this.$router.currentRoute.name !== 'editor';
            }
        },
        computed: {
        }
    };
</script>
<style lang="scss">
    .main-content {
        display: flex;
        flex-grow: 1;
        height: 100%;
        flex-direction: column;
    }

    .main-page-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
    }
    .page-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        position: relative;
    }

    .wrapper {
        display: flex;
        height: 100%;
    }
</style>
