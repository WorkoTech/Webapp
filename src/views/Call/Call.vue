<template>
    <div id="jitsi-call">{{ waitHint }}</div>
</template>

<script>
    export default {
        data() {
            return {
                chatroomId: null,
                waitHint: "Waiting for call to start..."
            }
        },
        computed: {
            myself() {
                return this.$store.getters.myself;
            }
        },
        watch: {
            myself(myself) {
                console.log('MYSELF : ', myself);
                const domain = 'meet.jit.si';
                const options = {
                    roomName: `worko/${this.chatroomId}`,
                    width: 950,
                    height: 950,
                    parentNode: document.getElementById('jitsi-call'),
                    userInfo: {
                        email: myself.email
                    }
                };
                const api = new JitsiMeetExternalAPI(domain, options);
                api.addEventListener('readyToClose', () => self.close());
                api.addEventListener('videoConferenceJoined', () => {
                    this.waitHint = null;
                })
            }
        },
        mounted() {
            console.log('router : ', this.$router);
            this.chatroomId = this.$router.currentRoute.query.chatroomId;
            if (this.chatroomId == null) {
                window.close()
            }
        }
    }
</script>
