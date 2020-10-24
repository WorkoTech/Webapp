<template>
	<div class="page-content">
		<base-header type="gradient-success" class="pb-6 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--7 page-container">
            <div class="card shadow fullpage-card">
                <div class="card-body">
                	<quill-editor
						class="quill-editor"
						v-model="content"
						ref="quillEditor"
						:options="editorOptions">
					</quill-editor>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
	// require styles
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import ShareDB from 'sharedb/lib/client';

	import { quillEditor } from 'vue-quill-editor'
	import richText from 'rich-text'

	export default {
		components: {
			quillEditor
		},
		data: () => ({
			content: '',
			socket: null,
			connection: null,
			doc: null,
			editorOptions: {}
		}),
		computed: {
			editor() {
				return this.$refs.quillEditor.quill;
			}
		},
		methods: {},
		mounted() {
			ShareDB.types.register(richText.type);

			let protocol = "ws";
			if (window.location.protocol === "https:")
				protocol = "wss"
			this.socket = new WebSocket(`${protocol}://${window.location.hostname}/editor?token=${this.$store.getters.accessToken}`);
			this.connection = new ShareDB.Connection(this.socket);

			this.doc = this.connection.get('document', `${this.$route.params.id}`);
			this.doc.subscribe(err => {
				if (err)
					throw err;
				this.editor.updateContents(this.doc.data);
				// this.content = this.doc.data[0];

				this.editor.on('text-change', (delta, oldDelta, source) => {
					if (source !== 'user')
						return;
					this.doc.submitOp(delta, { source: 'quill' })
				});
				this.doc.on('op', (op, source) => {
					if (source === 'quill')
						return;
					this.editor.updateContents(op);
				});
			});
		}
	}
</script>

<style>
	.quill-container {
		height: 100%;
		/*background-color: red;*/
	}
	.quill-editor {
		height: 95%;
	}
	.ql-container {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}
	.ql-toolbar {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
</style>
