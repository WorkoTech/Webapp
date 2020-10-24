export default {
    // UI
    router: state => state.ui.router,
    pageLoader: state => state.ui.pageLoader,
    pageTitle: state => state.ui.pageTitle,

    // WORKSPACE
    workspaces: state => state.workspace.workspaces,
    invitations: state => state.workspace.invitations,
    documents: state => state.document.documents,

    // USERS
    loginError: state => state.users.loginError,
    accessToken: state => state.users.accessToken,
    myself: state => state.users.myself,

    // CHAT
    chatrooms: state => state.chat.chatrooms,
    currentChatroomId: state => state.chat.currentChatroomId,
    chatDisplay: state => state.chat.chatDisplay,
    unreadMessages: state => state.chat.unreadMessages,

    // STORAGE
    files: state => state.storage.files,

    // OFFERS
    offers: state => state.billing.offers,
    publishableKey: state => state.billing.publishableKey,
    subscription: state => state.billing.subscription,
    
    // GAMIFICATION
    profile: state => state.gamification.profile,
    avatar: state =>state.gamification.avatar,
    title: state => state.gamification.title,
    level: state => state.gamification.level,
    profileActions: state => state.gamification.profileActions,
}
