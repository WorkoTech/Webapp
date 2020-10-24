<template>
    <div>
        <base-header
            class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
        >
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white"  v-if="profile">Hello {{ myProfile.username }}</h1>
                        <p class="text-white mt-0 mb-5">
                            This is your profile page. You can see the progress you've made with your work and
                            manage your projects or assigned tasks
                        </p>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="avatar != null ? avatar.url : 'img/theme/team-4-800x800.jpg'" class="rounded-circle" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading">Member since</span>
                                            <span class="description" v-if="profile">{{ myProfile.createdAt | dateParse('YYYY-MM-DD') | dateFormat('MMMM D, YYYY') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3 v-if="profile">
                                    {{ myProfile.username
                                    }}<span class="font-weight-light" v-if="title">, {{ title.name }}</span>
                                </h3>
                                <div class="h5 font-weight-300" v-if="profile">
                                    <i class="ni location_pin mr-2"></i>{{ myProfile.school }}, {{ myProfile.location }}
                                </div>
                                <div v-if="level">
                                    <div class="h5 mt-4">
                                        <i class="ni business_briefcase-24 mr-2"></i>Level : {{ level.value }}
                                    </div>
                                    <div v-if="level">
                                        <i class="ni education_hat mr-2"></i>{{ level.lvlAct.name }}
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <a href="#">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                                <div class="col">
                                    <ul class="nav nav-pills justify-content-end">
                                        <li class="nav-item mr-2 mr-md-0">
                                            <a
                                                class="nav-link py-2 px-3"
                                                href="#"
                                                :class="{ active: activeIndex === 0 }"
                                                @click.prevent="initProfile(0)"
                                            >
                                                <span class="d-none d-md-block">Profile</span>
                                                <span class="d-md-none">P</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link py-2 px-3"
                                                href="#"
                                                :class="{ active: activeIndex === 1 }"
                                                @click.prevent="initProfile(1)"
                                            >
                                                <span class="d-none d-md-block">Stats</span>
                                                <span class="d-md-none">S</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <template v-if="activeIndex === 0">
                            <form role="form" @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="Username"
                                                placeholder="Username"
                                                input-classes="form-control-alternative"
                                                v-model="profile.username"
                                                v-if="profile"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="Email address"
                                                readonly
                                                input-classes="form-control-alternative"
                                                v-model="myself.email"
                                                v-if="myself"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="First name"
                                                placeholder="First name"
                                                input-classes="form-control-alternative"
                                                v-model="profile.firstname"
                                                v-if="profile"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="Last name"
                                                placeholder="Last name"
                                                input-classes="form-control-alternative"
                                                v-model="profile.lastname"
                                                v-if="profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Location -->
                                <h6 class="heading-small text-muted mb-4">School information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="Location"
                                                placeholder="Location"
                                                input-classes="form-control-alternative"
                                                v-model="profile.location"
                                                v-if="profile"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input
                                                alternative=""
                                                label="School"
                                                placeholder="School"
                                                input-classes="form-control-alternative"
                                                v-model="profile.school"
                                                v-if="profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">About me</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative="" label="About Me">
                                            <textarea
                                                rows="4"
                                                class="form-control form-control-alternative"
                                                placeholder="A few words about you ..."
                                                v-model="profile.about"
                                                v-if="profile"
                                            ></textarea>
                                        </base-input>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="updateProfile">Validate Profile</base-button>
                                </div>
                            </form>
                        </template>
                        <template v-else-if="activeIndex === 1">
                                <div class="pl-lg-4">
                                    <statistics-table></statistics-table>
                                </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import StatisticsTable from './StatisticsTable';

export default {
    name: "user-profile",
    components: {
            StatisticsTable,
        },
    data() {
        return {
                activeIndex: 0,
                profile: {
                    username: "",
                    firstname: "",
                    lastname: "",
                    location: "",
                    school: "",
                    about: ""
                },
                avatar: {
                    url : 'img/theme/team-4-800x800.jpg'
                },
        }
    },
    methods: {
        initProfile(index) {
            this.activeIndex = index;
            this.avatar = myAvatar.get();
        },

        updateProfile() {
            this.$store.dispatch('UPDATE_PROFILE', this.profile).then(
                console.log("PROFILE UPDATED")
            )
        }
    },
    computed: {
        myself(){
            console.log("RUNNING MYSELF")
                return this.$store.getters.myself
            },
        myProfile () {
                console.log("RUNNING PROFILE")
                this.profile = {
                    ...this.$store.getters.profile
                };

                return this.$store.getters.profile
        },
        myAvatar : {
            get () {
                console.log("RUNNING AVATAR")
                this.avatar = this.$store.getters.avatar
                return this.$store.getters.avatar
            },
            set (value) {
                console.log("UPDATING AVATAR");
                this.$store.commit('UPDATE_AVATAR', value);
            }
        },
        title(){
            console.log("RUNNING TITLE")
            return this.$store.getters.title
        },
        level(){
            console.log("RUNNING LEVEL")
            return this.$store.getters.level
        },
    },
    mounted() {
        this.$store.dispatch('PROFILE');
        this.$store.dispatch('AVATAR');
        this.$store.dispatch('TITLE');
        this.$store.dispatch('LEVEL');
    }
};
</script>
<style></style>
