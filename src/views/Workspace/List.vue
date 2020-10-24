<template>
	<div class="page-content">
		<base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
		<div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
		</base-header>

		<div class="container-fluid mt--7 page-container">
			<div class="row flex-row">
				<div class="col flex-col">
					<div class="card shadow fullpage-card">
						<div class="card-body">
							<div class="row">

								<!-- DISPLAY WORKSPACE -->
								<div
									class="col-lg-4 col-md-6"
									v-for="(workspace, index) in workspaces" :key="'workspace' + workspace.id"
								>
                                    <tile
                                        :name="workspace.name"
                                        :title="workspace.name"
                                        :id="workspace"
                                        @click="goToWorkspace"
                                        @delete="showDeleteModal"
                                        icon="ni-building"
                                        color="green"
                                        v-b-modal.delete-modal
                                    ></tile>
								</div>

								<!-- DISPLAY PENDING INVITATIONS -->
								<div
									class="col-lg-4 col-md-6"
									v-for="(invitation, index) in invitations" :key="'invitation' + invitation.id"
								>
									<button type="button"
											v-b-tooltip.hover.top
											:title="invitation.workspace.name"
											class="btn-icon-clipboard workspace" data-clipboard-text="air-baloon"
											@click="acceptInvitation(invitation)"
									>
										<div class="workspace-container my-4 pending">
											<i class="ni ni-building" :class="[['text-' + colors[index] ]]"/>
											<h4 class="text-capitalize">{{invitation.workspace.name}}</h4>
											<h5 class="text-center">Click here to accept the invitation</h5>
											<h5 class="text-center">Invited by {{ invitation.sender }}</h5>
										</div>
									</button>
									<div class="workspace-remove" v-b-modal.delete-invitation-modal @click="showDeleteInvitationModal(invitation)">
										<i class="ni ni-fat-remove text-white"></i>
									</div>
									<div class="workspace-pending">
										<i class="fas fa-clock text-white"></i>
									</div>
								</div>

								<!-- CREATE NEW WORKSPACE -->
								<div class="col-lg-4 col-md-6">
									<button type="button"
											v-b-tooltip.hover.top
											title="create"
											class="btn-icon-clipboard workspace"
											data-clipboard-text="air-baloon"
											v-b-modal.create-modal
									>
										<div class="workspace-container my-4">
											<div class="workspace-add">
												<i class="ni ni-fat-add text-white"></i>
											</div>
											<h4>Create new workspace</h4>
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<create-modal></create-modal>
		<b-modal id="delete-modal" title="Are you sure?" ok-variant="danger" ok-title="Yes, I've understand that all data will be losed" centered @ok="deleteWorkspace">
			<h3>Are you sure to delete this workspace? All the files will be deleted</h3>
		</b-modal>
		<b-modal id="delete-invitation-modal" title="Are you sure?" ok-variant="danger" ok-title="Yes" centered @ok="deleteInvitation">
			<h3>Are you sure to decline this invitation?</h3>
		</b-modal>
	</div>
</template>


<script>
	import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
	import CreateModal from '@/views/Workspace/CreateModal.vue'
    import Tile from "@/components/Theme/Tile"

	export default {
		directives: {
			'b-tooltip': BTooltipDirective
		},
		components: {
			CreateModal,
            Tile
		},
		data() {
			return {
				colors: ['green', 'blue', 'yellow', 'orange','red'],
				io: null,
				deletingWorkspace: null
			}
		},
		computed: {
			workspaces() {
				return this.$store.getters.workspaces
			},
			invitations() {
				return this.$store.getters.invitations
			}
		},
		methods: {
			showDeleteModal(workspace) {
				this.deletingWorkspace = workspace;
			},
			showDeleteInvitationModal(invitation) {
				this.deletingInvitation = invitation;
			},
			deleteWorkspace() {
				this.$store.dispatch('DELETE_WORKSPACE', this.deletingWorkspace);
				this.deletingWorkspace = null;
			},
			deleteInvitation() {
				this.$store.dispatch('DECLINE_WORKSPACE_INVITATION', this.deletingInvitation);
				this.deletingInvitation = null;
			},
			goToWorkspace(workspace) {
				if (!workspace.pending) {
					this.$router.push({ path: `workspace/${workspace.id}` });
				}
			},
			acceptInvitation(invitation) {
				this.$store.dispatch('ACCEPT_WORKSPACE_INVITATION', invitation);
			}
		},
		mounted() {
			this.$store.dispatch('FETCH_WORKSPACES');
			this.$store.dispatch('FETCH_INVITATIONS');
            this.$store.commit('SET_PAGE_TITLE', 'Workspaces');
		}
	};
</script>


<style>
	.workspace {
		position: relative;
		height: 100%;
	}

	.workspace-container {
		justify-content: center;
		flex-direction: column;
	}

	.workspace-container.pending {
		opacity: 0.6;
	}

	.workspace-container i {
		font-size: 50px;
		margin: 8px;
	}

	.workspace-add {
		border-radius: 50%;
		background-color: #2dce89;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		width: 45px;
		height: 45px;
	}

	.workspace-remove {
		background-color: red;
		border-radius: 50%;
		position: absolute;
		bottom: 5px;
		right: 5px;
		width: 24px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}

	.workspace-remove:hover {
		width: 32px;
		height: 32px;
		font-size: 24px;
		bottom: 0px;
		right: 0px;
		cursor: pointer;
	}

	.workspace-pending {
		background-color: #fd7e14;
		border-radius: 50%;
		position: absolute;
		top: 5px;
		left: 5px;
		width: 24px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}
</style>
