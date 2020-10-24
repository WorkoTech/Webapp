<template>
    <div class="tile">
        <button type="button"
            v-b-tooltip.hover.top
            :title="tooltipText"
            :style="{ 'background-color': backgroundColor}"
            class="btn-icon-clipboard" data-clipboard-text="air-baloon"
            @click="$emit('click', id ? id : name)"
        >
            <div class="tile-container my-4" :class=containerClass>
                <h4 class="text-capitalize text-center">{{ name }}</h4>
                <i class="ni" :class="[ textColorClass, icon ]"/>
            </div>
        </button>
        <div class="tile-remove" v-b-modal.delete-modal @click="$emit('delete', id ? id : title)">
            <i class="ni ni-fat-remove text-white"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            backgroundColor: {
                type: String,
                required: false
            },
            containerClass: {
                type: Array,
                required: false,
                default: () => []
            },
            id: {
                required: false
            }
        },
        computed: {
            textColorClass() {
                return 'text-' + this.color;
            },
            tooltipText() {
                return this.title
            }
        }
    }
</script>

<style>
    .tile {
        position: relative;
        height: 100%;
    }

    .tile-container {
        justify-content: center;
        flex-direction: column;
    }

    .tile-container i {
        font-size: 50px;
        margin: 8px;
    }

    .tile-remove {
        background-color: red;
        border-radius: 50%;
        position: absolute;
        bottom: -4px;
        right: -12px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;

        transition: all 0.1s ease;
    }

    .tile-remove:hover {
        width: 32px;
        height: 32px;
        font-size: 32px;
        bottom: -8px;
        right: -16px;
        cursor: pointer;
    }

</style>
