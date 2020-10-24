<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand
    >
        <div style="display: flex; flex-direction: raw">
            <!-- temporary empty form to keep user information up right -->
            <h2 class="text-capitalize page-title mr-3">
                <i
                    v-if="$route.name !== 'workspaces'"
                    class="ni ni-bold-left mr-3 return-icon"
                    @click="$router.go(-1)"
                ></i>
                {{ pageTitle }}
            </h2>
            <workspace-settings
                v-if="$route.name == 'workspace'"
                :workspaceId="Number($route.params.id)"
            />
        </div>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                        <span class="mb-0 text-sm  font-weight-bold">{{ myself.email }}</span>
                        <div class="media-body ml-2 d-none d-lg-block">
                        </div>
                        <span class="avatar avatar-sm rounded-circle">
                            <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
                        </span>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/billing" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Billing</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
    import WorkspaceSettings from '@/components/Workspace/WorkspaceSettings';

    export default {
        components: {
            WorkspaceSettings
        },
        data() {
            return {
                showMenu: false,
                searchQuery: ''
            };
        },
        computed: {
            myself() {
                return this.$store.getters.myself ? this.$store.getters.myself : { email: '' };
            },
            pageTitle() {
                return this.$store.getters.pageTitle ? this.$store.getters.pageTitle : this.$route.name
            }
        },
        methods: {
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false);
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
            }
        },
        mounted() {
            console.log('router : ', this)
        }
    };
</script>

<style>
    .page-title {
        display: flex;
        align-items: center;
    }

    .return-icon {
        transition: all 0.1 ease;
    }

    .return-icon:hover {
        color: white;
        cursor: pointer;
    }
</style>
