export const PATH = {
  MAIN: '/',
  SIGN_IN: '/signIn',
  PROFILE: '/profile',
  REGISTER: '/register',
  NOT_FOUND: '/*',
  PASS_RECOVERY: '/password',
  SET_NEW_PASS: '/set-new-password/:token',
  CHECK_EMAIL: '/checkEmail',
  PACKS: '/packs',
  EMPTY_PACK: '/empty-pack',
  ERROR_404: '/404',
  CARDS_PACK_ID: '/cards/:id',
} as const
