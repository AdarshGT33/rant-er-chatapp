export const HOST = import.meta.env.VITE_SERVER_URI

export const AUTH_ROUTES = "api/auth"

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-proflie-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`





export const CONTACT_ROUTES = 'api/contacts'

export const SEARCH_CONTACT_ROUTES = `${CONTACT_ROUTES}/search`
export const GET_ALL_CONTACT_ROUTES = `${CONTACT_ROUTES}/get-all-contacts`
export const GET_ALL_LOGGED_IN_USERS_ROUTE = `${CONTACT_ROUTES}/get-all-logged-in-users`





export const MESSAGES_ROUTES = 'api/messages'

export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`
export const UPLOAD_FILES_ROUTE = `${MESSAGES_ROUTES}/upload-files`







export const CHANNEL_ROUTES = 'api/channel'

export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/create-channel`
export const GET_USER_CHANNELS_ROUTE = `${CHANNEL_ROUTES}/get-user-channels`